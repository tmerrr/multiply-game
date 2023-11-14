import 'bulma/css/bulma.css';

type PlayAgainButtonProps = {
  onClick: () => void;
};

const PlayAgainButton = ({ onClick }: PlayAgainButtonProps) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button className='button is-success' onClick={handleClick}>
      Play Again
    </button>
  );
};

export default PlayAgainButton;
