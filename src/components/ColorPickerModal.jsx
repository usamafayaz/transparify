import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {ColorPicker} from 'react-native-color-picker';
import Slider from '@react-native-community/slider';
import constants from '../config/constants';
const {height, width} = constants.screen;
const ColorPickerModal = ({visible, onCancel, onColorSelected}) => {
  const onSelectColor = hex => {
    onColorSelected(hex);
    onCancel();
  };
  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle} allowFontScaling={false}>
              Color Picker
            </Text>
            <ColorPicker
              defaultColor={'#000000'}
              onColorSelected={onSelectColor}
              style={styles.colorPicker}
              sliderComponent={Slider}
            />
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText} allowFontScaling={false}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: constants.colors.primary,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    color: constants.colors.white,
    fontSize: constants.fontSizes.medium + 2,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  colorPicker: {
    width: width * 0.5,
    height: height * 0.3,
  },
  cancelButton: {
    marginTop: 20,
    backgroundColor: constants.colors.secondary,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.05,
    borderRadius: 20,
  },
  cancelButtonText: {
    color: constants.colors.primary,
    fontSize: constants.fontSizes.small,
  },
});

export default ColorPickerModal;
