import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {Icon} from '@components';
import videos from 'src/data/videos';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('window');
const VideoContent = ({video}) => {
  const insets = useSafeAreaInsets();

  const topHeight =
    Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight || 0;

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: width / 1.78 + topHeight + 50,
      }}
      showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.views}>{`${video.views} views`}</Text>
        <View style={styles.icons}>
          <Icon name="thumbs-up" label="10" />
          <Icon name="thumbs-down" label="0" />
          <Icon name="share" label="Share" />
          <Icon name="arrow-down-circle" label="Download" />
          <Icon name="list" label="Save" />
        </View>
      </View>

      <View style={styles.upNext}>
        <Text style={styles.upNextTitle}>Up next</Text>
        {videos.map(v => (
          <View key={v.id} style={styles.thumbnail}>
            <Image source={v.thumbnail} style={styles.thumbnailImage} />
            <View style={styles.thumbnailContent}>
              <Text numberOfLines={2} style={styles.thumbnailTitle}>
                {v.title}
              </Text>
              <Text style={styles.thumbnailUsername}>{v.username}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
  },
  views: {
    color: 'gray',
    marginBottom: 16,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  upNext: {
    borderTopWidth: 1,
    borderColor: 'lightgray',
    paddingTop: 8,
    padding: 16,
  },
  upNextTitle: {
    fontWeight: 'bold',
    color: 'gray',
  },
  thumbnail: {
    flexDirection: 'row',
    marginTop: 16,
  },
  thumbnailImage: {
    height: 100,
    width: 100,
  },
  thumbnailContent: {
    paddingTop: 8,
    paddingLeft: 8,
    paddingBottom: 8,
    flex: 1,
    flexWrap: 'wrap',
  },
  thumbnailTitle: {
    fontSize: 16,
  },
  thumbnailUsername: {
    color: 'gray',
  },
});

export default VideoContent;
