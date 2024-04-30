import React from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import { DemoPieProps } from '@/types';


const DemoPie: React.FC<DemoPieProps> = ({ data }) => {
    const config = {
      data,
      width: 400,
      height: 385,
      //autoFit: true,
      marginTop: 0,
      marginRight: 0,
      paddingLeft: 40,
      angleField: 'value',
      colorField: 'type',
      label: {
        text: 'value',
        position: 'outside',
      },
      legend: {
        color: {
          title: false,
          position: 'right',
          rowPadding: 5,
        },
      },
    };
    return <Pie {...config} />;
  };

export default DemoPie;