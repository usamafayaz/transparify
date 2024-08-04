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
import {basicColors, gradientColors} from '../config/colors';
import constants from '../config/constants';
import {openImagePicker} from '../utils/imagePicker';

import ColorPickerModal from './ColorPickerModal';

const {width, height} = Dimensions.get('window');

const Footer = ({
  activeTab,
  footerState,
  colorState,
  updateFooter,
  setColorState,
  handleColorSelect,
  selectGalleryImage,
}) => {
  const [colorModal, setColorModal] = useState(false);

  const onSelectColor = hex => {
    handleColorSelect(hex); // Call the provided handleColorSelect function
    setColorModal(false);
  };

  const renderColorOption = ({item}) => (
    <TouchableOpacity
      style={[styles.footerButton, {backgroundColor: item}]}
      onPress={() => handleColorSelect(item)}
    />
  );

  const renderGradientOption = ({item}) => (
    <TouchableOpacity onPress={() => handleColorSelect(item)}>
      <LinearGradient colors={item} style={styles.footerButton} />
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
            <Text style={styles.footerButtonText} allowFontScaling={false}>
              Solid
            </Text>
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
            <Text style={styles.footerButtonText} allowFontScaling={false}>
              Gradient
            </Text>
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
              onPress={() => setColorModal(true)}>
              <Image
                source={require('../assets/icons/color_picker.png')}
                style={styles.footerIcon}
              />
            </TouchableOpacity>
          )}
          {colorState === 'solid' && (
            <FlatList
              data={basicColors}
              renderItem={renderColorOption}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
          {colorState === 'gradient' && (
            <FlatList
              data={gradientColors}
              renderItem={renderGradientOption}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
      )}
      <ColorPickerModal
        visible={colorModal}
        onCancel={() => setColorModal(false)}
        onColorSelected={onSelectColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: constants.colors.white,
    paddingBottom: height * 0.03,
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
    backgroundColor: constants.colors.secondary,
    height: width * 0.17,
    width: width * 0.17,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: width * 0.02,
  },
  footerIcon: {
    width: width * 0.08,
    height: width * 0.08,
    marginBottom: 4,
  },
  footerButtonText: {
    fontSize: constants.fontSizes.xsmall,
    fontWeight: '500',
    color: constants.colors.black,
  },
});

export default Footer;
