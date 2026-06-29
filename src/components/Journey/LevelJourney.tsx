import React from 'react';
import levelsData from '../../data/levels.json';
import { JourneyNode } from './JourneyNode';

interface LevelJourneyProps {
  onNodeClick: (level: any) => void;
}

export const LevelJourney: React.FC<LevelJourneyProps> = ({ onNodeClick }) => {
  return (
    <div className="py-8 w-full flex flex-col items-center relative">
      {levelsData.map((level, index) => (
        <JourneyNode 
          key={level.id} 
          level={level} 
          isLast={index === levelsData.length - 1} 
          onClick={onNodeClick} 
        />
      ))}
    </div>
  );
};
