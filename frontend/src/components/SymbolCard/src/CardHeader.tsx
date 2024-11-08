import upArrow from '../../../assets/up.png';
import downArrow from '../../../assets/down.png';
import './cardHeader.css';
import { memo } from 'react';

interface CardHeaderProps {
	id: string;
	trend: 'UP' | 'DOWN' | null;
};

const CardHeader = ({ trend, id }: CardHeaderProps) => {
	return (
		<div className="CardHeader">
			<span className="CardHeader__symbol">{id}</span>
			{trend && (
				<img
					src={trend === 'UP' ? upArrow : downArrow}
					alt={trend === 'UP' ? 'Up Trend' : 'Down Trend'}
					className="CardHeader__trend"
				/>
			)}
		</div>
	)
}

export default memo(CardHeader)