import React, { useEffect, useMemo } from 'react';
import { sortBy } from 'lodash';
import CountrySelector from './components/CountrySelector';
import { getCountries, getReportByCountry } from './components/apis';
import Summary from './components/Summary';
import Highlight from './components/Highlight';
import { Container, Typography } from '@material-ui/core';
import '@fontsource/roboto';
import moment from 'moment';
import 'moment/locale/vi';

moment.locale('vi');//set formatLL phía duoi theo tieng viet

const App = () => {
  const [countries, setCountries] = React.useState([]);//khai bao state de luu tru du lieu ve country duoc tra ve tu api
  const [selectedCountryId, setSelectedCountryId] = React.useState('');//state de luu tru country hien tai ma nguoi dung lua chon
  const [report, setReport] = React.useState([]);//state de luu tru data tra ve tu api getReportByCountry

  useEffect(() => {//goi api trong components/apis/index.js
    getCountries().then((res) => {/*boi vi axios trong components/apis/index.js la 1 promise 
    nen dung then de lay dc du lieu tra ve tu api, res chinh la du lieu tra ve tu api*/
      const { data } = res;
      const countries = sortBy(data, 'Country');/**sortBy tu loDash de sap xep field country theo thu tu alphabe */
      setCountries(countries);
      setSelectedCountryId('vn');//code nay de khi web duoc load len thi mac dinh se chon VN trong o slectedcountry
    });
  }, []);//chung ta chi muon viec goi api duoc thuc hien mot lan khi component render lan dau tien de lay ra danh sach cac quoc gia nen ta de mot empty array o do

  const handleOnChange = React.useCallback((e) => {//khi nguoi dung lua chon 1 country nao do thi function nay duoc thuc thi
    setSelectedCountryId(e.target.value);//setSelectedCountryId voi gia tri ma nguoi dung dang lua chon
  }, []);

  useEffect(() => {
    if (selectedCountryId) {//kiem tra xem co selectedCountryId neu ma nguoi dung co lua chon thi ta se tien hanh thuc hien cac doan code o phia trong
      const selectedCountry = countries.find(//dung method find de tim ra country nao co ISO2 selectedCountryId
        (country) => country.ISO2 === selectedCountryId.toUpperCase()
      );
      //call api
      getReportByCountry(selectedCountry.Slug).then((res) => {//getReportByCountry la mot method trong apis/index.js no dung axios nen o day can then de lay ra gia tri tra ve tu api
        console.log('getReportByCountry', { res });//in ra gia tri tra ve tu api     
        res.data.pop();// remove item cuoi cung cua arr res.data ma tra ve tu api
        setReport(res.data);//cap nhat data vao setReport
      });
    }
  }, [selectedCountryId, countries]);//neu co su thay doi cua 1 trong so hai bien selectedCountryId, countries thi ussEffect se duoc thuc thi lai

  const summary = useMemo(() => {
    if (report && report.length) {
      const latestData = report[report.length - 1];
      return [
        {
          title: 'Số ca nhiễm',
          count: latestData.Confirmed,
          type: 'confirmed',
        },
        {
          title: 'Khỏi',
          count: latestData.Recovered,
          type: 'recovered',
        },
        {
          title: 'Tử vong',
          count: latestData.Deaths,
          type: 'death',
        },
      ];
    }
    return [];
  }, [report]);

  return (
    <Container style={{ marginTop: 20 }}>{/**boc app vao component Container cua marterial ui, giup gioi han max-width cua app
     *  vi app sat len tren nen ta them marginTop cho no     */}
      <Typography variant='h2' component='h2'>{/*css cho  Số liệu COVID-19 */}
        Số liệu COVID-19
      </Typography>
      <Typography>{moment().format('LLL')}</Typography>{/*in ra thoi gian hien tai va format LLL */}
      <CountrySelector
        handleOnChange={handleOnChange}//truyen state handleOnChange vao countryselector thong qua props co ten handleOnChange
        countries={countries}//truyen state counstries vao countryselector thong qua props co ten la countries
        value={selectedCountryId}//truyen prop la quoc gia duoc chon vao CountrySelector
      />
      <Highlight summary={summary} /> {/**truyen prop summaray vao trong component Highlight de render rac cac du lieu hien thi len ui*/}
      <Summary countryId={selectedCountryId} report={report} />{/**truyen prop selectedCountryId va report vao Summary component */}
    </Container>
  );
};

export default App;
