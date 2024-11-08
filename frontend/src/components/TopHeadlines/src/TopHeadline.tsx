import React, { useMemo } from 'react';
import ListItem from '@/components/ListItem';
import PerformanceEmoji from '@/components/TopHeadlines/src/PerformanceEmoji';
import { Bias } from '@/lib';

type TopHeadlineProps = {
  bias: Bias;
  headline: string;
};

const TopHeadline = ({ bias, headline }: TopHeadlineProps) => {

  const MemoizedIcon = () => <PerformanceEmoji bias={bias} />

  return <ListItem Icon={MemoizedIcon} label={headline} />;
};

export default TopHeadline;
