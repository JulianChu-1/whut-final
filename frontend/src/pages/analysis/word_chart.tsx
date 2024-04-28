import { DemoWordCloudProps } from '@/types';
import { WordCloud } from '@ant-design/plots';
import React from 'react';

const data = [
    {"value":11.7392043070835,"text":"水是"},
    {"value":9.23723855786,"text":"之源"},
]

const DemoWordCloud: React.FC<DemoWordCloudProps> = ({ data }) => {
  const config = {
    height: 385,
    paddingTop: 10,
    data,
    layout: { spiral: 'rectangular' },
    colorField: 'text',
  };
  return <WordCloud {...config} />;
};

export default DemoWordCloud;