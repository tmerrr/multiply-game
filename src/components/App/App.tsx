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

// TEMPORARY!
// const doNothing = () => {};

const topNumber = generateNumber(10, 99);
const bottomNumber = generateNumber(10, 99);

const topRowAnswers = calculateRowAnswers(getSingleDigit(bottomNumber), topNumber);
const bottomRowAnswers = calculateRowAnswers(getTensDigit(bottomNumber), topNumber);
const finalAnswers = calculateFinalAnswers(topRowAnswers, bottomRowAnswers);

type RowName = 'top' | 'bottom' | 'final';

const answers: Record<RowName, number[]> = {
  top: topRowAnswers,
  bottom: bottomRowAnswers,
  final: finalAnswers,
};

const topNumberText = String(topNumber);
const bottomNumberText = String(bottomNumber);


function App() {
  const [answeringRow, setAnsweringRow] = useState<RowName>('top');
  const [answersIndex, setAnswersIndex] = useState(0);

  const incrementAnsweringRow = () => {
    if (answeringRow === 'top') setAnsweringRow('bottom');
    else setAnsweringRow('final');
  };

  const incrementAnswer = () => {
    const nextIndex = answersIndex + 1;
    if (nextIndex >= answers[answeringRow].length) {
      incrementAnsweringRow();
      setAnswersIndex(0);
    } else {
      setAnswersIndex(nextIndex);
    }
  };

  const handleCorrectAnswer = (carriedOver: number) => {
    console.log('<<<<<===== TO CARRY =====>>>>>', carriedOver);
    incrementAnswer();
  };

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
            <td>{topNumberText[0]}</td>
            <td className='activeDigit'>{topNumberText[1]}</td>
          </tr>

          <tr className='row'>
            <td>&times;</td>
            <td></td>
            <td></td>
            <td>{bottomNumberText[0]}</td>
            <td className='activeDigit'>{bottomNumberText[1]}</td>
          </tr>

          <tr>
            <td className="divider" colSpan={5}></td>
          </tr>

          {/* TOP ROW */}
          <tr className='row'>
            <td></td>
            <td></td>
            <td>
              <NumberInput
                disabled={!(answeringRow === 'top' && answersIndex === 2)}
                correctAnswer={topRowAnswers[2]}
                onComplete={handleCorrectAnswer}
              />
            </td>
            <td>
              <NumberInput
                disabled={!(answeringRow === 'top' && answersIndex === 1)}
                correctAnswer={topRowAnswers[1]}
                onComplete={handleCorrectAnswer}
              />
            </td>
            <td>
              <NumberInput
                disabled={!(answeringRow === 'top' && answersIndex === 0)}
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
            <td>+</td>
            <td>
              <NumberInput
                disabled={!(answeringRow === 'bottom' && answersIndex === 2)}
                correctAnswer={bottomRowAnswers[2]}
                onComplete={handleCorrectAnswer}
              />
            </td>
            <td>
              <NumberInput
                disabled={!(answeringRow === 'bottom' && answersIndex === 1)}
                correctAnswer={bottomRowAnswers[1]}
                onComplete={handleCorrectAnswer}
              />
            </td>
            <td>
              <NumberInput
                disabled={!(answeringRow === 'bottom' && answersIndex === 0)}
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
            <td>=</td>
            <td>
              <NumberInput
                disabled={!(answeringRow === 'final' && answersIndex === 3)}
                correctAnswer={finalAnswers[3]}
                onComplete={handleCorrectAnswer}
              />
            </td>
            <td>
              <NumberInput
                disabled={!(answeringRow === 'final' && answersIndex === 2)}
                correctAnswer={finalAnswers[2]}
                onComplete={handleCorrectAnswer}
              />
            </td>
            <td>
              <NumberInput
                disabled={!(answeringRow === 'final' && answersIndex === 1)}
                correctAnswer={finalAnswers[1]}
                onComplete={handleCorrectAnswer}
              />
            </td>
            <td>
              <NumberInput
                disabled={!(answeringRow === 'final' && answersIndex === 0)}
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
