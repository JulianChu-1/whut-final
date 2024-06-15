import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

interface EventWithAxesInfo {
  axesInfo: { value: number }[];
}

const MyEChartsComponent: React.FC = () => {
    const echartInstance = useRef<ReactECharts>(null);
  
    const getOption = () => ({
      legend: {},
      tooltip: {
        trigger: 'axis',
        showContent: false
      },
      dataset: {
        source: [
          ['类别', '最近五天', '最近十四天', '最近一个月', '最近三个月', '最近半年', '全部'],
          ['娱乐', 1, 5, 8, 20, 34, 59],
          ['体育', 5, 16, 30, 73, 152, 203],
          ['教育', 0, 2, 3, 7, 13, 21],
          ['经济', 1, 6, 11, 19, 32, 51],
          ['科技', 2, 3, 10, 53, 68, 91]
        ]
      },
      xAxis: { type: 'category' },
      yAxis: { gridIndex: 0 },
      grid: { top: '55%' },
      series: [
        { type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
        { type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
        { type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
        { type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
        { type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
        {
          type: 'pie',
          id: 'pie',
          radius: '30%',
          center: ['50%', '25%'],
          emphasis: { focus: 'self' },
          label: { formatter: '{b}: {@最近五天} ({d}%)' },
          encode: { itemName: '类别', value: '最近五天', tooltip: '最近五天' }
        }
      ]
    });
  
    useEffect(() => {
        if (echartInstance.current) {
          const instance = echartInstance.current.getEchartsInstance();
          instance.on('updateAxisPointer', (event) => {
            const xAxisInfo = (event as EventWithAxesInfo).axesInfo[0];
            if (xAxisInfo) {
              const dimension = xAxisInfo.value + 1;
              instance.setOption({
                series: {
                  id: 'pie',
                  label: { formatter: `{b}: {@[${dimension}]} ({d}%)` },
                  encode: { value: dimension, tooltip: dimension }
                }
              });
            }
          });
        }
      }, []);
  
    return (
      <ReactECharts
        ref={echartInstance}
        option={getOption()}
        style={{ height: 425, width: '100%' }}
      />
    );
  };
  
  export default MyEChartsComponent;