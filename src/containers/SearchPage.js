import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import AutoCompleteBox from '../components/AutoCompleteBox';
import AutoCompleteResultList from '../components/AutoCompleteResultList';

const KEY = 'YOUR API KEY'

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      data: []
    };
  }
  
  getPredictionList = (query, key) => {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&type=geocode&key=${key}`;
    return fetch(url, {
      method: 'GET'
    })
      .then(res => res.json())       
      // .then(data => {
      //   console.log(data)
      // })
      // .catch(error => console.log(error))
  }
  
  getPlaceDetails = (queryString, key) => {
    
    // const queryString = qs.stringify({
    //   placeid: placeId,
    //   key
    // });
  
    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${queryString}&key=${key}`;
    
    return fetch(url, null, 'placeDetail', {
      method: 'GET'
    })
      .then(res => res.json())    
      // .then(data => {
      //   console.log(data)
      // })
      // .catch(error => console.log(error))
  }
  
  getPredictionWithDetail = (searchQuery, key) => {
    return this.getPredictionList(searchQuery, key)
      .then(result => {
        const predict = result.predictions;
        const predictionsPromise = predict.map(prediction =>
          this.getPlaceDetails(prediction.place_id, key)
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
  
  onChangeText(query) {
    this.setState({ query });
    this.getPredictionWithDetail(query, KEY)
      .then(result => {
        this.setState({ data: result })
      })
  }
  
  render() {
    console.log(this.state.data)
    console.log(this.state.query)
    return (
      <View style={{ flex:1 }}>
        <TextInput
          placeholder="cari alamat"
          style={{ width: '100%' }}
          value={this.state.query}
          onChangeText={query => this.onChangeText(query)}
        />
        <AutoCompleteResultList data={this.state.data} />
      </View>
    );
  }
}

export default SearchPage;