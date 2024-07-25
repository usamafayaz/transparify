import React from 'react';
import {TouchableOpacity, StyleSheet, Image, View} from 'react-native';

const ColorOption = ({color, gradient, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.colorOption}
      onPress={() => onPress(color || gradient)}>
      {color && <View style={[styles.colorBox, {backgroundColor: color}]} />}
      {gradient && <Image source={gradient} style={styles.colorBox} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  colorOption: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  colorBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});

export default ColorOption;
