import React from 'react';
import { Column } from '@ant-design/charts';

interface DemoColumnProps {
  data: { type: string; value: number }[];
}

const DemoColumn: React.FC<DemoColumnProps> = ({ data }) => {
  const config = {
    data,
    width: 800,
    height: 245,
    paddingBottom: 5,
    paddingRight: 0,
    marginRight: 0,
    autoFit: false,
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

