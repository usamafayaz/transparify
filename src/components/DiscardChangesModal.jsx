// DiscardChangesModal.js
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import constants from '../config/constants';

const DiscardChangesModal = ({visible, onClose, onDiscard}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={[
            styles.modalBackground,
            {
              backgroundColor:
                constants.colorScheme == 'dark'
                  ? 'rgba(0, 0, 0, 0.8)'
                  : 'rgba(0, 0, 0, 0.1)',
            },
          ]}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle} allowFontScaling={false}>
              Discard Changes?
            </Text>
            <Text style={styles.modalMessage} allowFontScaling={false}>
              Are you sure you want to discard your changes?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelDiscardButton}
                onPress={onClose}>
                <Text style={styles.cancelButtonText} allowFontScaling={false}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelDiscardButton}
                onPress={onDiscard}>
                <Text style={styles.discardButtonText} allowFontScaling={false}>
                  Discard
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: constants.colors.backgroundColor,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: constants.fontSizes.medium,
    fontWeight: 'bold',
    color: constants.colors.textSecondary,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: constants.fontSizes.small,
    color: constants.colors.textSecondary,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '2%',
  },
  cancelDiscardButton: {
    width: '25%',
    height: 30,
  },
  cancelButtonText: {
    color: constants.colors.textSecondary,
    fontSize: constants.fontSizes.small,
  },
  discardButtonText: {
    color: constants.colors.primary,
    fontSize: constants.fontSizes.small,
    fontWeight: 'bold',
  },
});

export default DiscardChangesModal;
