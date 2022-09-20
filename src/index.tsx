import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navigation from './navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import VideoPlayerProvider from '@context/VideoPlayerContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar animated={true} barStyle={'dark-content'} />
      <VideoPlayerProvider>
        <Navigation />
      </VideoPlayerProvider>
    </SafeAreaProvider>
  );
};

export default App;
