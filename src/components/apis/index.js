import axios from 'axios';
import moment from 'moment';

export const getCountries = () =>//api chua data ve cac quoc gia
  axios.get('https://api.covid19api.com/countries');

export const getReportByCountry = (slug) =>//khi nguoi dung thay doi lua chon quoc gia ta se goi den api nay de lay ra duoc du lieu tuong ung voi quoc gia do 
  axios.get(
    `https://api.covid19api.com/dayone/country/${slug}?from=2021-01-01T00:00:00&to=${moment()
      .utc(0)
      .format()}`
  );

export const getMapDataByCountryId = (countryId) =>
  import(
    `@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`
  );
