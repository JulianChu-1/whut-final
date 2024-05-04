import { DemoWordCloudProps } from '@/types';
import { WordCloud } from '@ant-design/plots';
import { Empty } from 'antd';
import React from 'react';


const DemoWordCloud: React.FC<DemoWordCloudProps> = ({ data }) => {

  if (!data || !data.length) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />; // 当没有数据时显示
  }

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