import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';

const ImageUpload = () => {
  const navigation = useNavigation();

  let options = {
    mediaType: 'photo',
    quality: 1,
    includeBase64: true,
  };

  const openImagePicker = () => {
    launchImageLibrary(options, response => {
      if (!response) {
        console.log('Invalid response from image picker');
        return;
      }
      if (response.didCancel) {
        ToastAndroid.show('User cancelled Image Picker', ToastAndroid.SHORT);
        return;
      }
      if (response.assets) {
        const uri = response.assets[0].uri;
        navigation.navigate('Home', {image: uri});
      }
    });
  };

  const openCamera = () => {
    launchCamera(options, response => {
      if (!response) {
        console.log('Invalid response from camera');
        return;
      }
      if (response.didCancel) {
        ToastAndroid.show('User cancelled Camera', ToastAndroid.SHORT);
        return;
      }
      if (response.assets) {
        const uri = response.assets[0].uri;
        navigation.navigate('Home', {image: uri});
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/transform.png')}
        style={styles.mainImageStyle}
        resizeMode="contain"
      />
      <Text style={styles.textStyle}>Choose an image</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={openCamera}>
        <Image
          source={require('../assets/icons/camera.png')}
          style={styles.iconStyle}
        />
        <Text style={styles.buttonText}>Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={openImagePicker}>
        <Image
          source={require('../assets/icons/gallery.png')}
          style={styles.iconStyle}
        />
        <Text style={styles.buttonText}>Gallery</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mainImageStyle: {
    width: '80%',
    height: '40%',
  },
  iconStyle: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  textStyle: {
    fontSize: 18,
    color: '#5B5B5B',
    marginTop: '20%',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '95%',
    backgroundColor: '#F4F4F4',
    borderRadius: 40,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: 'black',
    elevation: 1,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ImageUpload;
