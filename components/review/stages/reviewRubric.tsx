import { ReviewStage } from 'pages/review';
import { useState } from 'react';
import { ReviewSetScoresContext } from '../shared/reviewContext';

interface Props {
  scoringCriteria: string[];
  scores: Map<ReviewStage, number>;
  currentStage: ReviewStage;
}

export const ReviewRubric: React.FC<Props> = ({
  scoringCriteria,
  scores,
  currentStage,
}) => {
  return (
      <div className='shrink=0 gap-8'>
        <div className='inline-flex gap-6 flex-col items-start'>
          {
            scoringCriteria.map((criteria, idx) => {
              return (
                <div className='flex items-center shrink-0 self-stretch p-4 gap-6'>
                  <h5 className='flex flex-col w-5 text-[28px]'>{idx + 1}</h5>
                  <div className='flex-1 flex-col text-base'>{criteria}</div>
                </div>
              )
            })
          }
        </div>
        <br></br>
        <br></br>
        <ReviewSetScoresContext.Consumer>
          {(updateScore) => (
            <div className='flex items-center justify-end'>
              <input
                type="number"
                pattern="[1-5]"
                value={scores.get(currentStage)}
                onChange={(event) => {
                  if (event.target.validity.valid) {
                    updateScore?.(currentStage, parseInt(event.target.value));
                  }
                }}
              />
              <h5 className="text-red-500 inline-block px-2 text-xl">
                 *
              </h5>
            </div>
          )}
        </ReviewSetScoresContext.Consumer>
      </div>
  );
};