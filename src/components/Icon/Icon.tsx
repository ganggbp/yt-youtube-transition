import {View, Text} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IconProps} from 'react-native-vector-icons';
import {ScaledSheet} from 'react-native-size-matters';

interface IIcon {
  label?: string;
}
const Icon = ({label, ...props}: IIcon | IconProps) => {
  return (
    <View style={styles.iconWrapper}>
      <Ionicons {...props} />
      {label && (
        <View style={styles.label}>
          <Text>{label}</Text>
        </View>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  iconWrapper: {flexDirection: 'row', alignItems: 'center'},
  label: {marginLeft: 5},
});

export default Icon;
