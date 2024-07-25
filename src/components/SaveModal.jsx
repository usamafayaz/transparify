import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

const {width} = Dimensions.get('window');

const SaveModal = ({visible, onClose}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Choose Quality</Text>
            <TouchableOpacity style={styles.modalButton} onPress={onClose}>
              <Text style={styles.modalButtonText}>Normal</Text>
            </TouchableOpacity>
            <View style={styles.superResolutionContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.superResolutionButton]}
                onPress={onClose}>
                <Text style={[styles.modalButtonText, {color: '#202455'}]}>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    color: '#5B5B5B',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    width: '100%',
    backgroundColor: '#202455',
    borderRadius: 20,
    paddingVertical: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  superResolutionContainer: {
    width: '100%',
    position: 'relative',
  },
  superResolutionButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#202455',
  },
  modalButtonText: {
    color: 'white',
    fontSize: width * 0.04,
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
