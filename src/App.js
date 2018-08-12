import React, { Component } from  'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          mapRegion: null,
          latitude: null,
          longitude: null
      };
    }

    onRegionChange(region, latitude, longitude) {
        this.setState({
          mapRegion: region,
          // If there are no new values set the current ones
          latitude: latitude || this.state.latitude,
          longitude: longitude || this.state.longitude
       });
    }  

    render() {       
        return (
            <View style={{ flex: 1 }}>                
               <MapView
                    style={{ flex: 1, width: window.width }} //window pake Dimensions
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421 
                    }} >
                    <MapView.Marker
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    title="Lokasi"
                    description="Hello" />
                </MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {        
        width: 300,
        height: 300
    }
})

export default App;