import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';

import { getMapDataByCountryId } from '../apis';
import LineChart from '../Charts/LineChart';
import HighMaps from '../Charts/HighMaps';

export default function Summary({ countryId, report }) {//lay ra prop repor a ta da truyen cho Summary trong App.js, lay prop countryId ta da truyen no cho Summary trong file App.js 
  const [mapData, setMapData] = useState({});//state luu tru map data tuong ung voi country hien tai

  useEffect(() => {//load ra map data tuong ung voi country hien tai
    if (countryId) {
      getMapDataByCountryId(countryId)
        .then((res) => {//getMapDataByCountryId la 1 promise nen ta dung then de lay ra gia tri
          setMapData(res);//sau khi gia tri duoc tra ve ta setMapData voi gia tri res 
        })
        .catch((err) => console.log({ err }));
    }
  }, [countryId]);//countryId thay doi useEffect load lai

  return (
    <div style={{ height: '500px', marginTop: 10 }}>
      <Grid container spacing={3}>{/*chia 2 cot 1 cot chiem 2/3, 1cot chiem 1/3**/} 
        <Grid item sm={8} xs={12}>
          <LineChart data={report} />{/**truyen prop report vao data cua LineChart */} 
        </Grid>
        <Grid item sm={4} xs={12}>
          <HighMaps mapData={mapData} />{/**truyen mapData vao lam tham so cua HighMaps component */}
        </Grid>
      </Grid>
    </div>
  );
}
