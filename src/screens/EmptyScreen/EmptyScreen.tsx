import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const EmptyScreen = () => {
  return (
    <View style={styles.container}>
      <Text>EmptyScreen</Text>
    </View>
  );
};

export default EmptyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
