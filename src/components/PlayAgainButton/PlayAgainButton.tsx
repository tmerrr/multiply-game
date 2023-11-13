import classes from './PlayAgainButton.module.css';

type PlayAgainButtonProps = {
  onClick: () => void;
};

const PlayAgainButton = ({ onClick }: PlayAgainButtonProps) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button className={classes.mainButton} onClick={handleClick}>
      Play Again
    </button>
  );
};

export default PlayAgainButton;
