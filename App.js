import React from 'react';
import MusicPLayer from './src/components/MusicPlayer';
import {
  View, 
  StatusBar,
  StyleSheet
} from  'react-native';


const App = () => {
  return(
    <>
    <View style={styles.container}>
      <StatusBar barStyle='light-content'/>
      <MusicPLayer/>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;