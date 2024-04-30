import { DemoWordCloudProps } from '@/types';
import { WordCloud } from '@ant-design/plots';
import React from 'react';


const DemoWordCloud: React.FC<DemoWordCloudProps> = ({ data }) => {
  const config = {
    data,
    width: 400,
    height: 385,
    autoFit: true,
    paddingTop: 10,
    layout: { spiral: 'rectangular' },
    colorField: 'text',
  };
  return <WordCloud {...config} />;
};

export default DemoWordCloud;