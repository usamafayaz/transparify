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
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Discard Changes?</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to discard your changes?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.discardButton}
                onPress={onDiscard}>
                <Text style={styles.discardButtonText}>Discard</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: constants.colors.backgroundColor,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: constants.colors.textSecondary,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: constants.colors.textSecondary,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: constants.colors.secondary,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: constants.colors.textPrimary,
  },
  discardButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: constants.colors.primary,
    borderRadius: 5,
  },
  discardButtonText: {
    color: constants.colors.textPrimary,
  },
});

export default DiscardChangesModal;
