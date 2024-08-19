// src/screens/Home.js

import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  BackHandler,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import ToggleButtons from '../components/ToggleButtons';
import Footer from '../components/Footer';
import constants from '../config/constants';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import DiscardChangesModal from '../components/DiscardChangesModal';
import {mergeBackgroundAndImage} from '../utils/imageSaver';
import {calculateImageDimensions} from '../utils/imageDimension';
import BackgroundRenderer from '../components/BackgroundRenderer';

const {width, height} = constants.screen;

const Home = ({route}) => {
  const navigation = useNavigation();
  const viewShotRef = useRef(null);
  const {originalImage, processedImage} = route.params;
  const [activeTab, setActiveTab] = useState('Removed');
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

  useEffect(() => {
    if (!hasTransitioned) {
      setTimeout(() => {
        Animated.timing(transitionValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }).start(() => {
          setHasTransitioned(true);
          setActiveTab('Removed');
        });
      }, 250);
    }
  }, [hasTransitioned, transitionValue]);

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
    // Update the button state visually (e.g., by changing opacity, color, etc.)
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
          navigation.navigate('ShareToSocial', {
            mergedImage: processedImage,
            noBackground: true,
          });
          setIsLoading(false);
          return;
        }
        const result = await mergeBackgroundAndImage(
          processedImage,
          background,
          type,
        );
        if (result) {
          navigation.navigate('ShareToSocial', {
            mergedImage: result,
            noBackground: false,
          });
        }
      } catch (error) {
        console.error('Error saving image to gallery:', error);
        ToastAndroid.show(
          'Failed to save image to gallery.',
          ToastAndroid.SHORT,
        );
      } finally {
        setIsLoading(false);
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
                style={[styles.image, imageDimensions, StyleSheet.absoluteFill]}
                resizeMode="contain"
              />
            </Animated.View>
            <Animated.View
              style={{flex: Animated.subtract(1, transitionValue)}}
            />
          </Animated.View>
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
      <View style={styles.topBar}>
        <View style={styles.leftHalfTopBar}>
          <TouchableOpacity onPress={() => setIsDiscardModalVisible(true)}>
            <Image
              resizeMode="contain"
              source={require('../assets/icons/left_arrow.png')}
              style={styles.iconStyle}
              tintColor={constants.colors.textSecondary}
            />
          </TouchableOpacity>
          <Text style={styles.topBarText} allowFontScaling={false}>
            Transparify
          </Text>
        </View>
        {activeTab !== 'Original' && (
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => {
              setIsLoading(true);
              handleShareImage();
            }}
            disabled={isLoading}>
            <Text style={styles.shareButtonText} allowFontScaling={false}>
              Done
            </Text>
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
              {borderWidth: 1, borderColor: 'grey'},
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
        />
      </View>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={constants.colors.primary} size={40} />
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
    height: height * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  leftHalfTopBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginLeft: width * 0.05,
    color: constants.colors.textSecondary,
  },
  shareButton: {
    backgroundColor: constants.colors.primary,
    borderRadius: 20,
    height: height * 0.048,
    width: width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonText: {
    color: constants.colors.white,
    fontSize: constants.fontSizes.small,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  iconStyle: {
    height: height * 0.08,
    width: width * 0.08,
    resizeMode: 'contain',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:
      constants.colorScheme === 'light'
        ? 'rgba(255, 255, 255, 0.8)'
        : 'rgba(0, 0, 0, 0.8)',
    zIndex: 10, // Ensure it appears above all other content
  },
});

export default Home;
