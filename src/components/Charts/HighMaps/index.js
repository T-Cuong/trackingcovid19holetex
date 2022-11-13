import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import { cloneDeep } from 'lodash';

// Load Highcharts modules
highchartsMap(Highcharts);//de dung map trong hightchart react ta lam nhu nay

const initOptions = {//css
  chart: {
    height: '500',
  },
  title: {
    text: null,
  },
  mapNavigation: {
    enabled: true,//de di chuyen vao keo tha map
  },
  colorAxis: {
    min: 0,
    stops: [
      [0.2, '#FFC4AA'], //doi voi cac gia tri tu 0 -> 0.2 thi co ma mau FFC4AA, moi tinh co 1 ma mau khac nha la nho cai nay
      [0.4, '#FF8A66'],
      [0.6, '#FF392B'],
      [0.8, '#B71525'],
      [1, '	#7A0826'],
    ],
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'bottom',
  },
  series: [
    {
      name: 'Dân số',
      joinBy: ['hc-key', 'key'],
    },
  ],
};

const HighMaps = ({ mapData }) => {//mapdata la obj json tuong ung voi tung nuoc khac nhau, mapdata la prop duoc truyen tu Summary/index.js qua
  const [options, setOptions] = useState({});
  const [mapLoaded, setMapLoaded] = useState(false);/**truoc khi return ra highchartreact ta co mot cai co 
  la mapLoaded va mac dinh cua no la false */
  const chartRef = useRef(null);/*boi vi ta thay doi mapdata trong option, nen de load len duoc ban do tuong ung thi ta khai bao 
  mot state chartRef va dung method de update country sau khi mapdata thay doi de du lieu tra ve chinh xac*/

  useEffect(() => {
    if (mapData && Object.keys(mapData).length) {/**truoc khi thuc thi doan code ta kiem tra xem mapData co gia tri hay ko
    va kiem tra xem trong obj co keys nao hay ko  */
      console.log({ mapData });
      const fakeData = mapData.features.map((feature, index) => ({//vi ko co du lieu cho tung tinh nen ta tao ra 1 fake data
        /**features chua ta ca cac tinh cua mot quoc gia 
         * dau tien ta map qua fetures trong mapData de tao ra cac data gia cho tung tinh, trong function nay co 2 tham so 1 la feature 2 la index
         * tung data se co 1 cap key va value */ 
        key: feature.properties['hc-key'],//ta lay gia tri cua key tu hc-key trong feature -> properties lam key 
        value: index,//gia tri nay la index tron arr ta map phia tren
      }));

      setOptions(() => ({//khi mapdata thay doi ta setOptions voi 1 obj (obj nay se lay lai obj initOptions)
        ...initOptions,
        title: {
          text: mapData.title,
        },
        series: [
          { ...initOptions.series[0], mapData: mapData, data: fakeData },//khi mapdata thay doi ta lay lai obj initOptions bang toan tu spread bang code tren va ghi de mapData.title moi vao obj do
        ],
      }));

      if (!mapLoaded) setMapLoaded(true);//kiem tra xem mapLoaded da duoc load hay chua neu chua thi setMapLoaded la true
    }
  }, [mapData, mapLoaded]);//khi mapData hoac mapLoaded thay doi thi useEffect load lai (mapData thay doi khi ta thay doi 1 country khac)

  useEffect(() => {
    if (chartRef && chartRef.current) {/*kiem tra xem chartRef va chartRef.curent co du lieu hay ko  */
      chartRef.current.chart.series[0].update({//neu co truy xuat ra chartRef dung method update de update lai mapData
        mapData,
      });
    }
  }, [options, mapData]);//khi option hoac mapData thay doi thi useEffect nay chay lai

  if (!mapLoaded) return null;//neu mapLoaded la flase tra ve null

  return (
    <HighchartsReact
      highcharts={Highcharts}//truyen prop highcharts vao HighchartsReact
      options={cloneDeep(options)}/*clonDeep cua lodash no se coppy va tao ra 1 obj moi cho options roi 
      truyen prop options vao HighchartsReact, luc nay options phia truoc se ko bi thay doi*/ 
      constructorType={'mapChart'}// confir constructorType = mapChart va truyen prop vao HighchartsReact
      ref={chartRef}//
    />
  );
};

HighMaps.defaultProps = {
  mapData: {},
};

export default React.memo(HighMaps);
