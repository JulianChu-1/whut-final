import React from 'react';
import { Heatmap } from '@ant-design/plots';

const data = [
    {
      "date": "2024-01-22T00:00:00.000Z",
      "category": "娱乐",
      "number": 1
    },
    {
      "date": "2024-01-22T00:00:00.000Z",
      "category": "娱乐",
      "number": 36
    },
    {
      "date": "2024-01-08T00:00:00.000Z",
      "category": "娱乐",
      "number": 2
    },
    {
      "date": "2024-03-02T00:00:00.000Z",
      "category": "娱乐",
      "number": 3
    }
]

const DemoHeatmap : React.FC = () => {
  const config = {
    width: 800,
    height: 300,

    autoFit: false,
    data,
    xField: (d : any) => new Date(d.date).getUTCDate(),
    yField: (d : any) => new Date(d.date).getUTCMonth(),
    colorField: 'temp_max',
    legend: {},
    mark: 'cell',
    style: { inset: 0.5 },
    tooltip: {
      title: 'date',
      field: 'number',
      valueFormatter: '~s',
      pointerEvents: 'none'
    },
  };

  return <Heatmap {...config} />;
};

export default DemoHeatmap;