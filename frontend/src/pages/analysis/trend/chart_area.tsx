import React from 'react';
import { Area } from '@ant-design/plots';
import { DemoAreaProps } from '@/types';


const DemoArea: React.FC<DemoAreaProps> = ({ data }) => {
  const config = {
    data,
    width: 800,
    height: 300,
    xField: (d : any) => new Date(d.date),
    yField: 'number',
    colorField: 'category',
    shapeField: 'smooth',
    stack: true, // Try to remove this line.
  };
  return <Area {...config} />;
};

export default DemoArea;