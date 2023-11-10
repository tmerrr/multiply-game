// import { FormEventHandler } from 'react'

import './App.css'
import NumberInput from '../NumberInput/NumberInput';

function App() {

  const handleTopSinglesAnswer = () => {
    console.log('well done!');
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
            <td>2</td>
            <td className='activeDigit'>3</td>
          </tr>

          <tr className='row'>
            <td>&times;</td>
            <td></td>
            <td></td>
            <td>4</td>
            <td className='activeDigit'>5</td>
          </tr>

          <tr>
            <td className="divider" colSpan={5}></td>
          </tr>

          {/* TOP ROW */}
          <tr className='row'>
            <td></td>
            <td><input className="numberInput" disabled={true} type="text" maxLength={2} /></td>
            <td><input className="numberInput" disabled={true} type="text" maxLength={2} /></td>
            <td><input className="numberInput" disabled={true} type="text" maxLength={2} /></td>
            <td><NumberInput disabled={false} correctAnswer={15} onComplete={handleTopSinglesAnswer} /></td>
            {/* <td>
              <form action="submit" onSubmit={noSubmit}>
                <input className="numberInput" type="text" maxLength={2} />
              </form>
            </td> */}
          </tr>

          <tr className='carriedRow'>
            <td></td>
            <td></td>
            <td></td>
            <td className='carriedOverUsed'>1</td>
            <td></td>
          </tr>

          {/* SECOND ROW */}
          <tr className='row'>
            <td>+</td>
            <td><input className="numberInput" disabled={true} type="text" maxLength={2} /></td>
            <td><input className="numberInput" disabled={true} type="text" maxLength={2} /></td>
            <td><input className="numberInput" disabled={true} type="text" maxLength={2} /></td>
            <td>0</td>
          </tr>

          <tr className='carriedRow'>
            <td></td>
            <td></td>
            <td>1</td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td className="divider" colSpan={5}></td>
          </tr>

          {/* FINAL ROW / TOTAL */}
          <tr className='row'>
            <td>=</td>
            <td><input className="numberInput" disabled={true} type="text" maxLength={2} /></td>
            <td><input className="numberInput" disabled={true} type="text" maxLength={2} /></td>
            <td><input className="numberInput" disabled={true} type="text" maxLength={2} /></td>
            <td><input className="numberInput" disabled={true} type="text" maxLength={2} /></td>
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