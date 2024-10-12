import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  BackHandler,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import RNFS from 'react-native-fs';
import ViewShot from 'react-native-view-shot';
import ToggleButtons from '../components/ToggleButtons';
import Footer from '../components/Footer';
import constants from '../config/constants';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import DiscardChangesModal from '../components/DiscardChangesModal';
import {mergeBackgroundAndImage} from '../utils/imageMerger';
import {calculateImageDimensions} from '../utils/imageDimension';
import BackgroundRenderer from '../components/BackgroundRenderer';
import {removeBackground} from '../utils/removeBackgroundAPI';
import LottieView from 'lottie-react-native';
const {width, height} = constants.screen;

const Home = ({route}) => {
  const navigation = useNavigation();
  const viewShotRef = useRef(null);
  const {originalImage} = route.params;
  const [activeTab, setActiveTab] = useState('Original');
  const [footerState, setFooterState] = useState('initial');
  const [colorState, setColorState] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState(null);
  const [selectedGradient, setSelectedGradient] = useState(null);
  const [selectedBackgroundImage, setSelectedBackgroundImage] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({width: 0, height: 0});
  const [hasTransitioned, setHasTransitioned] = useState(false);
  const transitionValue = useRef(new Animated.Value(0)).current;
  const [isDiscardModalVisible, setIsDiscardModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNextLoading, setIsNextLoading] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);

  useEffect(() => {
    const processImage = async () => {
      setIsLoading(true);
      try {
        const result = await removeBackground(originalImage, navigation);
        setProcessedImage(result);
        setHasTransitioned(false);
      } catch (error) {
        console.error('Error removing background:', error);
        ToastAndroid.show('Failed to remove background', ToastAndroid.SHORT);
      } finally {
        setIsLoading(false);
      }
    };
    processImage();
  }, [originalImage]);

  useEffect(() => {
    if (!hasTransitioned && processedImage) {
      setActiveTab('Removed');
      setTimeout(() => {
        Animated.timing(transitionValue, {
          toValue: 1,
          duration: 1500, // duration for removing the bg animation
          useNativeDriver: false,
        }).start(() => {
          setHasTransitioned(true);
        });
      }, 250);
    }
  }, [hasTransitioned, transitionValue, processedImage]);

  useEffect(() => {
    calculateImageDimensions(originalImage)
      .then(setImageDimensions)
      .catch(error =>
        console.error('Error calculating image dimensions:', error),
      );
  }, [originalImage]);

  const clearBackground = useCallback(() => {
    setBackgroundColor(null);
    setSelectedGradient(null);
    setSelectedBackgroundImage(null);
  }, []);

  const handleShareImage = async () => {
    setTimeout(async () => {
      let background = '';
      let type = '';

      if (selectedGradient) {
        type = 'gradient';
        background = selectedGradient;
      } else if (backgroundColor) {
        type = 'color';
        background = backgroundColor;
      } else if (selectedBackgroundImage) {
        type = 'image';
        background = selectedBackgroundImage;
      } else {
        type = 'nobackground';
        background = '';
      }

      try {
        if (type === 'nobackground' && background === '') {
          const cacheDir = RNFS.CachesDirectoryPath;
          const oldFiles = await RNFS.readDir(cacheDir);
          let filePaths = oldFiles.map(file => file.path);

          filePaths = filePaths.filter(
            path =>
              path.includes('rn_image_picker_lib_temp_') &&
              path !== originalImage.replace('file://', ''),
          );
          await Promise.all(filePaths.map(path => RNFS.unlink(path)));

          navigation.navigate('ShareToSocial', {
            mergedImage: processedImage,
            noBackground: true,
            imageDimensions,
          });
          setIsLoading(false);
          return;
        }

        const result = await mergeBackgroundAndImage(
          originalImage.replace('file://', ''),
          processedImage,
          background,
          type,
        );
        if (result) {
          navigation.navigate('ShareToSocial', {
            mergedImage: result,
            noBackground: false,
            imageDimensions,
          });
        }
      } catch (error) {
        console.error('Error saving image to gallery:', error);
        ToastAndroid.show(
          'Failed to save image to gallery.',
          ToastAndroid.SHORT,
        );
      } finally {
        setIsNextLoading(false);
      }
    }, 10); // 100ms delay to allow UI update
  };

  const selectGalleryImage = useCallback(uri => {
    setSelectedBackgroundImage(uri);
    setBackgroundColor(null);
    setSelectedGradient(null);
  }, []);

  const handleColorSelect = useCallback(
    color => {
      if (Array.isArray(color)) {
        if (color !== selectedGradient) {
          setSelectedGradient(color);
          setBackgroundColor(null);
          setSelectedBackgroundImage(null);
        }
      } else {
        if (color !== backgroundColor) {
          setBackgroundColor(color);
          setSelectedGradient(null);
          setSelectedBackgroundImage(null);
        }
      }
    },
    [backgroundColor, selectedGradient],
  );

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        setIsDiscardModalVisible(true);
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }, []),
  );

  const handleDiscard = useCallback(() => {
    clearBackground();
    setIsDiscardModalVisible(false);
    navigation.goBack();
  }, [clearBackground, navigation]);

  const renderContent = useCallback(() => {
    if (
      !backgroundColor &&
      !selectedGradient &&
      !selectedBackgroundImage &&
      activeTab !== 'Original'
    ) {
      return (
        <View style={[styles.image, imageDimensions]}>
          <Image
            source={{uri: originalImage}}
            style={[styles.image, imageDimensions]}
            resizeMode="contain"
          />
          {processedImage && (
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                {
                  flexDirection: 'row',
                  overflow: 'hidden',
                },
              ]}>
              <Animated.View
                style={{
                  flex: transitionValue,
                  overflow: 'hidden',
                }}>
                <Image
                  source={require('../assets/images/square_background.png')}
                  style={[styles.checkeredBackground, imageDimensions]}
                />
                <Image
                  source={{uri: processedImage}}
                  style={[
                    styles.image,
                    imageDimensions,
                    StyleSheet.absoluteFill,
                  ]}
                  resizeMode="contain"
                />
              </Animated.View>
              <Animated.View
                style={{flex: Animated.subtract(1, transitionValue)}}
              />
            </Animated.View>
          )}
        </View>
      );
    } else if (activeTab === 'Original') {
      return (
        <Image
          source={{uri: originalImage}}
          style={[styles.image, imageDimensions]}
          resizeMode="contain"
        />
      );
    } else {
      return (
        <BackgroundRenderer
          selectedGradient={selectedGradient}
          selectedBackgroundImage={selectedBackgroundImage}
          backgroundColor={backgroundColor}
          imageDimensions={imageDimensions}
          processedImage={processedImage}
        />
      );
    }
  }, [
    backgroundColor,
    selectedGradient,
    selectedBackgroundImage,
    activeTab,
    originalImage,
    processedImage,
    imageDimensions,
    transitionValue,
  ]);
  return (
    <View style={styles.container}>
      {(isDiscardModalVisible || isNextLoading || isLoading) && (
        <StatusBar
          barStyle={
            constants.colorScheme == 'dark' ? 'light-content' : 'dark-content'
          }
          backgroundColor={
            constants.colorScheme == 'dark'
              ? 'rgba(0, 0, 0, 0.5)'
              : 'rgba(0, 0, 0, 0.1)'
          }
        />
      )}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setIsDiscardModalVisible(true)}>
          <Image
            resizeMode="contain"
            source={require('../assets/icons/left_arrow.png')}
            style={styles.iconStyle}
            tintColor={constants.colors.textSecondary}
          />
        </TouchableOpacity>
        {activeTab !== 'Original' && (
          <TouchableOpacity
            style={styles.rightArrow}
            onPress={() => {
              setIsNextLoading(true);
              handleShareImage();
            }}
            disabled={isNextLoading}>
            <Image
              resizeMode="contain"
              source={require('../assets/icons/right_arrow.png')}
              style={[styles.iconStyle, {height: 28, width: 28}]}
              tintColor={constants.colors.white}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.contentContainer}>
        <ToggleButtons activeTab={activeTab} setActiveTab={setActiveTab} />

        <View style={styles.imageContainer}>
          <ViewShot
            ref={viewShotRef}
            options={{...imageDimensions, quality: 1, format: 'png'}}
            style={[
              styles.image,
              imageDimensions,
              {borderWidth: 1, borderColor: '#C0C0C0'},
            ]}>
            {renderContent()}
          </ViewShot>
        </View>
        <Footer
          activeTab={activeTab}
          footerState={footerState}
          colorState={colorState}
          updateFooter={setFooterState}
          setColorState={setColorState}
          handleColorSelect={handleColorSelect}
          selectGalleryImage={selectGalleryImage}
          clearBackground={clearBackground}
          showClearButton={
            backgroundColor !== null ||
            selectedGradient !== null ||
            selectedBackgroundImage !== null
          }
        />
      </View>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <View style={styles.lottieContainer}>
            <LottieView
              source={require('../assets/animation/loading.json')}
              autoPlay
              loop
              style={styles.lottieAnimation}
            />
          </View>
        </View>
      )}
      {isNextLoading && (
        <View style={styles.loadingContainer}>
          <View style={styles.lottieContainer}>
            <LottieView
              source={require('../assets/animation/loading.json')}
              autoPlay
              loop
              style={styles.lottieAnimation}
            />
          </View>
        </View>
      )}
      <DiscardChangesModal
        visible={isDiscardModalVisible}
        onClose={() => setIsDiscardModalVisible(false)}
        onDiscard={handleDiscard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.colors.backgroundColor,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.06,
    justifyContent: 'space-between',
  },
  rightArrow: {
    height: width * 0.09,
    width: width * 0.09,
    backgroundColor: constants.colors.primary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 5,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    overflow: 'hidden',
  },
  checkeredBackground: {
    ...StyleSheet.absoluteFill,
  },
  iconStyle: {
    height: 30,
    width: 30,
    marginVertical: height * 0.02,
    resizeMode: 'contain',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:
      constants.colorScheme === 'light'
        ? 'rgba(0, 0, 0, 0.1)'
        : 'rgba(0, 0, 0, 0.5)',
  },
  lottieAnimation: {
    width: 210,
    height: 210,
  },
  lottieContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
});

export default Home;
