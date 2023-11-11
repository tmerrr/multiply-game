import cn from 'classnames';
import { useState } from 'react';
import classes from './App.module.css';
import CarriedOverCell from '../CarriedOverCell/CarriedOverCell';
import NumberInput from '../NumberInput/NumberInput';

import arrows from './circle-arrs-2.png';

import {
  generateNumber,
  getTensDigit,
  getSingleDigit,
  calculateRowAnswers,
  calculateFinalAnswers,
} from '../../helpers/maths';

type StageName = 'first' | 'second' | 'final' | 'complete';

function App() {
  const [topNumber, setTopNumber] = useState(generateNumber(10, 99));
  const [bottomNumber, setBottomNumber] = useState(generateNumber(10, 99));
  const [currentStage, setCurrentStage] = useState<StageName>('first');
  const [answersIndex, setAnswersIndex] = useState(0);

  const topRowAnswers = calculateRowAnswers(getSingleDigit(bottomNumber), topNumber);
  const bottomRowAnswers = calculateRowAnswers(getTensDigit(bottomNumber), topNumber);
  const finalAnswers = calculateFinalAnswers(topRowAnswers, bottomRowAnswers);

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

  const regenTopNumber = () => {
    setTopNumber(generateNumber(10, 99));
  };
  const regenBottomNumber = () => {
    setBottomNumber(generateNumber(10, 99));
  };

  // const hardReset = () => {
  //   setCurrentStage('first');
  //   setAnswersIndex(0);
  // };

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
    <div>
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
              <td>
                <button className={classes.rotateNumberButton} disabled={isPassedStage('first') || isAnswerPassedIndex(0)} onClick={regenTopNumber}>
                  <img src={arrows} alt="Cycle arrows" />
                </button>
              </td>
            </tr>

            <tr className={classes.row}>
              <td className={cn({ [classes.active]: isFirstStage || isSecondStage })}>&times;</td>
              <td></td>
              <td></td>
              <td className={cn({ [classes.active]: isSecondStage && answersIndex < 2 })}>{getTensDigit(bottomNumber)}</td>
              <td className={cn({ [classes.active]: isFirstStage && answersIndex < 2 })}>{getSingleDigit(bottomNumber)}</td>
              <td>
                <button className={classes.rotateNumberButton} disabled={isPassedStage('first') || isAnswerPassedIndex(0)} onClick={regenBottomNumber}>
                  <img src={arrows} alt="Cycle arrows" />
                </button>
              </td>
            </tr>

            <tr>
              <td className={classes.divider} colSpan={5}></td>
            </tr>

            {/* TOP ROW */}
            <tr className={classes.row}>
              <td></td>
              <td></td>
              <td>
                <NumberInput
                  disabled={!(isFirstStage && isAnswerAtIndex(2))}
                  correctAnswer={topRowAnswers[2]}
                  onComplete={handleCorrectAnswer}
                  isHighlighted={isFinalStage && isAnswerAtIndex(2)}
                />
              </td>
              <td>
                <NumberInput
                  disabled={!(isFirstStage && isAnswerAtIndex(1))}
                  correctAnswer={topRowAnswers[1]}
                  onComplete={handleCorrectAnswer}
                  isHighlighted={isFinalStage && isAnswerAtIndex(1)}
                />
              </td>
              <td>
                <NumberInput
                  disabled={!(isFirstStage && isAnswerAtIndex(0))}
                  correctAnswer={topRowAnswers[0]}
                  onComplete={handleCorrectAnswer}
                  isHighlighted={isFinalStage && isAnswerAtIndex(0)}
                />
              </td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td>
                <CarriedOverCell
                  value={getTensDigit(topRowAnswers[1])}
                  isHidden={!(isPassedStage('first') || isAnswerPassedIndex(1))}
                  isHighlighted={isFirstStage && isAnswerAtIndex(2)}
                  isUsed={isPassedStage('first')}
                />
              </td>
              <td>
                <CarriedOverCell
                  value={getTensDigit(topRowAnswers[0])}
                  isHidden={!(isPassedStage('first') || isAnswerPassedIndex(0))}
                  isHighlighted={isFirstStage && isAnswerAtIndex(1)}
                  isUsed={isPassedStage('first') || isAnswerPassedIndex(1)}
                />
              </td>
              <td></td>
            </tr>

            {/* SECOND ROW */}
            <tr className={classes.row}>
              <td className={cn({ [classes.active]: isFinalStage })}>+</td>
              <td>
                <NumberInput
                  disabled={!(isSecondStage && isAnswerAtIndex(2))}
                  correctAnswer={bottomRowAnswers[2]}
                  onComplete={handleCorrectAnswer}
                  isHighlighted={isFinalStage && isAnswerAtIndex(3)}
                />
              </td>
              <td>
                <NumberInput
                  disabled={!(isSecondStage && isAnswerAtIndex(1))}
                  correctAnswer={bottomRowAnswers[1]}
                  onComplete={handleCorrectAnswer}
                  isHighlighted={isFinalStage && isAnswerAtIndex(2)}
                />
              </td>
              <td>
                <NumberInput
                  disabled={!(isSecondStage && isAnswerAtIndex(0))}
                  correctAnswer={bottomRowAnswers[0]}
                  onComplete={handleCorrectAnswer}
                  isHighlighted={isFinalStage && isAnswerAtIndex(1)}
                />
              </td>
              <td></td> {/* SINGLE DIGITS COLUMN NOT USED ON SECOND ROW */}
            </tr>

            <tr>
              <td></td>
              <td>
                <CarriedOverCell
                  value={getTensDigit(bottomRowAnswers[1])}
                  isHidden={!(isPassedStage('second') || (isSecondStage && isAnswerPassedIndex(1)))}
                  isHighlighted={isSecondStage && isAnswerAtIndex(2)}
                  isUsed={isPassedStage('second')}
                />
              </td>
              <td>
                <CarriedOverCell
                  value={getTensDigit(bottomRowAnswers[0])}
                  isHidden={!(isPassedStage('second') || (isSecondStage && isAnswerPassedIndex(0)))}
                  isHighlighted={isSecondStage && isAnswerAtIndex(1)}
                  isUsed={isPassedStage('second') || isAnswerPassedIndex(1)}
                />
              </td>
              <td></td> {/* never has a carried value */}
              <td></td> {/* never has a carried value */}
            </tr>

            <tr>
              <td className={classes.divider} colSpan={5}></td>
            </tr>

            {/* FINAL ROW / TOTAL */}
            <tr className={classes.row}>
              <td className={cn({ [classes.active]: isComplete })}>=</td>
              <td>
                <NumberInput
                  disabled={!(isFinalStage && isAnswerAtIndex(3))}
                  correctAnswer={finalAnswers[3]}
                  onComplete={handleCorrectAnswer}
                  isHighlighted={isComplete}
                />
              </td>
              <td>
                <NumberInput
                  disabled={!(isFinalStage && isAnswerAtIndex(2))}
                  correctAnswer={finalAnswers[2]}
                  onComplete={handleCorrectAnswer}
                  isHighlighted={isComplete}
                />
              </td>
              <td>
                <NumberInput
                  disabled={!(isFinalStage && isAnswerAtIndex(1))}
                  correctAnswer={finalAnswers[1]}
                  onComplete={handleCorrectAnswer}
                  isHighlighted={isComplete}
                />
              </td>
              <td>
                <NumberInput
                  disabled={!(isFinalStage && isAnswerAtIndex(0))}
                  correctAnswer={finalAnswers[0]}
                  onComplete={handleCorrectAnswer}
                  isHighlighted={isComplete}
                />
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                <CarriedOverCell
                  value={getTensDigit(finalAnswers[2])}
                  isHidden={!(isFinalStage && isAnswerPassedIndex(2))}
                  isHighlighted={isFinalStage && isAnswerAtIndex(3)}
                  isUsed={isComplete || (isFinalStage && isAnswerPassedIndex(3))}
                />
              </td>
              <td>
                <CarriedOverCell
                  value={getTensDigit(finalAnswers[1])}
                  isHidden={!(isFinalStage && isAnswerPassedIndex(1))}
                  isHighlighted={isFinalStage && isAnswerAtIndex(2)}
                  isUsed={isComplete || (isFinalStage && isAnswerPassedIndex(2))}
                />
              </td>
              <td></td>
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
    </div>
  )
}

export default App
