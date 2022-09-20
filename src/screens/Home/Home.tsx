import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useVideoPlayerContext} from '@context/VideoPlayerContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import videos from 'src/data/videos';
import {VideoThumbnail} from '@components';

const Home = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={{marginTop: insets.top}}>
      {videos.map(video => (
        <VideoThumbnail key={video.id} video={video} />
      ))}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
