import cn from 'classnames';
import { useState } from 'react';
import classes from './App.module.css';
import NumberInput from '../NumberInput/NumberInput';

import {
  generateNumber,
  getTensDigit,
  getSingleDigit,
  calculateRowAnswers,
  calculateFinalAnswers,
} from '../../helpers/maths';

const topNumber = generateNumber(10, 99);
const bottomNumber = generateNumber(10, 99);

const topRowAnswers = calculateRowAnswers(getSingleDigit(bottomNumber), topNumber);
const bottomRowAnswers = calculateRowAnswers(getTensDigit(bottomNumber), topNumber);
const finalAnswers = calculateFinalAnswers(topRowAnswers, bottomRowAnswers);

type StageName = 'first' | 'second' | 'final' | 'complete';

const answersMap: Record<StageName, number[]> = {
  first: topRowAnswers,
  second: bottomRowAnswers,
  final: finalAnswers,
  complete: [],
};

const hasZeroStartValue = (index: number, stage: StageName): boolean => {
  const stageAnswers = answersMap[stage];
  return index === stageAnswers.length - 1 && stageAnswers[index] === 0;
};

const showIfGtZero = (x: number): boolean | number => {
  if (x > 0) return x;
  return false;
};

function App() {
  const [currentStage, setCurrentStage] = useState<StageName>('first');
  const [answersIndex, setAnswersIndex] = useState(0);

  const incrementStage = () => {
    if (currentStage === 'first') setCurrentStage('second');
    else if (currentStage === 'second') setCurrentStage('final');
    else setCurrentStage('complete');
  };

  const incrementAnswer = () => {
    const nextIndex = answersIndex + 1;
    if (nextIndex >= answersMap[currentStage].length || hasZeroStartValue(nextIndex, currentStage)) {
      incrementStage();
      setAnswersIndex(0);
    } else {
      setAnswersIndex(nextIndex);
    }
  };

  const handleCorrectAnswer = () => {
    incrementAnswer();
  };

  const isAnswerAtIndex = (i: number) => answersIndex === i;
  const isAnswerPassedIndex = (i: number) => answersIndex > i;
  const isAtStage = (stage: StageName) => currentStage === stage;
  const isFirstStage = isAtStage('first');
  const isSecondStage = isAtStage('second');
  const isFinalStage = isAtStage('final');
  const isComplete = isAtStage('complete');
  const isPassedStage = (stage: StageName): boolean => {
    switch (stage) {
      case ('first'):
        return ['second', 'final', 'complete'].includes(currentStage);
      case ('second'):
        return ['final', 'complete'].includes(currentStage);
      case ('final'):
        return isAtStage('complete');
      default:
        return false;
    }
  };

  return (
    <div className={classes.container}>
      <table className={classes.mainTable}>

        <thead className={classes.tableHead}>

          <tr className={classes.row}>
            <th></th>
            <th>1,000's</th>
            <th>100's</th>
            <th>10's</th>
            <th>1's</th>
          </tr>

        </thead>

        <tbody className={classes.tableBody}>

          <tr className={classes.row}>
            <td></td>
            <td></td>
            <td></td>
            <td className={cn({ [classes.active]: (isFirstStage || isSecondStage) && isAnswerAtIndex(1) })}>{getTensDigit(topNumber)}</td>
            <td className={cn({ [classes.active]: (isFirstStage || isSecondStage) && isAnswerAtIndex(0) })}>{getSingleDigit(topNumber)}</td>
          </tr>

          <tr className={classes.row}>
            <td className={cn({ [classes.active]: isFirstStage || isSecondStage })}>&times;</td>
            <td></td>
            <td></td>
            <td className={cn({ [classes.active]: isSecondStage && answersIndex < 2 })}>{getTensDigit(bottomNumber)}</td>
            <td className={cn({ [classes.active]: isFirstStage && answersIndex < 2 })}>{getSingleDigit(bottomNumber)}</td>
          </tr>

          <tr>
            <td className={classes.divider} colSpan={5}></td>
          </tr>

          {/* TOP ROW */}
          <tr className={classes.row}>
            <td></td>
            <td></td>
            <td className={cn({ [classes.active]: isFinalStage && isAnswerAtIndex(2) })}>
              <NumberInput
                disabled={!(isFirstStage && isAnswerAtIndex(2))}
                correctAnswer={topRowAnswers[2]}
                onComplete={handleCorrectAnswer}
              />
            </td>
            <td className={cn({ [classes.active]: isFinalStage && isAnswerAtIndex(1) })}>
              <NumberInput
                disabled={!(isFirstStage && isAnswerAtIndex(1))}
                correctAnswer={topRowAnswers[1]}
                onComplete={handleCorrectAnswer}
              />
            </td>
            <td className={cn({ [classes.active]: isFinalStage && isAnswerAtIndex(0) })}>
              <NumberInput
                disabled={!(isFirstStage && isAnswerAtIndex(0))}
                correctAnswer={topRowAnswers[0]}
                onComplete={handleCorrectAnswer}
              />
            </td>
          </tr>

          <tr className={classes.carriedOverRow}>
            <td></td>
            <td></td>
            <td className={cn({ [classes.used]: isPassedStage('first') })}>
              {(isPassedStage('first') || isAnswerPassedIndex(1)) && showIfGtZero(getTensDigit(topRowAnswers[1]))}
            </td>
            <td className={cn({ [classes.used]: isPassedStage('first') || isAnswerPassedIndex(1) })}>
              {(isPassedStage('first') || isAnswerPassedIndex(0)) && showIfGtZero(getTensDigit(topRowAnswers[0]))}
            </td>
            <td></td>
          </tr>

          {/* SECOND ROW */}
          <tr className={classes.row}>
            <td className={cn({ [classes.active]: isFinalStage })}>+</td>
            <td className={cn({ [classes.active]: isFinalStage && isAnswerAtIndex(3) })}>
              <NumberInput
                disabled={!(isSecondStage && isAnswerAtIndex(2))}
                correctAnswer={bottomRowAnswers[2]}
                onComplete={handleCorrectAnswer}
              />
            </td>
            <td className={cn({ [classes.active]: isFinalStage && isAnswerAtIndex(2) })}>
              <NumberInput
                disabled={!(isSecondStage && isAnswerAtIndex(1))}
                correctAnswer={bottomRowAnswers[1]}
                onComplete={handleCorrectAnswer}
              />
            </td>
            <td className={cn({ [classes.active]: isFinalStage && isAnswerAtIndex(1) })}>
              <NumberInput
                disabled={!(isSecondStage && isAnswerAtIndex(0))}
                correctAnswer={bottomRowAnswers[0]}
                onComplete={handleCorrectAnswer}
              />
            </td>
            <td></td> {/* SINGLE DIGITS COLUMN NOT USED ON SECOND ROW */}
          </tr>

          <tr className={classes.carriedOverRow}>
            <td></td>
            <td className={cn({ [classes.used]: isPassedStage('second') })}>
              {(isPassedStage('second') || (isSecondStage && isAnswerPassedIndex(1))) && showIfGtZero(getTensDigit(bottomRowAnswers[1]))}
            </td>
            <td className={cn({ [classes.used]: isPassedStage('second') || (isSecondStage && isAnswerPassedIndex(1)) })}>
              {(isPassedStage('second') || (isSecondStage && isAnswerPassedIndex(0))) && showIfGtZero(getTensDigit(bottomRowAnswers[0]))}
            </td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td className={classes.divider} colSpan={5}></td>
          </tr>

          {/* FINAL ROW / TOTAL */}
          <tr className={classes.row}>
            <td className={cn({ [classes.active]: isComplete })}>=</td>
            <td className={cn({ [classes.active]: isComplete })}>
              <NumberInput
                disabled={!(isFinalStage && isAnswerAtIndex(3))}
                correctAnswer={finalAnswers[3]}
                onComplete={handleCorrectAnswer}
              />
            </td>
            <td className={cn({ [classes.active]: isComplete })}>
              <NumberInput
                disabled={!(isFinalStage && isAnswerAtIndex(2))}
                correctAnswer={finalAnswers[2]}
                onComplete={handleCorrectAnswer}
              />
            </td>
            <td className={cn({ [classes.active]: isComplete })}>
              <NumberInput
                disabled={!(isFinalStage && isAnswerAtIndex(1))}
                correctAnswer={finalAnswers[1]}
                onComplete={handleCorrectAnswer}
              />
            </td>
            <td className={cn({ [classes.active]: isComplete })}>
              <NumberInput
                disabled={!(isFinalStage && isAnswerAtIndex(0))}
                correctAnswer={finalAnswers[0]}
                onComplete={handleCorrectAnswer}
              />
            </td>
          </tr>

          <tr className={classes.carriedOverRow}>
            <td></td>
            <td className={cn({ [classes.used]: isPassedStage('final') })}>
              {(isPassedStage('final') || isFinalStage && isAnswerPassedIndex(2)) && showIfGtZero(getTensDigit(finalAnswers[2]))}
            </td>
            <td className={cn({ [classes.used]: isPassedStage('final') || (isFinalStage && isAnswerPassedIndex(2)) })}>
              {(isPassedStage('final') || isFinalStage && isAnswerPassedIndex(1)) && showIfGtZero(getTensDigit(finalAnswers[1]))}
            </td>
            <td className={cn({ [classes.used]: isPassedStage('final') || (isFinalStage && isAnswerPassedIndex(1)) })}>
              {(isPassedStage('final') || isFinalStage && isAnswerPassedIndex(0)) && showIfGtZero(getTensDigit(finalAnswers[0]))}
            </td>
            <td></td>
          </tr>

        </tbody>

        <tfoot className={classes.tableHead}>

          <tr className={classes.row}>
            <th></th>
            <th>1,000's</th>
            <th>100's</th>
            <th>10's</th>
            <th>1's</th>
          </tr>

        </tfoot>

      </table>
    </div>
  )
}

export default App
