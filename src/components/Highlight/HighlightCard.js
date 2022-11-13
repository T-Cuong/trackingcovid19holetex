import React from 'react';
import { CardContent, Typography, Card, makeStyles } from '@material-ui/core';
import CountUp from 'react-countup';

const useStyles = makeStyles({//bien useStyles nhan vao mot prop la 1 obj co ten la wrapper, dung wrapper de style cho Card component, de viet style cho marterial ui ta dung makeStyles  
  wrapper: (props) => {//function nhan vao 1 tham so la props va tra ve cac obj ben duoi
    console.log({ props });
    if (props.type === 'confirmed') return { borderLeft: '5px solid #c9302c' };//type confirmed la so ca mac
    if (props.type === 'recovered') return { borderLeft: '5px solid #28a745' };//type recovered la so ca hoi phuc
    else return { borderLeft: '5px solid gray' }; // mac dinh la mau xam cho tu vong 
  },
  title: { fontSize: 18, marginBottom: 5 },//css cho title 
  count: { fontWeight: 'bold', fontSize: 18 },//css cho count 
});

export default function HighlightCard({ title, count, type }) {//cac tham so nhan vao : title(tuong ung voi so ca mac), count(tuong ung voi so ca nhiem), type nhan vao tu app.js
  const classes = useStyles({ type });//khai bao bien classes va truyen 1 prop la type o trong phan makeStyles 
  return (
    <Card className={classes.wrapper}> {/*gan style la classes.wrapper vao attribute la className thi card se co style tuong ung voi wrapper*/}
      <CardContent>{/**phan duoi hien thi cho so ca nhiem , khoi, chet cung voi so luong phia duoi */}
        <Typography variant='body2' component='p' className={classes.title}> {/**truyen vao className la class.title de css */}
          {title}
        </Typography>
        <Typography variant='body2' component='span' className={classes.count}>{/**truyen vao className la classes.count de css */}
          <CountUp end={count} separator=' ' duration={2} />{/**boc count vao Countup de khi load trang no co hieu ung chu 
           * so trong count tang len chu ko in ra luon count
           * no se tang trong khoang thoi gian quy dinh la 2s, separator de phan cach tung phan nghin trong cac so trong count
           */}
        </Typography>
      </CardContent>
    </Card>
  );
}
