
import Icon from '@mdi/react';
import { mdiAutorenew } from '@mdi/js';
import 'bulma/css/bulma.css';

type RotateButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

const RotateButton = ({
  onClick,
  disabled = false,
}: RotateButtonProps) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button className='button is-primary is-square is-rounded' disabled={disabled} onClick={handleClick}>
      <Icon path={mdiAutorenew} size={1} color='white' />
    </button>
  );
};

export default RotateButton;
