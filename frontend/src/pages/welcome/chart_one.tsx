import React from 'react';
import { Column, Line } from '@ant-design/charts';

const data = [
  { type: '1', value: 0.16 },
  { type: '2', value: 0.125 },
  { type: '3', value: 0.24 },
  { type: '4', value: 0.19 },
  { type: '5', value: 0.22 },
  { type: '6', value: 0.05 },
  { type: '7', value: 0.01 },
  { type: '8', value: 0.01 },
  { type: '9', value: 0.015 },
  { type: '10', value: 0.012 },
  { type: '11', value: 0.08 },
  { type: '12', value: 0.015 },
];

const DemoColumn: React.FC = () => {
  const config = {
    width: 800,
    height: 245,
    paddingBottom: 5,
    paddingRight: 0,
    marginRight: 0,
    autoFit: false,
    data,
    xField: 'type',
    yField: 'value',
    style: '#2989FF',
    label: {
      text: (originData: any) => {
        const val = parseFloat(originData.value);
        if (val < 0.05) {
          return (val * 100).toFixed(1) + '%';
        }
        return '';
      },
      offset: 10,
    },
    legend: false,
  };
  return <Column {...config}/>;
};

export default DemoColumn;

