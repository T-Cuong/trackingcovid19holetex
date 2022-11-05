import React from 'react';
import { Grid } from '@material-ui/core';
import HighlightCard from './HighlightCard';

export default function Highlight({ summary }) {//lay ra prop summary ma ta truyen vao tu component App.js
  return (
    <Grid container spacing={3}>  {/**dung grid de chia ra 3 cot*/} 
      {summary.map((data) => (//map qua du lieu tu arr summary
        <Grid item sm={4} xs={12}>{/**doi voi kich thuoc man hinh la sm chia ra lam 3 cot vi he thong grid cua material-ui 
        chia lam 12 cot, neu ta muon co 3 cot o tren 1 hang thi ta set sm cho 3 cot nay 4*3=12 
  doi voi kich thuoc man hinh la xs kich thuoc dien thoai thi ta de cho 3 cot nay hien thi moi thang tren mot hang*/}
          <HighlightCard 
          //truyen cac prop duoi vao HighlightCard component 
            title={data.title}//so ca nhiem
            count={data.count}//tong so ca nhiem tinh den ngay hien tai 
            type={data.type}//dua tren du lieu cua type de tao ma mau tuong ung vi so ca nhiem mau do, ca khoi mau xanh, tu von mau xam
          />
        </Grid>
      ))}
    </Grid>
  );
}
