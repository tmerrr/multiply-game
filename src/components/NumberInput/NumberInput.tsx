import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { getTensDigit, getSingleDigit } from '../../helpers/maths';

type NumberInputProps = {
  correctAnswer: number;
  disabled: boolean;
  onComplete: (carriedOver: number) => void;
}

// allows empty string and two digit integers
const twoDigitIntegerRegex = /^$|^[0-9]{1,2}$/;
const isValidInteger = (value: string) => twoDigitIntegerRegex.test(value);

const NumberInput = ({ correctAnswer, onComplete, disabled }: NumberInputProps) => {
  const [value, setValue] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const handleInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { value },
    } = event;
    if (isValidInteger(value)) {
      setValue(event.target.value);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (Number(value) === correctAnswer) {
      setIsComplete(true);
      onComplete(getTensDigit(value));
    }
  };

  const inputForm = (
    <form action="submit" onSubmit={handleSubmit}>
      <input
        className="numberInput"
        type="text"
        maxLength={2}
        value={value}
        onChange={handleInput}
        disabled={disabled}
      />
    </form>
  );

  return isComplete ? getSingleDigit(value) : inputForm;
};

export default NumberInput;
