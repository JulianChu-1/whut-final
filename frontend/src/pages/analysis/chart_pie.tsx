import React from 'react';
import ReactECharts from 'echarts-for-react';
import { DemoPieProps } from '@/types';
import { Empty } from 'antd';

const DemoPie: React.FC<DemoPieProps> = ({ data }) => {

  if (!data || !data.length) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />; // 当没有数据时显示
  }
  
  // 图表配置项
  const option = {
    // title: {
    //   text: 'Referer of a Website',
    //   subtext: 'Fake Data',
    //   left: 'center'
    // },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['35%', '80%'],
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ],

  };

  return (
    <ReactECharts
      option={option}
      style={{ height: 400, width: '100%' }} // 设置图表的宽度和高度
    />
  );
};

export default DemoPie;