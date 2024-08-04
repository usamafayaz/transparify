import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import LinearGradient from 'react-native-linear-gradient';
import ToggleButtons from '../components/ToggleButtons';
import SaveModal from '../components/SaveModal';
import Footer from '../components/Footer';
import constants from '../config/constants';
const {width, height} = constants.screen;
import {saveImageToGallery} from '../utils/imageSaver';

const Home = ({route}) => {
  const viewShotRef = useRef(null);
  const {originalImage, processedImage} = route.params;
  const [activeTab, setActiveTab] = useState('Removed');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [footerState, setFooterState] = useState('initial');
  const [colorState, setColorState] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState(null);
  const [selectedGradient, setSelectedGradient] = useState(null);
  const [selectedBackgroundImage, setSelectedBackgroundImage] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({width: 0, height: 0});
  const [hasTransitioned, setHasTransitioned] = useState(false);
  const transitionValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!hasTransitioned) {
      // Delay the start of the animation
      setTimeout(() => {
        Animated.timing(transitionValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false, // We need to set this to false for layout animations
        }).start(() => {
          setHasTransitioned(true);
          setActiveTab('Removed');
        });
      }, 250); // 0.1 second delay before the transition starts
    }
  }, [hasTransitioned, transitionValue]);

  useEffect(() => {
    Image.getSize(
      originalImage,
      (originalWidth, originalHeight) => {
        const aspectRatio = originalWidth / originalHeight;
        let newWidth = width * 0.9;
        let newHeight = newWidth / aspectRatio;

        if (newHeight > height * 0.6) {
          newHeight = height * 0.6;
          newWidth = newHeight * aspectRatio;
        }

        setImageDimensions({width: newWidth, height: newHeight});
      },
      error => {
        console.error('Error getting image size:', error);
      },
    );
  }, [originalImage]);

  const handleSaveImage = async () => {
    const success = await saveImageToGallery(viewShotRef);
    if (success) {
      setIsModalVisible(false);
    }
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

  const renderBackground = useMemo(() => {
    if (selectedGradient) {
      return (
        <LinearGradient
          colors={selectedGradient}
          style={[styles.backgroundContainer, imageDimensions]}>
          <Image
            source={{uri: processedImage}}
            style={styles.processedImage}
            resizeMode="contain"
          />
        </LinearGradient>
      );
    } else if (selectedBackgroundImage) {
      return (
        <View style={[styles.backgroundContainer, imageDimensions]}>
          <Image
            source={{uri: selectedBackgroundImage}}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
          <Image
            source={{uri: processedImage}}
            style={styles.processedImage}
            resizeMode="contain"
          />
        </View>
      );
    } else {
      return (
        <View
          style={[
            styles.backgroundContainer,
            imageDimensions,
            {backgroundColor},
          ]}>
          <Image
            source={{uri: processedImage}}
            style={styles.processedImage}
            resizeMode="contain"
          />
        </View>
      );
    }
  }, [
    selectedGradient,
    selectedBackgroundImage,
    backgroundColor,
    imageDimensions,
    processedImage,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText} allowFontScaling={false}>
          Transparify
        </Text>
        {activeTab !== 'Original' && (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => setIsModalVisible(true)}>
            <Text style={styles.saveButtonText} allowFontScaling={false}>
              Save
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
            style={[styles.image, imageDimensions]}>
            {!backgroundColor &&
            !selectedGradient &&
            !selectedBackgroundImage &&
            activeTab !== 'Original' ? (
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
                      source={require('../assets/images/square_background.jpg')}
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
                    style={{
                      flex: Animated.subtract(1, transitionValue),
                    }}
                  />
                </Animated.View>
              </View>
            ) : activeTab === 'Original' ? (
              <Image
                source={{uri: originalImage}}
                style={[styles.image, imageDimensions]}
                resizeMode="contain"
              />
            ) : (
              renderBackground
            )}
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
        />
      </View>
      <SaveModal
        onNormal={handleSaveImage}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(!isModalVisible)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.colors.white,
  },
  topBar: {
    height: height * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  topBarText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: constants.colors.textSecondary,
  },
  saveButton: {
    backgroundColor: constants.colors.primary,
    borderRadius: 20,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
  },
  saveButtonText: {
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
  },
  backgroundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  processedImage: {
    width: '100%',
    height: '100%',
  },
  checkeredBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
export default Home;
