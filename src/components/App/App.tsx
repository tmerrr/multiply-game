import { useState } from 'react'

import './App.css'
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

const topNumberText = String(topNumber);
const bottomNumberText = String(bottomNumber);


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
    if (nextIndex >= answersMap[currentStage].length) {
      incrementStage();
      setAnswersIndex(0);
    } else {
      setAnswersIndex(nextIndex);
    }
  };

  const handleCorrectAnswer = (carriedOver: number) => {
    console.log('<<<<<===== TO CARRY =====>>>>>', carriedOver);
    incrementAnswer();
  };

  const isFirstStage = currentStage === 'first';
  const isSecondStage = currentStage === 'second';
  const isFinalStage = currentStage === 'final';
  const isComplete = currentStage === 'complete';
  const isAnswerIndex = (i: number) => answersIndex === i;

  return (
    <div className="container">
      <table className="mainTable">

        <thead className="tableHead">

          <tr className='row'>
            <th></th>
            <th>1,000's</th>
            <th>100's</th>
            <th>10's</th>
            <th>1's</th>
          </tr>

        </thead>

        <tbody className="tableBody">

          <tr className='row'>
            <td></td>
            <td></td>
            <td></td>
            <td className={(isFirstStage || isSecondStage) && isAnswerIndex(1) ? 'active' : ''}>{topNumberText[0]}</td>
            <td className={(isFirstStage || isSecondStage) && isAnswerIndex(0) ? 'active' : ''}>{topNumberText[1]}</td>
          </tr>

          <tr className='row'>
            <td className={(isFirstStage || isSecondStage) ? 'active' : ''}>&times;</td>
            <td></td>
            <td></td>
            <td className={isSecondStage && answersIndex < 2 ? 'active' : ''}>{bottomNumberText[0]}</td>
            <td className={isFirstStage && answersIndex < 2 ? 'active' : ''}>{bottomNumberText[1]}</td>
          </tr>

          <tr>
            <td className="divider" colSpan={5}></td>
          </tr>

          {/* TOP ROW */}
          <tr className='row'>
            <td></td>
            <td></td>
            <td className={isFinalStage && isAnswerIndex(2) ? 'active' : ''}>
              <NumberInput
                disabled={!(isFirstStage && isAnswerIndex(2))}
                correctAnswer={topRowAnswers[2]}
                onComplete={handleCorrectAnswer}
              />
            </td>
            <td className={isFinalStage && isAnswerIndex(1) ? 'active' : ''}>
              <NumberInput
                disabled={!(isFirstStage && isAnswerIndex(1))}
                correctAnswer={topRowAnswers[1]}
                onComplete={handleCorrectAnswer}
              />
            </td>
            <td className={isFinalStage && isAnswerIndex(0) ? 'active' : ''}>
              <NumberInput
                disabled={!(isFirstStage && isAnswerIndex(0))}
                correctAnswer={topRowAnswers[0]}
                onComplete={handleCorrectAnswer}
              />
            </td>
          </tr>

          <tr className='carriedRow'>
            <td></td>
            <td></td>
            <td>{getTensDigit(topRowAnswers[1])}</td>
            <td>{getTensDigit(topRowAnswers[0])}</td>
            {/* <td className='used'>1</td> */}
            <td></td>
          </tr>

          {/* SECOND ROW */}
          <tr className='row'>
            <td className={isFinalStage ? 'active' : ''}>+</td>
            <td className={isFinalStage && isAnswerIndex(3) ? 'active' : ''}>
              <NumberInput
                disabled={!(isSecondStage && isAnswerIndex(2))}
                correctAnswer={bottomRowAnswers[2]}
                onComplete={handleCorrectAnswer}
              />
            </td>
            <td className={isFinalStage && isAnswerIndex(2) ? 'active' : ''}>
              <NumberInput
                disabled={!(isSecondStage && isAnswerIndex(1))}
                correctAnswer={bottomRowAnswers[1]}
                onComplete={handleCorrectAnswer}
              />
            </td>
            <td className={isFinalStage && isAnswerIndex(1) ? 'active' : ''}>
              <NumberInput
                disabled={!(isSecondStage && isAnswerIndex(0))}
                correctAnswer={bottomRowAnswers[0]}
                onComplete={handleCorrectAnswer}
              />
            </td>
            <td></td> {/* SINGLE DIGITS COLUMN NOT USED ON SECOND ROW */}
          </tr>

          <tr className='carriedRow'>
            <td></td>
            <td>{getTensDigit(bottomRowAnswers[1])}</td>
            <td>{getTensDigit(bottomRowAnswers[0])}</td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td className="divider" colSpan={5}></td>
          </tr>

          {/* FINAL ROW / TOTAL */}
          <tr className='row'>
            <td className={isComplete ? 'active' : ''}>=</td>
            <td className={isComplete ? 'active' : ''}>
              <NumberInput
                disabled={!(isFinalStage && isAnswerIndex(3))}
                correctAnswer={finalAnswers[3]}
                onComplete={handleCorrectAnswer}
              />
            </td>
            <td className={isComplete ? 'active' : ''}>
              <NumberInput
                disabled={!(isFinalStage && isAnswerIndex(2))}
                correctAnswer={finalAnswers[2]}
                onComplete={handleCorrectAnswer}
              />
            </td>
            <td className={isComplete ? 'active' : ''}>
              <NumberInput
                disabled={!(isFinalStage && isAnswerIndex(1))}
                correctAnswer={finalAnswers[1]}
                onComplete={handleCorrectAnswer}
              />
            </td>
            <td className={isComplete ? 'active' : ''}>
              <NumberInput
                disabled={!(isFinalStage && isAnswerIndex(0))}
                correctAnswer={finalAnswers[0]}
                onComplete={handleCorrectAnswer}
              />
            </td>
          </tr>

          <tr className='carriedRow'>
            <td></td>
            <td>{getTensDigit(finalAnswers[2])}</td>
            <td>{getTensDigit(finalAnswers[1])}</td>
            <td>{getTensDigit(finalAnswers[0])}</td>
            <td></td>
          </tr>

        </tbody>

        <tfoot className="tableHead">

          <tr className='row'>
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
