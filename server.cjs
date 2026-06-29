const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;
const csvPath = path.join(__dirname, 'attendance-records.csv');

app.use(cors());
app.use(express.json());

const ensureCsv = () => {
  if (!fs.existsSync(csvPath)) {
    fs.writeFileSync(csvPath, 'documentId,day,keyword,registeredAt\n');
  }
};

const parseCsv = (text) => {
  if (!text.trim()) return [];
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length <= 1) return [];

  return lines.slice(1).map((line) => {
    const values = line.split(',').map((value) => value.replace(/^"|"$/g, '').replace(/""/g, '"'));
    return {
      documentId: values[0] ?? '',
      day: Number(values[1] ?? 0),
      keyword: values[2] ?? '',
      registeredAt: values[3] ?? ''
    };
  });
};

const serializeCsv = (records) => {
  const lines = ['documentId,day,keyword,registeredAt'];
  records.forEach((record) => {
    lines.push([record.documentId, record.day, record.keyword, record.registeredAt].join(','));
  });
  return lines.join('\n');
};

app.get('/attendance', (req, res) => {
  ensureCsv();
  const csvText = fs.readFileSync(csvPath, 'utf8');
  res.json(parseCsv(csvText));
});

app.get('/attendance/:documentId/:day', (req, res) => {
  ensureCsv();
  const csvText = fs.readFileSync(csvPath, 'utf8');
  const records = parseCsv(csvText);
  const found = records.find((record) => record.documentId === req.params.documentId && Number(record.day) === Number(req.params.day));

  res.json({ exists: Boolean(found), record: found ?? null });
});

app.post('/attendance', (req, res) => {
  ensureCsv();
  const { documentId, day, keyword } = req.body;

  if (!documentId || !day || !keyword) {
    return res.status(400).json({ success: false, message: 'Faltan datos.' });
  }

  const csvText = fs.readFileSync(csvPath, 'utf8');
  const records = parseCsv(csvText);
  const exists = records.some((record) => record.documentId === documentId && Number(record.day) === Number(day));

  if (exists) {
    return res.status(409).json({ success: false, message: 'Tu asistencia para este día ya fue registrada.' });
  }

  const nextRecord = {
    documentId,
    day: Number(day),
    keyword,
    registeredAt: new Date().toISOString()
  };

  const nextRecords = [...records, nextRecord];
  fs.writeFileSync(csvPath, serializeCsv(nextRecords));

  res.json({ success: true, record: nextRecord });
});

app.listen(port, () => {
  console.log(`Attendance server listening on port ${port}`);
});
