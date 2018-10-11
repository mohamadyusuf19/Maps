import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   flex: 1,    
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

export default class App extends React.Component {
 render() {
   const { region } = this.props;
   console.log(region);

   return (
     <View style ={styles.container}>
       <MapView
         style={styles.map}
         region={{
           latitude: 37.78825,
           longitude: 22.4324,
           latitudeDelta: 0.015,
           longitudeDelta: 0.0121,
         }}
       >
       </MapView>
     </View>
   );
 }
}