import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';

import constants from '../config/constants';
const {height, width} = constants.screen;

const ColorPickerModal = ({visible, onCancel, onColorSelected}) => {
  const [selectedColor, setSelectedColor] = useState('#000000');

  const onColorChange = color => {
    setSelectedColor(color);
  };

  const handleColorSelection = () => {
    onColorSelected(selectedColor);
    onCancel();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle} allowFontScaling={false}>
                Color Picker
              </Text>
              <View style={styles.colorPickerContainer}>
                <ColorPicker
                  color={selectedColor}
                  onColorChange={onColorChange}
                  onColorChangeComplete={onColorChange}
                  thumbSize={30}
                  sliderSize={0}
                  noSnap={true}
                  row={false}
                  swatchesLast={true}
                  swatches={false}
                  discrete={true}
                  useNativeDriver={true}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleColorSelection}>
                  <Text style={styles.buttonText} allowFontScaling={false}>
                    Select
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onCancel}>
                  <Text style={styles.buttonText} allowFontScaling={false}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
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
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    color: constants.colors.backgroundColor,
    fontSize: constants.fontSizes.medium + 2,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  colorPickerContainer: {
    width: '100%',
    aspectRatio: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: constants.colors.buttonBackground,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.05,
    borderRadius: 20,
  },
  buttonText: {
    color: constants.colors.primary,
    fontSize: constants.fontSizes.small,
  },
});

export default ColorPickerModal;
