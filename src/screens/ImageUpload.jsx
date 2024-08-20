import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import constants from '../config/constants';
import {openCamera, openImagePicker} from '../utils/imagePicker';

const {height, width} = constants.screen;

const ImageUpload = () => {
  const [backPressCount, setBackPressCount] = useState(0);
  const navigation = useNavigation();

  const handleImagePicked = uri => {
    navigation.navigate('Home', {originalImage: uri});
  };

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        if (backPressCount === 0) {
          setBackPressCount(1);
          ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
          setTimeout(() => {
            setBackPressCount(0);
          }, 2000); // Reset the counter after 2 seconds

          return true; // Prevent default behavior of back button
        } else {
          BackHandler.exitApp(); // Exit the app if back button is pressed again
        }
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove(); // Clean up the back handler when the screen is unfocused
    }, [backPressCount]),
  );

  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('../assets/images/transform.png')}
          style={styles.mainImageStyle}
          resizeMode="contain"
        />
        <Text style={styles.textStyle} allowFontScaling={false}>
          Choose an image
        </Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => openCamera(handleImagePicked)}>
          <Image
            source={require('../assets/icons/camera.png')}
            style={styles.iconStyle}
          />
          <Text style={styles.buttonText} allowFontScaling={false}>
            Camera
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => openImagePicker(handleImagePicked)}>
          <Image
            source={require('../assets/icons/gallery.png')}
            style={styles.iconStyle}
          />
          <Text style={styles.buttonText} allowFontScaling={false}>
            Gallery
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.colors.backgroundColor,
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
    fontSize: constants.fontSizes.medium,
    color: constants.colors.textSecondary,
    marginTop: height * 0.09,
    marginBottom: height * 0.02,
  },
  buttonContainer: {
    width: width * 0.85,
    backgroundColor: constants.colors.buttonBackground,
    borderRadius: 40,
    paddingVertical: height * 0.013,
    marginVertical: height * 0.012,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: constants.colors.black,
    elevation: 1,
  },
  buttonText: {
    color: constants.colors.textPrimary,
    fontSize: constants.fontSizes.medium,
    fontWeight: '600',
    marginLeft: width * 0.02,
  },
});

export default ImageUpload;
