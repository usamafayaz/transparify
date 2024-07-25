import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from 'react-native';
import ToggleButtons from '../components/ToggleButtons';
import SaveModal from '../components/SaveModal';

const {width, height} = Dimensions.get('window');

const solidColors = [
  '#000000',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#FF00FF',
];
const gradients = [
  require('../assets/icons/gradient.png'),
  require('../assets/icons/gradient.png'),
];

const Home = ({route}) => {
  const renderColorOption = ({item}) => (
    <TouchableOpacity
      style={[styles.footerButton, {backgroundColor: item}]}
      onPress={() => handleColorSelect(item)}></TouchableOpacity>
  );

  const renderGradientOption = ({item}) => (
    <TouchableOpacity onPress={() => handleColorSelect(item)}>
      <Image source={item} style={styles.gradientImage} />
    </TouchableOpacity>
  );

  const {image} = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Original');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [footerState, setFooterState] = useState('initial');
  const [colorState, setColorState] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const updateFooter = state => {
    setFooterState(state);
  };

  const handleColorSelect = color => {
    // Handle the color selection logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Transparify</Text>
        {activeTab !== 'Original' && (
          <TouchableOpacity style={styles.saveButton} onPress={toggleModal}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#202455" />
          <Text style={[styles.loadingText, {fontSize: 18}]}>Processing</Text>
          <Text style={styles.loadingText}>Please wait</Text>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <ToggleButtons activeTab={activeTab} setActiveTab={setActiveTab} />
          <View style={styles.imageWrapper}>
            {image && (
              <Image
                source={{uri: image}}
                style={styles.imageStyle}
                resizeMode="contain"
              />
            )}
          </View>
          {activeTab !== 'Original' && (
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>
                Choose a background for your
              </Text>
              <Text style={styles.footerText}>Image below</Text>
              {footerState === 'initial' ? (
                <View style={styles.footerButtons}>
                  <TouchableOpacity
                    style={styles.footerButton}
                    onPress={() => updateFooter('color')}>
                    <Image
                      source={require('../assets/icons/color.png')}
                      style={styles.footerIcon}
                    />
                    <Text style={styles.footerButtonText}>Color</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.footerButton}>
                    <Image
                      source={require('../assets/icons/image.png')}
                      style={styles.footerIcon}
                    />
                    <Text style={styles.footerButtonText}>Image</Text>
                  </TouchableOpacity>
                </View>
              ) : footerState === 'color' && colorState === null ? (
                <View style={styles.footerButtons}>
                  <TouchableOpacity
                    style={styles.footerButton}
                    onPress={() => updateFooter('initial')}>
                    <Image
                      source={require('../assets/icons/back.png')}
                      style={styles.footerIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.footerButton}
                    onPress={() => {
                      setColorState('solid');
                    }}>
                    <Image
                      source={require('../assets/icons/solid.png')}
                      style={styles.footerIcon}
                    />
                    <Text style={styles.footerButtonText}>Solid</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.footerButton}
                    onPress={() => {
                      setColorState('gradient');
                    }}>
                    <Image
                      source={require('../assets/icons/gradient.png')}
                      style={styles.footerIcon}
                    />
                    <Text style={styles.footerButtonText}>Gradient</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.footerButtons}>
                  <TouchableOpacity
                    style={styles.footerButton}
                    onPress={() => setColorState(null)}>
                    <Image
                      source={require('../assets/icons/back.png')}
                      style={styles.footerIcon}
                    />
                  </TouchableOpacity>
                  {(colorState === 'solid' || colorState === 'gradient') && (
                    <TouchableOpacity
                      style={styles.footerButton}
                      onPress={() => updateFooter('initial')}>
                      <Image
                        source={require('../assets/icons/color_picker.png')}
                        style={styles.footerIcon}
                      />
                    </TouchableOpacity>
                  )}
                  {colorState === 'solid' && (
                    <FlatList
                      data={solidColors}
                      renderItem={renderColorOption}
                      keyExtractor={(item, index) => index.toString()}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    />
                  )}
                  {colorState === 'gradient' && (
                    <FlatList
                      data={gradients}
                      renderItem={renderGradientOption}
                      keyExtractor={(item, index) => index.toString()}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    />
                  )}
                </View>
              )}
            </View>
          )}
        </View>
      )}
      <SaveModal visible={isModalVisible} onClose={toggleModal} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: '2%',
  },
  topBar: {
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '3%',
  },
  topBarText: {
    fontSize: width * 0.06, // 6% of screen width
    fontWeight: 'bold',
    color: '#5B5B5B',
  },
  saveButton: {
    backgroundColor: '#202455',
    borderRadius: 20,
    paddingVertical: '1.3%',
    paddingHorizontal: '5%',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045, // 4.5% of screen width
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: width * 0.04, // 4% of screen width
    color: '#000000',
    marginTop: 10,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: '5%',
  },
  imageWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  imageStyle: {
    width: width * 0.8,
    height: height * 0.55,
    marginTop: height * 0.03,
  },
  footerContainer: {
    position: 'absolute',
    bottom: height * 0.03,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  footerText: {
    fontSize: width * 0.04, // 4% of screen width
    color: '#5B5B5B',
    textAlign: 'center',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '5%',
  },
  footerButton: {
    backgroundColor: '#F4F4F4',
    height: width * 0.18,
    width: width * 0.18,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: width * 0.02, // 5% of screen width
  },
  footerIcon: {
    width: width * 0.09, // 9% of screen width
    height: width * 0.09, // 9% of screen width
    marginBottom: 4,
  },
  footerButtonText: {
    fontSize: width * 0.03,
    fontWeight: '500',
    color: '#000000',
  },
  gradientImage: {
    width: width * 0.16, // 16% of screen width
    height: width * 0.16, // 16% of screen width
    borderRadius: 10,
    marginHorizontal: width * 0.05, // 5% of screen width
  },
});

export default Home;
