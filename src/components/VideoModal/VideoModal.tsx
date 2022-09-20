import {
  View,
  Text,
  StatusBar,
  Dimensions,
  Platform,
  StyleSheet,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PlayerControls} from '@components';
import Video from 'react-native-video';
import VideoContent from '../VideoContent';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useVideoPlayerContext} from '@context/VideoPlayerContext';

const {width, height} = Dimensions.get('window');

const translationThreshold = height / 3;
const minHeight = 64;
const midBound = height - 3 * minHeight;
const upperBound = midBound + minHeight;

const AnimatedVideo = Animated.createAnimatedComponent(Video);

const VideoModal = ({video, translateY}) => {
  const insets = useSafeAreaInsets();

  const offsetYMemory = useSharedValue(0);
  const [barStyle, setBarStyle] = useState('light-content');

  const updateBarStyle = useCallback(content => {
    setBarStyle(content);
  }, []);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      if (offsetYMemory.value === upperBound && translateY.value < upperBound) {
        offsetYMemory.value = 0;
        translateY.value = withTiming(0, undefined, () => {
          runOnJS(updateBarStyle)('light-content');
        });
      } else if (translateY.value < translationThreshold) {
        translateY.value = withTiming(0, undefined, () => {
          runOnJS(updateBarStyle)('light-content');
        });
        offsetYMemory.value = 0;
      } else {
        offsetYMemory.value = upperBound;
        translateY.value = withTiming(upperBound, undefined, () => {
          runOnJS(updateBarStyle)('dark-content');
        });
      }
    },
  });

  const rModalStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            translateY.value,
            [0, upperBound],
            [0, upperBound - 75],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const rVideoStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        translateY.value,
        [0, midBound - height / 2, upperBound],
        [width, width - 16, width * 0.3],
        Extrapolate.CLAMP,
      ),
      height: interpolate(
        translateY.value,
        [0, midBound],
        [width / 1.78, minHeight],
        Extrapolate.CLAMP,
      ),
    };
  });

  const rContentWrapperStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        translateY.value,
        [0, upperBound - 100],
        [width, width - 16],
        Extrapolate.CLAMP,
      ),
      height: interpolate(
        translateY.value,
        [0, upperBound - 100],
        [height, 0],
        Extrapolate.CLAMP,
      ),
    };
  });

  const rVideoContainerStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        translateY.value,
        [0, midBound],
        [width, width - 16],
        Extrapolate.CLAMP,
      ),
    };
  });

  const rContentStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateY.value,
        [0, upperBound - 100],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    };
  });

  const rPlayerControlStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateY.value,
        [midBound - height / 2, upperBound],
        [0, 1],
      ),
    };
  });

  const rTopBarStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateY.value, [0, upperBound], [1, 0]),
      transform: [
        {
          translateY: interpolate(
            translateY.value,
            [0, upperBound],
            [0, -insets.top],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <>
      <StatusBar animated={true} barStyle={barStyle} />
      <Animated.View
        style={[
          rTopBarStyle,
          {
            backgroundColor: '#000000',
            height:
              Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight,
          },
        ]}
      />
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.shadow, rModalStyle]}>
            <Animated.View style={[styles.videoWrapper, rVideoContainerStyle]}>
              <Animated.View
                style={[
                  {...StyleSheet.absoluteFillObject},
                  rPlayerControlStyle,
                ]}>
                <PlayerControls title={video.title} onPress={() => true} />
              </Animated.View>
              <AnimatedVideo
                source={video.video}
                style={rVideoStyle}
                resizeMode="cover"
                muted={true}
              />
            </Animated.View>

            <Animated.View
              style={[rContentWrapperStyle, styles.contentWrapper]}>
              <Animated.View style={rContentStyle}>
                <VideoContent video={video} />
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </>
  );
};

const styles = ScaledSheet.create({
  shadow: {
    alignItems: 'center',
    elevation: 1,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.18,
    shadowRadius: 2,
  },
  contentWrapper: {
    backgroundColor: 'white',
    width,
    height,
  },
  videoWrapper: {
    backgroundColor: 'white',
    width,
  },
});

export default VideoModal;
