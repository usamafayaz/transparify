import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ToastAndroid,
} from 'react-native';
import constants from '../config/constants';

const {height, width} = constants.screen;

const SaveModal = ({visible, onClose, onNormal}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle} allowFontScaling={false}>
              Choose Quality
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={onNormal}>
              <Text style={styles.modalButtonText} allowFontScaling={false}>
                Normal
              </Text>
            </TouchableOpacity>
            <View style={styles.superResolutionContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.superResolutionButton]}
                onPress={() => {
                  ToastAndroid.show('Coming soon..', ToastAndroid.SHORT);
                  onClose();
                }}>
                <Text
                  style={[styles.modalButtonText, {color: '#202455'}]}
                  allowFontScaling={false}>
                  Super Resolution
                </Text>
              </TouchableOpacity>
              <Image
                source={require('../assets/icons/crown.png')}
                style={styles.crownIcon}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: constants.colors.backgroundColor,
    borderRadius: 10,
    padding: height * 0.025,
    alignItems: 'center',
  },
  modalTitle: {
    color: constants.colors.textPrimary,
    fontSize: constants.fontSizes.medium + 2,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
  },
  modalButton: {
    width: '100%',
    backgroundColor: constants.colors.buttonBackground,
    borderRadius: 20,
    paddingVertical: height * 0.012,
    marginVertical: height * 0.012,
    alignItems: 'center',
  },
  superResolutionContainer: {
    width: '100%',
    position: 'relative',
  },
  superResolutionButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: constants.colors.primary,
  },
  modalButtonText: {
    color: constants.colors.textPrimary,
    fontSize: constants.fontSizes.small,
  },
  crownIcon: {
    position: 'absolute',
    top: '-20%',
    right: '-1%',
    width: width * 0.09,
    height: width * 0.09,
  },
});

export default SaveModal;
