import cn from 'classnames';
import { ChangeEventHandler, FormEventHandler, useState, RefObject } from 'react';
import { getSingleDigit } from '../../helpers/maths';
import classes from './NumberInput.module.css';
import 'bulma/css/bulma.css';

type NumberInputProps = {
  correctAnswer: number;
  disabled: boolean;
  isComplete: boolean;
  onComplete: () => void;
  inputRef: RefObject<HTMLInputElement>;
  isHighlighted?: boolean;
}

// allows empty string and two digit integers
const twoDigitIntegerRegex = /^$|^[0-9]{1,2}$/;
const isValidInteger = (value: string) => twoDigitIntegerRegex.test(value);

const NumberInput = ({
  correctAnswer,
  disabled,
  isComplete,
  onComplete,
  inputRef,
  isHighlighted = false,
}: NumberInputProps) => {
  const [value, setValue] = useState('');

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
      onComplete();
      setValue('');
    }
  };

  const inputForm = (
    <form action="submit" onSubmit={handleSubmit}>
      <input
        className={cn(classes.numberInput)}
        type="text"
        maxLength={2}
        value={value}
        onChange={handleInput}
        disabled={disabled}
        ref={inputRef}
      />
    </form>
  );

  const renderedNumber = (
    <div className={cn({ 'has-text-success': isHighlighted })}>
      {getSingleDigit(correctAnswer)}
    </div>
  );

  return isComplete ? renderedNumber : inputForm
};

export default NumberInput;
