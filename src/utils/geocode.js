const request = require('request')

const geocode = (address, callback) => {
  const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=' + process.env.MAPBOX_KEY + '&limit=1'
  
  request({url, json: true},(error, {body}) => {
   
  if (error) {
    callback(`request to ${error.hostname} failed!`,undefined);
  } else if (body.features.length === 0) {
    callback(`${body.query} not found`,undefined)
  } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        lon:  body.features[0].center[0],
      location: body.features[0].place_name
        })
      }
    })
  }



module.exports = geocode