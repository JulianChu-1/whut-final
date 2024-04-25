import React from 'react';
import { Column } from '@ant-design/charts';

const data = [
  { type: '1', value: 0 },
  { type: '2', value: 0 },
  { type: '3', value: 0 },
  { type: '4', value: 23 },
  { type: '5', value: 555 },
  { type: '6', value: 24 },
  { type: '7', value: 0 },
  { type: '8', value: 0 },
  { type: '9', value: 0 },
  { type: '10', value: 0 },
  { type: '11', value: 0 },
  { type: '12', value: 0 },
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
    // label: {
    //   text: (originData: any) => {
    //     const val = parseFloat(originData.value);
    //     if (val < 0.05) {
    //       return (val * 100).toFixed(1) + '%';
    //     }
    //     return '';
    //   },
    //   offset: 10,
    // },
    legend: false,
  };
  return <Column {...config}/>;
};

export default DemoColumn;

