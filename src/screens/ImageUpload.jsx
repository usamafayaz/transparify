import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  BackHandler,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import constants from '../config/constants';
import {openCamera, openImagePicker} from '../utils/imagePicker';
import {removeBackground} from '../utils/removeBackgroundAPI';
import LottieView from 'lottie-react-native';

const {height, width} = constants.screen;

const ImageUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [backPressCount, setBackPressCount] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const navigation = useNavigation();

  const waitingLines = [
    'Hang tight, magic is happening...',
    'Almost there, just a little more...',
    'Transforming your image, stay tuned...',
    'Good things take time, just a moment...',
    'Making it perfect, please wait...',
    'Creating transparency, hold on...',
    "Working on it, won't be long now...",
    'Patience is a virtue, almost done...',
    'Crafting your image, just a bit more...',
    'Preparing the final touch, please stand by...',
  ];

  const getRandomLine = () => {
    return waitingLines[Math.floor(Math.random() * waitingLines.length)];
  };

  useEffect(() => {
    let interval;
    if (isLoading) {
      setLoadingText(getRandomLine());
      interval = setInterval(() => {
        setLoadingText(getRandomLine());
      }, 5000); // Change the line every 5 seconds
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  const handleImagePicked = uri => {
    removeBackground(uri, setIsLoading, navigation);
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
      {constants.colorScheme === 'dark' && (
        <StatusBar
          backgroundColor={
            isLoading ? 'rgba(0, 0, 0, 0.8)' : constants.colors.backgroundColor
          }
          barStyle={
            constants.colorScheme === 'light' ? 'dark-content' : 'light-content'
          }
        />
      )}
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

        {isLoading && (
          <View
            style={[
              styles.loadingContainer,
              {
                backgroundColor:
                  constants.colorScheme === 'light'
                    ? 'rgba(255, 255, 255, 0.8)'
                    : 'rgba(0, 0, 0, 0.8)',
              },
            ]}>
            <LottieView
              source={require('../assets/animation/loading.json')}
              autoPlay
              loop
              style={styles.lottieAnimation}
            />
            <Text
              style={[
                styles.loadingText,
                {fontSize: constants.fontSizes.medium},
              ]}
              allowFontScaling={false}>
              {loadingText}
            </Text>
          </View>
        )}
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
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: constants.colors.textSecondary,
    marginTop: 10,
  },
  lottieAnimation: {
    width: 200,
    height: 200,
  },
});

export default ImageUpload;
