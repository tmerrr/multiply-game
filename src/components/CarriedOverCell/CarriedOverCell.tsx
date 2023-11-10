import cn from 'classnames';
import classes from './CarriedOverCell.module.css';

type CarryOverProps = {
  value: number;
  isHidden: boolean;
  isHighlighted: boolean;
  isUsed: boolean;
};

const CarriedOverCell = ({ value, isHighlighted: isActive, isHidden, isUsed }: CarryOverProps) => {
  const rendered = (
    <div className={cn({
      [classes.carriedOverCell]: true,
      [classes.active]: isActive,
      [classes.used]: isUsed,
    })}>
      {value}
    </div>
  );
  return isHidden || value === 0 ? null : rendered;
}

export default CarriedOverCell;
