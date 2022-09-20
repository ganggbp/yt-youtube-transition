import {View, Text, TouchableWithoutFeedback, Image} from 'react-native';
import React from 'react';
import {useVideoPlayerContext} from '@context/VideoPlayerContext';
import {ScaledSheet} from 'react-native-size-matters';

const VideoThumbnail = ({video}) => {
  const {setVideo} = useVideoPlayerContext();

  return (
    <TouchableWithoutFeedback onPress={() => setVideo(video)}>
      <View>
        <Image source={video.thumbnail} style={styles.thumbnail} />
        <View style={styles.description}>
          <Image source={video.avatar} style={styles.avatar} />
          <View>
            <Text style={styles.title}>{video.title}</Text>
            <Text style={styles.subtitle}>
              {`${video.username} • ${
                video.views
              } views • ${video.published.fromNow()}`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VideoThumbnail;

const styles = ScaledSheet.create({
  thumbnail: {
    width: '100%',
    height: 200,
  },
  description: {
    flexDirection: 'row',
    margin: 16,
    marginBottom: 32,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    color: 'gray',
  },
});
