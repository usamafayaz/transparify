import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Share from 'react-native-share';
import constants from '../config/constants';

const {width, height} = constants.screen;

const ShareToSocial = ({route}) => {
  const {processedImage} = route.params;

  const handleShare = async platform => {
    let shareOptions;

    switch (platform) {
      case 'WhatsApp':
        shareOptions = {
          title: 'Share Image',
          message: 'Check out this image!',
          url: processedImage,
          social: Share.Social.WHATSAPP,
        };
        break;
      case 'Facebook':
        shareOptions = {
          title: 'Share Image',
          message: 'Check out this image!',
          url: processedImage,
          social: Share.Social.SNAPCHAT,
        };
        break;
      case 'Instagram':
        shareOptions = {
          title: 'Share Image',
          message: 'Check out this image!',
          url: processedImage,
          social: Share.Social.FACEBOOK,
        };
        break;
      case 'Share':
        shareOptions = {
          title: 'Share Image',
          message: 'Check out this image!',
          url: processedImage,
          social: Share.Social.FACEBOOK,
        };
        break;
      default:
        alert('Unsupported platform');
        return;
    }

    try {
      await Share.shareSingle(shareOptions);
    } catch (error) {
      console.error('Error sharing image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText} allowFontScaling={false}>
          Transparify
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: processedImage}} style={styles.processedImage} />
        </View>
        <Text
          style={[styles.topBarText, {fontWeight: '500', marginTop: 20}]}
          allowFontScaling={false}>
          Share Image
        </Text>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => handleShare('WhatsApp')}>
            <Image
              source={require('../assets/icons/whatsapp.png')}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShare('Facebook')}>
            <Image
              source={require('../assets/icons/facebook.png')}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShare('Instagram')}>
            <Image
              source={require('../assets/icons/instagram.png')}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShare('Share')}>
            <Image
              source={require('../assets/icons/share.png')}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
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
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  processedImage: {
    width: '100%',
    height: height * 0.5,
    resizeMode: 'contain',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    width: '60%',
  },
  iconStyle: {
    height: height * 0.12,
    width: width * 0.12,
    resizeMode: 'contain',
  },
});

export default ShareToSocial;
