import {View, Text, Pressable, Dimensions} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {ScaledSheet} from 'react-native-size-matters';
import {Icon} from '@components';
import {useVideoPlayerContext} from '@context/VideoPlayerContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');
const minHeight = 64;
const midBound = height - 3 * minHeight;
const upperBound = midBound + minHeight;

const tabItems = {
  Home: {name: 'Home', active: 'home', inActive: 'home-outline'},
  Message: {name: 'Message', active: 'mail', inActive: 'mail-outline'},
  Search: {name: 'Search', active: 'search', inActive: 'search-outline'},
  Library: {name: 'Library', active: 'library', inActive: 'library-outline'},
  Account: {
    name: 'Account',
    active: 'person-circle',
    inActive: 'person-circle-outline',
  },
};

const TabBarButton = React.memo(props => {
  const {onPress, accessibilityState, route} = props;
  const focused = accessibilityState.selected;

  const scale = useDerivedValue(() => {
    return withTiming(focused ? 1.3 : 1);
  }, [focused]);

  const rIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  return (
    <Pressable style={styles.tabContainer} onPress={onPress}>
      <Animated.View style={[styles.iconContainer, rIconStyle]}>
        <Icon
          name={
            focused
              ? tabItems[route.name].active
              : tabItems[route.name].inActive
          }
          size={22}
          color={focused ? '#23262F' : '#94a3b8'}
        />
      </Animated.View>
    </Pressable>
  );
});

const AppTabBar = ({state, descriptors, navigation}) => {
  const {video, translateY} = useVideoPlayerContext();
  const insets = useSafeAreaInsets();

  const bottomPosition = useDerivedValue(() => {
    if (video) {
      return interpolate(
        translateY.value,
        [height / 2, upperBound],
        [-70, 0],
        Extrapolate.CLAMP,
      );
    } else {
      return 0;
    }
  }, [video]);

  const rTabStyle = useAnimatedStyle(() => {
    return {
      bottom: bottomPosition.value,
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: 0,
          right: 0,
          flexDirection: 'row',
          paddingBottom: 20,
          height: 70,
          backgroundColor: 'white',
        },
        rTabStyle,
      ]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={`barbutton+${index}`}
            testID={options.tabBarTestID}
            route={route}
            onPress={onPress}
            accessibilityState={isFocused ? {selected: true} : {}}
          />
        );
      })}
    </Animated.View>
  );
};

const styles = ScaledSheet.create({
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
  },
});

export default React.memo(AppTabBar);
