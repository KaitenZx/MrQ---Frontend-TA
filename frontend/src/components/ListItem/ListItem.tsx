import { memo } from 'react';
import './listItem.css';

type ListItemProps = {
  Icon: React.ComponentType;
  label: string;
  spacing?:
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline'
  | undefined;
};

const ListItem: React.FC<ListItemProps> = ({ Icon, label, spacing }) => {
  return (
    <div style={{ justifyContent: spacing }} className="listItem">
      <div className="listItem__icon">
        <Icon />
      </div>
      <div className="listItem__value">{label}</div>
    </div>
  );
};

export default memo(ListItem);
