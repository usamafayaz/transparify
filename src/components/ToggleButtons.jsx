import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';

const {width} = Dimensions.get('window');

const ToggleButtons = ({activeTab, setActiveTab}) => {
  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          activeTab === 'Original' && styles.activeToggleButton,
        ]}
        onPress={() => setActiveTab('Original')}>
        <Text
          style={[
            styles.toggleButtonText,
            activeTab === 'Original' && {color: '#000000'},
          ]}>
          Original
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          {marginLeft: width * 0.1},
          activeTab === 'Removed Background' && styles.activeToggleButton,
        ]}
        onPress={() => setActiveTab('Removed Background')}>
        <Text
          style={[
            styles.toggleButtonText,
            activeTab === 'Removed Background' && {color: '#000000'},
          ]}>
          Removed Background
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    width: width * 0.9,
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    borderRadius: width * 0.4,
    paddingHorizontal: '1%',
    paddingVertical: '2%',
  },
  toggleButton: {
    paddingVertical: 7,
    paddingHorizontal: '6%',
    borderRadius: 20,
    marginHorizontal: '1.2%',
  },
  activeToggleButton: {
    backgroundColor: '#FFFFFF',
    shadowColor: 'black',
    elevation: 5,
  },
  toggleButtonText: {
    fontSize: width * 0.04, // 4% of screen width
    color: '#5B5B5B',
  },
});

export default ToggleButtons;
