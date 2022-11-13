import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({/**tap useStyles va goi den makeStyles cua marterialUI, ta tạo 1 function truyen 
theme vao function va tra ve mot obj */
  formControl: {
    margin: `${theme.spacing(3)}px 0`,//
    minWidth: 120,
  },
}));

export default function CountrySelector({ countries, handleOnChange, value }) {//nhan cac gia tri  countries, handleOnChange, value tu App.js
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>{/**css cho FormControl */}
      <InputLabel shrink htmlFor='country-selector'> {/**shirnk va htmlFor la cac attribute, shrink giup cho label co lai */}
        Quốc Gia
      </InputLabel>
      <NativeSelect
        value={value}//value duoc truyen tu App.js
        onChange={handleOnChange}//khi chon 1 gia tri trong option event onchange se xay ra
        inputProps={{
          name: 'country',
          id: 'country-selector',
        }}
      >
        {countries.map(({ Country, ISO2 }) => (/*in ra danh sach cac option, no se thuc hien bang cach look qua 
        tung item cua country va du lieu tra ve ben trong function la du lieu cua tung item ma sau khi ta da custom */
          <option key={ISO2} value={ISO2.toLowerCase()}> {/**khi map ta return ve thi trong tung item phai them 1 key
           * viec nay giup react biet duoc option nao co su thay doi thi no chi update lai item voi key tuong ung thoi
           * cac option voi key khac thi van giu nguyen 
           */}
            {Country}
          </option>
        ))}
      </NativeSelect>
      <FormHelperText>Lựa chọn quốc gia</FormHelperText>
    </FormControl>
  );
}

CountrySelector.defaultProps = {
  countries: [],
};
