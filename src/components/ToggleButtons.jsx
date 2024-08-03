import React, {useState, useEffect, useRef} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Animated} from 'react-native';
import constants from '../config/constants';

const {height, width} = constants.screen;

const ToggleButtons = ({activeTab, setActiveTab}) => {
  const [tabPosition, setTabPosition] = useState(1);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: tabPosition,
      duration: 230,
      useNativeDriver: true,
    }).start();
  }, [tabPosition]);

  const handlePress = tab => {
    setActiveTab(tab);
    setTabPosition(tab === 'Original' ? 0 : 1);
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.44],
  });

  return (
    <View style={styles.toggleContainer}>
      <Animated.View
        style={[
          styles.activeToggleButton,
          {
            transform: [{translateX}],
            marginLeft: tabPosition == 0 ? width * 0.02 : null,
          },
        ]}
      />
      <TouchableOpacity
        style={[styles.toggleButton]}
        onPress={() => handlePress('Original')}>
        <Text
          style={[
            styles.toggleButtonText,
            activeTab === 'Original' && {color: '#000000'},
          ]}
          allowFontScaling={false}>
          Original
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggleButton]}
        onPress={() => handlePress('Removed')}>
        <Text
          style={[
            styles.toggleButtonText,
            activeTab === 'Removed' && {color: '#000000'},
          ]}
          allowFontScaling={false}>
          Removed
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    width: width * 0.9,
    height: height * 0.06,
    backgroundColor: constants.colors.secondary,
    flexDirection: 'row',
    borderRadius: width * 0.4,
    paddingHorizontal: '1%',
    paddingVertical: '2%',
    position: 'relative',
  },
  toggleButton: {
    flex: 1,
    paddingHorizontal: '6%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeToggleButton: {
    alignSelf: 'center',
    position: 'absolute',
    width: '50%',
    height: '100%',
    backgroundColor: constants.colors.white,
    borderRadius: width * 0.4,
    shadowColor: constants.colors.black,
    elevation: 5,
  },
  toggleButtonText: {
    fontSize: constants.fontSizes.small,
    color: '#5B5B5B',
  },
});

export default ToggleButtons;
