import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useVideoPlayerContext} from '@context/VideoPlayerContext';
import {Icon} from '@components';

const {width} = Dimensions.get('window');
export const PLACEHOLDER_WIDTH = width / 3;

const PlayerControls = ({title, onPress}) => {
  const {setVideo} = useVideoPlayerContext();

  return (
    <View style={styles.container}>
      <View style={styles.placeholder} />

      <Text style={styles.title} numberOfLines={3}>
        {title}
      </Text>

      <Icon name="play" size={24} color="gray" style={styles.icon} />

      <TouchableWithoutFeedback onPress={() => setVideo(null)}>
        <Icon name="close" size={24} color="gray" style={styles.icon} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    paddingLeft: 8,
  },
  placeholder: {
    width: PLACEHOLDER_WIDTH,
  },
  icon: {
    padding: 8,
  },
});

export default PlayerControls;
