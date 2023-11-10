import cn from 'classnames';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { getSingleDigit } from '../../helpers/maths';
import classes from './NumberInput.module.css';

type NumberInputProps = {
  correctAnswer: number;
  disabled: boolean;
  onComplete: () => void;
  isHighlighted?: boolean;
}

// allows empty string and two digit integers
const twoDigitIntegerRegex = /^$|^[0-9]{1,2}$/;
const isValidInteger = (value: string) => twoDigitIntegerRegex.test(value);

const NumberInput = ({
  correctAnswer,
  onComplete,
  disabled,
  isHighlighted = false,
}: NumberInputProps) => {
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
      onComplete();
    }
  };

  const inputForm = (
    <form action="submit" onSubmit={handleSubmit}>
      <input
        className={classes.numberInput}
        type="text"
        maxLength={2}
        value={value}
        onChange={handleInput}
        disabled={disabled}
      />
    </form>
  );

  const renderedNumber = (
    <div className={cn({ [classes.active]: isHighlighted })}>
      {getSingleDigit(value)}
    </div>
  );

  return isComplete ? renderedNumber : inputForm
};

export default NumberInput;
