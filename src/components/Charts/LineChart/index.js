import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { Button, ButtonGroup } from '@material-ui/core';

const generateOptions = (data) => {//
  const categories = data.map((item) => moment(item.Date).format('DD/MM/YYYY'));//lay ra 1 arr va tung item cua arr chinh date (date lay bang cach map qua data)
//boc date vao moment va format no theo form DD/MM/YYYY
  return {
    chart: {//set chieu cao cho line chart 
      height: 500,
    },
    title: {
      text: 'Tổng ca nhiễm',
    },
    xAxis: {
      categories: categories,//day la cac du lieu ve ngay 
      crosshair: true,
    },
    colors: ['#F3585B'],//mau cua line chart
    yAxis: {//set cac gia tri cho truc y
      min: 0,
      title: {
        text: null,
      },
      labels: {
        align: 'right', 
      },
    },
    tooltip: {//tooltip giai thich trong gg doc
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [//day la du lieu ma ta truyen vao de hien thi trong line chart 
      {
        name: 'Tổng Ca nhiễm',
        data: data.map((item) => item.Confirmed),
      },
    ],
  };
};

export default function LineChart({ data }) {//data la du lieu truyen component cha 
  const [options, setOptions] = useState({});
  const [reportType, setReportType] = useState('all');//state de phan biet ta dang chon 1 button nao trong 3 button(tat ca, 30 ngay, 7ngay), mac dinh no la all co nghia la button Tat ca
  console.log({ data });

  useEffect(() => {
    //code duoi de xu ly viec nguoi dung select vao button chon ngay nao (tat ca, 30, 7 ngay)
    let customData = [];
    switch (reportType) {
      case 'all':
        customData = data;
        break;
      case '30':
        customData = data.slice(Math.max(data.length - 30, 1));//fill ra du lieu cua 30 ngay gan nhat
        break;
      case '7':
        customData = data.slice(Math.max(data.length - 7, 1));//fill ra du lieu cua 7 ngay gan nhat
        break;

      default:
        customData = data;
        break;
    }

    setOptions(generateOptions(customData));//truyen vao setOption mot tham so la customData cua generateOptions
  }, [data, reportType]);//khi data hay reportType co thay doi thi useEffect re render lai

  return (
    <>
      <ButtonGroup
      //ButtonGroup den tu marterialUI
        size='small'
        aria-label='small outlined button group'
        style={{
          display: 'flex',
          justifyContent: 'flex-end',//de di chuyen cac button chua tron no sang phia ben phai
        }}
      >
        <Button
          color={reportType === 'all' ? 'secondary' : ''}//reportType la 1 attribute, ta xem no co = voi gia tri all hay ko, neu = ta cho no co mau secondary( mau dc dinh nghia boi marterialUi mac dinh la mau do)
          onClick={() => setReportType('all')}//khi click vao thi ta tien hanh set lai reportType
        >
          Tất cả
        </Button>
        <Button
          color={reportType === '30' ? 'secondary' : ''}//kiem tra reportType = 30 khong neu co thi cho mau do
          onClick={() => setReportType('30')}
        >
          30 ngày
        </Button>
        <Button
          color={reportType === '7' ? 'secondary' : ''}//kiem tra xem reportType co bang 7 hay khong neu = thi cho mau do
          onClick={() => setReportType('7')}
        >
          7 ngày
        </Button>
      </ButtonGroup>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
}
