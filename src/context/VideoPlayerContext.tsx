import {VideoModal} from '@components';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ScaledSheet} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

type VideoPlayerProviderProps = {
  children: React.ReactNode;
};

const VideoPlayerContext = createContext({});

const VideoPlayerProvider = ({children}: VideoPlayerProviderProps) => {
  const [video, setVideo] = useState(null);

  const translateY = useSharedValue(0);

  const toggle = useDerivedValue(() => {
    return video ? 1 : 0;
  });

  useEffect(() => {
    if (!video) {
      translateY.value = 0;
    }
  }, [video]);

  const rModalStyle = useAnimatedStyle(() => {
    const tY = withTiming(interpolate(toggle.value, [0, 1], [height, 0]), {
      duration: 500,
    });

    return {
      transform: [{translateY: tY}],
    };
  });

  const videoPlayerContextValue = {
    video,
    setVideo,
    translateY,
  };

  return (
    <VideoPlayerContext.Provider value={videoPlayerContextValue}>
      <View style={styles.container}>
        <View style={StyleSheet.absoluteFillObject}>{children}</View>
        <Animated.View style={rModalStyle}>
          {video && <VideoModal video={video} translateY={translateY} />}
        </Animated.View>
      </View>
    </VideoPlayerContext.Provider>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default VideoPlayerProvider;

export const useVideoPlayerContext = () => useContext(VideoPlayerContext);
