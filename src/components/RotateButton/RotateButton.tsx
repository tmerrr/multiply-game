import classes from './RotateButton.module.css';
import arrows from './circle-arrows.png';

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
    <button className={classes.mainButton} disabled={disabled} onClick={handleClick}>
      <img src={arrows} alt="Cycle arrows" />
    </button>
  );
};

export default RotateButton;
