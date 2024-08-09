import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Share,
} from 'react-native';
import constants from '../config/constants';

const {width, height} = constants.screen;

const ShareToSocial = ({route}) => {
  const {processedImage} = route.params;

  const handleShare = async platform => {
    let url;

    switch (platform) {
      case 'WhatsApp':
        url = `whatsapp://send?text=Check out this image!&url=${processedImage}`;
        break;
      case 'Facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${processedImage}`;
        break;
      case 'Instagram':
        url = `instagram://share?url=${processedImage}`;
        break;
      case 'Share':
        try {
          const shareOptions = {
            title: 'Share Image',
            message: 'Check out this image!',
            url: processedImage,
          };
          await Share.share(shareOptions);
          return; // Exit the function after sharing
        } catch (error) {
          console.error('Error sharing image:', error);
          return;
        }
      default:
        alert('Unsupported platform');
        return;
    }

    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        Linking.openURL(url);
      } else {
        alert(`${platform} is not installed on your device.`);
      }
    } catch (error) {
      console.error(`Failed to share image to ${platform}:`, error);
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
    resizeMode: 'contain',
  },
});

export default ShareToSocial;
