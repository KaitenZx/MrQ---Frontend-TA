import React, { memo } from 'react';
import './CardAdditionalInfo.css';
import ListItem from '@/components/ListItem';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';

interface CardAdditionalInfoProps {
	companyName: string;
	industry: string;
	formattedMarketCap: string;
};

const CardAdditionalInfo = ({ companyName, industry, formattedMarketCap }: CardAdditionalInfoProps) => {
	return (
		<div className="additional-info">
			<ListItem spacing="space-between" Icon={CompanyIcon} label={companyName} />
			<ListItem spacing="space-between" Icon={IndustryIcon} label={industry} />
			<ListItem spacing="space-between" Icon={MarketCapIcon} label={formattedMarketCap} />
		</div>
	);
};

export default memo(CardAdditionalInfo);
