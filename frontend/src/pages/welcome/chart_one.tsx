import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

const GaugeChart = () => {
  const option = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        progress: {
          show: true
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}'
        },
        data: [
          {
            value: 50,
            name: 'SCORE'
          }
        ]
      }
    ]
  };

  return (
    <div id="gauge-chart">
      <ReactECharts option={option} />
    </div>
  );
};

export default GaugeChart;