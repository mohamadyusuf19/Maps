const qs = require('qs');

const getPredictionList = (searchQuery, key) => {
  const queryString = qs.stringify({
    input: searchQuery,
    type: 'geocode',
    key
  });
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${queryString}&type=geocode&key=${key}`;
  return fetch(url, null, 'prediction', {
    method: 'GET'
  })
    .then(res => res.json()) 
    .then(data => {
      console.log(data)
    })
    .catch(error => console.log(error))
}

const getPlaceDetails = (placeId, key) => {
  
  const queryString = qs.stringify({
    placeid: placeId,
    key
  });

  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${queryString}&key=${key}`;
  
  return fetch(url, null, 'placeDetail', {
    method: 'GET'
  })
    .then(res => res.json())    
    .then(data => {
      console.log(data)
    })
    .catch(error => console.log(error))
}

export const getPredictionWithDetail = (searchQuery, key) => {
  return getPredictionList(searchQuery, key)
    .then(result => {
      const predict = result.predictions;
      const predictionsPromise = predict.map(prediction =>
        getPlaceDetails(prediction.place_id, key)
      );
      return Promise.all(predictionsPromise);
    })
    .then(data => {
      const predictionDetails = data.map(predictionItem => ({
        name: predictionItem.result.name,
        formatted_address: predictionItem.result.formatted_address,
        geometry: predictionItem.result.geometry,
        placeId: predictionItem.result.place_id
      }));
      return predictionDetails;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
}
