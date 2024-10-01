import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {basicColors, gradientColors} from '../config/colorsList';
import constants from '../config/constants';
import {openImagePicker} from '../utils/imagePicker';

// import ColorPickerModal from './ColorPickerModal';

const {width, height} = Dimensions.get('window');

const Footer = ({
  activeTab,
  footerState,
  colorState,
  updateFooter,
  setColorState,
  handleColorSelect,
  selectGalleryImage,
  clearBackground,
  showClearButton,
}) => {
  const [colorModal, setColorModal] = useState(false);

  const onSelectColor = hex => {
    handleColorSelect(hex); // Call the provided handleColorSelect function
  };

  const renderColorOption = ({item}) => (
    <TouchableOpacity
      disabled={activeTab === 'Original' ? true : false}
      style={[
        styles.footerButton,
        {
          backgroundColor: item,
          borderColor:
            constants.colorScheme == 'dark'
              ? 'rgba(255,255,255,0)'
              : 'rgba(0,0,0,0.2)',
          borderWidth: 1,
        },
      ]}
      onPress={() => handleColorSelect(item)}
    />
  );

  const renderGradientOption = ({item}) => (
    <TouchableOpacity
      disabled={activeTab === 'Original' ? true : false}
      onPress={() => handleColorSelect(item)}>
      <LinearGradient
        colors={item}
        style={[
          styles.footerButton,
          {
            borderColor:
              constants.colorScheme == 'dark'
                ? 'rgba(255,255,255,0)'
                : 'rgba(0,0,0,0.2)',
            borderWidth: 1,
          },
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.footerContainer,
        {opacity: activeTab === 'Original' ? 0 : 1},
      ]}>
      <Text style={styles.footerText} allowFontScaling={false}>
        Choose a background for your
      </Text>
      <Text style={styles.footerText} allowFontScaling={false}>
        Image below
      </Text>
      {footerState === 'initial' ? (
        <View style={styles.footerButtons}>
          <TouchableOpacity
            disabled={activeTab === 'Original' ? true : false}
            style={styles.footerButton}
            onPress={() => updateFooter('color')}>
            <Image
              source={require('../assets/icons/color.png')}
              style={styles.footerIcon}
            />
            <Text style={styles.footerButtonText} allowFontScaling={false}>
              Color
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={activeTab === 'Original' ? true : false}
            style={styles.footerButton}
            onPress={() => openImagePicker(selectGalleryImage)}>
            <Image
              source={require('../assets/icons/image.png')}
              style={styles.footerIcon}
            />
            <Text style={styles.footerButtonText} allowFontScaling={false}>
              Image
            </Text>
          </TouchableOpacity>
          {showClearButton && (
            <TouchableOpacity
              disabled={activeTab === 'Original' ? true : false}
              style={[styles.footerButton]}
              onPress={() => {
                clearBackground();
              }}>
              <Image
                source={require('../assets/icons/clear.png')}
                style={styles.footerIcon}
              />
              <Text style={styles.footerButtonText} allowFontScaling={false}>
                Clear
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : footerState === 'color' && colorState === null ? (
        <View style={styles.footerButtons}>
          <TouchableOpacity
            disabled={activeTab === 'Original' ? true : false}
            style={styles.footerButton}
            onPress={() => updateFooter('initial')}>
            <Image
              source={require('../assets/icons/back.png')}
              style={[styles.footerIcon, {opacity: 0.8}]}
              tintColor={constants.colors.textPrimary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={activeTab === 'Original' ? true : false}
            style={styles.footerButton}
            onPress={() => {
              setColorState('solid');
            }}>
            <Image
              source={require('../assets/icons/solid.png')}
              style={styles.footerIcon}
            />
            <Text style={styles.footerButtonText} allowFontScaling={false}>
              Solid
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={activeTab === 'Original' ? true : false}
            style={styles.footerButton}
            onPress={() => {
              setColorState('gradient');
            }}>
            <Image
              source={require('../assets/icons/gradient.png')}
              style={styles.footerIcon}
            />
            <Text style={styles.footerButtonText} allowFontScaling={false}>
              Gradient
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.footerButtons}>
          <TouchableOpacity
            disabled={activeTab === 'Original' ? true : false}
            style={styles.footerButton}
            onPress={() => setColorState(null)}>
            <Image
              source={require('../assets/icons/back.png')}
              style={styles.footerIcon}
              tintColor={constants.colors.textPrimary}
            />
          </TouchableOpacity>
          {/* {colorState === 'solid' && (
            <TouchableOpacity
              disabled={activeTab === 'Original' ? true : false}
              style={styles.footerButton}
              onPress={() => setColorModal(true)}>
              <Image
                source={require('../assets/icons/color_picker.png')}
                style={styles.footerIcon}
              />
            </TouchableOpacity>
          )} */}
          {colorState === 'solid' && (
            <FlatList
              data={basicColors}
              renderItem={renderColorOption}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              initialNumToRender={10} // Number of items to render initially
              maxToRenderPerBatch={10} // Number of items to render in each batch
              windowSize={5} // Number of items to keep in memory
            />
          )}
          {colorState === 'gradient' && (
            <FlatList
              data={gradientColors}
              renderItem={renderGradientOption}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              initialNumToRender={10} // Number of items to render initially
              maxToRenderPerBatch={10} // Number of items to render in each batch
              windowSize={5} // Number of items to keep in memory
            />
          )}
        </View>
      )}
      {/* <ColorPickerModal
        visible={colorModal}
        onCancel={() => setColorModal(false)}
        onColorSelected={onSelectColor}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: constants.colors.backgroundColor,
    paddingBottom: height * 0.03,
    paddingHorizontal: width * 0.02,
  },
  footerText: {
    fontSize: constants.fontSizes.small,
    color: constants.colors.textSecondary,
    textAlign: 'center',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: height * 0.02,
  },
  footerButton: {
    backgroundColor: constants.colors.toggleButtonBackground,
    height: width * 0.16,
    width: width * 0.16,
    justifyContent: 'center',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: width * 0.02,
  },
  footerIcon: {
    width: width * 0.07,
    height: width * 0.07,
    marginBottom: 4,
  },
  footerButtonText: {
    fontSize: constants.fontSizes.xsmall,
    fontWeight: '500',
    color: constants.colors.textPrimary,
  },
});

export default Footer;
