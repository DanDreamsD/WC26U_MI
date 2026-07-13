/**
 * CÓDIGO PARA GOOGLE APPS SCRIPT
 * 
 * Copia y pega este código en el editor de Apps Script de tu Google Sheet:
 * (Extensiones > Apps Script)
 * 
 * Este script administra la hoja "ASISTENTES" para leer y escribir el progreso de gamificación,
 * además de mantener compatibilidad con el sistema de registro de asistencias existente.
 */

const SPREADSHEET_ID = null; // Opcional si el script está enlazado directamente a la hoja de cálculo.
const SHEET_NAME = "ASISTENTES";
const DOC_ID_HEADER = "DOCUMENTO DE IDENTIDAD";

// Columnas de gamificación que se crearán/actualizarán automáticamente
const GAMIFICATION_HEADERS = [
  "XP",
  "NIVEL",
  "INSIGNIAS",
  "HABILIDADES",
  "CUESTIONARIOS",
  "ASISTENCIAS",
  "EXPLORACIONES",
  "ULTIMA_ACTUALIZACION"
];

function getSheet() {
  const ss = SPREADSHEET_ID 
    ? SpreadsheetApp.openById(SPREADSHEET_ID) 
    : SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error("No se encontró la hoja '" + SHEET_NAME + "'. Asegúrate de que exista.");
  }
  return sheet;
}

/**
 * Retorna un mapa de { nombreCabecera: indexColumna (1-based) }
 * y crea las columnas que no existan.
 */
function getHeadersMap(sheet) {
  const lastColumn = Math.max(1, sheet.getLastColumn());
  const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const map = {};
  
  headers.forEach((header, index) => {
    if (header) {
      map[header.toString().trim().toUpperCase()] = index + 1;
    }
  });

  return map;
}

/**
 * Asegura que todas las columnas de gamificación existan en la hoja "ASISTENTES".
 */
function ensureGamificationHeaders(sheet, headersMap) {
  const missingHeaders = GAMIFICATION_HEADERS.filter(
    h => !headersMap[h]
  );

  if (missingHeaders.length > 0) {
    const lastCol = sheet.getLastColumn();
    const range = sheet.getRange(1, lastCol + 1, 1, missingHeaders.length);
    range.setValues([missingHeaders]);
    
    // Recargar el mapa
    return getHeadersMap(sheet);
  }
  return headersMap;
}

/**
 * Busca la fila de un participante por su documento de identidad.
 * Retorna el número de fila (1-based) o -1 si no se encuentra.
 */
function findRowByDocId(sheet, docId, docIdColIndex) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return -1;

  const values = sheet.getRange(2, docIdColIndex, lastRow - 1, 1).getValues();
  const docIdStr = docId.toString().trim();

  for (let i = 0; i < values.length; i++) {
    if (values[i][0].toString().trim() === docIdStr) {
      return i + 2; // +2 porque el arreglo empieza en 0 y omitimos la cabecera (fila 1)
    }
  }
  return -1;
}

/**
 * GET requests
 */
function doGet(e) {
  try {
    const action = e.parameter.action;
    const documentId = e.parameter.documentId;

    if (!action) {
      return createJsonResponse({ success: false, message: "Falta el parámetro 'action'." });
    }

    const sheet = getSheet();
    let headersMap = getHeadersMap(sheet);
    const docIdIndex = headersMap[DOC_ID_HEADER];

    if (!docIdIndex) {
      return createJsonResponse({ success: false, message: "No se encontró la columna '" + DOC_ID_HEADER + "'." });
    }

    if (action === "getProgress") {
      if (!documentId) {
        return createJsonResponse({ success: false, message: "Falta 'documentId'." });
      }

      const rowIndex = findRowByDocId(sheet, documentId, docIdIndex);
      if (rowIndex === -1) {
        return createJsonResponse({ success: false, message: "Participante no encontrado." });
      }

      // Asegurar columnas y leer valores
      headersMap = ensureGamificationHeaders(sheet, headersMap);
      
      const rowValues = sheet.getRange(rowIndex, 1, 1, sheet.getLastColumn()).getValues()[0];
      
      const progress = {
        xp: rowValues[headersMap["XP"] - 1] || 0,
        level: rowValues[headersMap["NIVEL"] - 1] || 1,
        earnedBadges: rowValues[headersMap["INSIGNIAS"] - 1] || "",
        unlockedNodes: rowValues[headersMap["HABILIDADES"] - 1] || "",
        quizzesCompleted: rowValues[headersMap["CUESTIONARIOS"] - 1] || "",
        attendanceDays: rowValues[headersMap["ASISTENCIAS"] - 1] || "",
        exploredActivities: rowValues[headersMap["EXPLORACIONES"] - 1] || "",
        quizScores: rowValues[headersMap["CUESTIONARIOS"] - 1] 
          ? convertQuizzesStringToScores(rowValues[headersMap["CUESTIONARIOS"] - 1].toString())
          : "{}",
        lastUpdated: rowValues[headersMap["ULTIMA_ACTUALIZACION"] - 1] || ""
      };

      return createJsonResponse({ success: true, progress: progress });
    }

    // Compatibilidad: check asistencia existente
    if (action === "check") {
      const day = e.parameter.day;
      if (!documentId || !day) {
        return createJsonResponse({ success: false, message: "Faltan datos de consulta de asistencia." });
      }
      
      const rowIndex = findRowByDocId(sheet, documentId, docIdIndex);
      if (rowIndex === -1) {
        return createJsonResponse({ exists: false });
      }
      
      headersMap = ensureGamificationHeaders(sheet, headersMap);
      const attendanceStr = (sheet.getCellValue(rowIndex, headersMap["ASISTENCIAS"]) || "").toString();
      const attendanceDays = attendanceStr.split(",").map(Number);
      
      return createJsonResponse({ exists: attendanceDays.includes(Number(day)) });
    }

    return createJsonResponse({ success: false, message: "Acción GET no soportada." });
  } catch (error) {
    return createJsonResponse({ success: false, message: error.message });
  }
}

/**
 * POST requests
 */
function doPost(e) {
  try {
    const postData = JSON.parse(e.postData.contents);
    const action = postData.action;
    const documentId = postData.documentId;

    if (!documentId) {
      return createJsonResponse({ success: false, message: "Falta 'documentId' en el cuerpo." });
    }

    const sheet = getSheet();
    let headersMap = getHeadersMap(sheet);
    const docIdIndex = headersMap[DOC_ID_HEADER];

    if (!docIdIndex) {
      return createJsonResponse({ success: false, message: "No se encontró la columna '" + DOC_ID_HEADER + "'." });
    }

    const rowIndex = findRowByDocId(sheet, documentId, docIdIndex);
    if (rowIndex === -1) {
      return createJsonResponse({ success: false, message: "Participante no encontrado con el documento provisto." });
    }

    // Asegurar que las columnas de gamificación existan
    headersMap = ensureGamificationHeaders(sheet, headersMap);

    if (action === "saveProgress") {
      // Guardar todo el progreso del usuario
      sheet.getRange(rowIndex, headersMap["XP"]).setValue(postData.xp || 0);
      sheet.getRange(rowIndex, headersMap["NIVEL"]).setValue(postData.level || 1);
      sheet.getRange(rowIndex, headersMap["INSIGNIAS"]).setValue(postData.earnedBadges || "");
      sheet.getRange(rowIndex, headersMap["HABILIDADES"]).setValue(postData.unlockedNodes || "");
      
      // Mapear quiz scores a string para guardarlo de forma compacta
      const scoresString = postData.quizScores || "{}";
      sheet.getRange(rowIndex, headersMap["CUESTIONARIOS"]).setValue(scoresString);
      
      sheet.getRange(rowIndex, headersMap["ASISTENCIAS"]).setValue(postData.attendanceDays || "");
      sheet.getRange(rowIndex, headersMap["EXPLORACIONES"]).setValue(postData.exploredActivities || "");
      sheet.getRange(rowIndex, headersMap["ULTIMA_ACTUALIZACION"]).setValue(new Date().toISOString());

      return createJsonResponse({ success: true, message: "Progreso sincronizado exitosamente." });
    }

    // Compatibilidad: Registrar asistencia simple
    // Si no viene action o es action "attendance", se registra la asistencia
    if (!action || action === "attendance") {
      const day = postData.day;
      const keyword = postData.keyword;

      if (!day) {
        return createJsonResponse({ success: false, message: "Falta el día a registrar." });
      }

      // Obtener asistencias actuales
      const currentAttendanceStr = (sheet.getRange(rowIndex, headersMap["ASISTENCIAS"]).getValue() || "").toString();
      const attendanceDays = currentAttendanceStr.split(",").filter(Boolean).map(Number);

      if (!attendanceDays.includes(Number(day))) {
        attendanceDays.push(Number(day));
        sheet.getRange(rowIndex, headersMap["ASISTENCIAS"]).setValue(attendanceDays.join(","));
        sheet.getRange(rowIndex, headersMap["ULTIMA_ACTUALIZACION"]).setValue(new Date().toISOString());
        
        // Sumar XP básico por asistencia si la columna XP existe (50 XP)
        const currentXp = Number(sheet.getRange(rowIndex, headersMap["XP"]).getValue() || 0);
        sheet.getRange(rowIndex, headersMap["XP"]).setValue(currentXp + 50);
      }

      return createJsonResponse({ success: true, message: "Asistencia registrada." });
    }

    return createJsonResponse({ success: false, message: "Acción POST no soportada." });
  } catch (error) {
    return createJsonResponse({ success: false, message: error.message });
  }
}

/**
 * Convierte un JSON String de quiz scores a formato compatible.
 */
function convertQuizzesStringToScores(str) {
  try {
    return JSON.parse(str);
  } catch(e) {
    // Si no es JSON válido (por ejemplo si contiene un string separado por comas), retornar vacío
    return "{}";
  }
}

/**
 * Genera la respuesta JSON formateada para CORS de Apps Script
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
