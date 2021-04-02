const request = require("request");

const forecast = (lat, lon, callback) => {
  
  const url =
    "http://api.weatherstack.com/current?access_key=d307717f578e95e2fec8c78cb929172b&query=" + lat + ',' + lon + '&units=m'
  request({ url, json: true }, (error, {body}) => {
    
    if (error) {
      callback(`request to ${error.hostname} failed`, undefined);
    } else if (body.error) {
      callback(
        `${body.error.code} '${body.error.type}' , ${body.error.info}`,
        undefined
      );
    } else {
      callback(undefined,`(timezone: UTC ${body.location.utc_offset} , ${body.location.timezone_id}) The temperature at ${body.current.observation_time}is ${body.current.temperature} and feels like ${body.current.feelslike}
      .`)
    }
  });
};

// "timezone_id": "Europe/Paris",
// "localtime": "2021-04-02 13:21",
// "localtime_epoch": 1617369660,
// "utc_offset": "2.0"



module.exports = forecast