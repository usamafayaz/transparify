import React, {useMemo, useCallback} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import RNFS from 'react-native-fs';
import constants from '../config/constants';
import Permissions from '../utils/permissions';
import Share from 'react-native-share';

const {width, height} = constants.screen;

const TopBar = React.memo(({onBackPress}) => (
  <View style={styles.topBar}>
    <TouchableOpacity onPress={onBackPress}>
      <Image
        resizeMode="contain"
        source={require('../assets/icons/left_arrow.png')}
        style={styles.iconStyle}
        tintColor={constants.colors.textSecondary}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={onBackPress}>
      <Image
        resizeMode="contain"
        source={require('../assets/icons/invite.png')}
        style={[styles.iconStyle, {height: height * 0.06, width: width * 0.06}]}
        tintColor={constants.colors.textSecondary}
      />
    </TouchableOpacity>
  </View>
));

const IconButton = React.memo(({onPress, icon, text}) => (
  <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
    <Image
      source={icon}
      style={[styles.iconStyle, {height: height * 0.06, width: width * 0.06}]}
      tintColor={constants.colors.textPrimary}
    />
    <Text style={styles.iconText} allowFontScaling={false}>
      {text}
    </Text>
  </TouchableOpacity>
));

const ShareToSocial = ({route, navigation}) => {
  const {mergedImage, noBackground, imageDimensions} = route.params;

  const handleShare = useCallback(async () => {
    let tempFilePath = null;
    try {
      let imageUri = mergedImage;
      if (noBackground) {
        tempFilePath = `${
          RNFS.CachesDirectoryPath
        }/temp_share_image_${Date.now()}.png`;
        await RNFS.writeFile(tempFilePath, mergedImage.split(',')[1], 'base64');
        imageUri = `file://${tempFilePath}`;
      } else if (!imageUri.startsWith('file://')) {
        imageUri = `file://${imageUri}`;
      }

      const shareOptions = {
        title: 'Share Image',
        message:
          'Check out this awesome image I created with the Transparify app!',
        url: imageUri,
        type: 'image/png',
      };
      const shareResponse = await Share.open(shareOptions);
      console.log('Share response:', shareResponse);
      ToastAndroid.show('Image shared successfully!', ToastAndroid.SHORT);
    } catch (error) {
      if (error.message.includes('User did not share')) {
        console.log('User cancelled sharing');
      } else if (
        error.message.includes('android.content.ActivityNotFoundException')
      ) {
        console.error('No suitable app found for sharing', error);
        ToastAndroid.show(
          'No suitable app found for sharing',
          ToastAndroid.SHORT,
        );
      } else {
        console.warn('Sharing completed, but with an error:', error);
      }
    } finally {
      // Clean up the temporary file if it was created
      if (tempFilePath) {
        RNFS.unlink(tempFilePath)
          .then(() => console.log('Temporary file deleted'))
          .catch(err => console.warn('Error deleting temporary file:', err));
      }
    }
  }, [mergedImage, noBackground]);

  const handleSaveToGallery = useCallback(async () => {
    try {
      const writePermissionGranted = await Permissions.checkWritePermission();
      if (!writePermissionGranted) {
        const result = await Permissions.requestWritePermission();
        if (!result) return false;
      }
      const directoryPath = `${RNFS.PicturesDirectoryPath}`;
      const savePath = `${
        RNFS.PicturesDirectoryPath
      }/${new Date().getTime()}.png`;
      const exists = await RNFS.exists(directoryPath);

      if (!exists) {
        await RNFS.mkdir(directoryPath);
        console.log('directory created');
      }
      if (noBackground) {
        RNFS.writeFile(savePath, mergedImage.split(',')[1], 'base64');
        await RNFS.scanFile(savePath);
      } else {
        await RNFS.copyFile(mergedImage, savePath);
        await RNFS.scanFile(savePath);
      }
      ToastAndroid.show(
        'Image saved to gallery successfully!',
        ToastAndroid.SHORT,
      );
    } catch (error) {
      console.error('Error saving image to gallery:', error);
      ToastAndroid.show('Failed to save image to gallery.', ToastAndroid.SHORT);
    }
  }, [mergedImage, noBackground]);

  const imageSource = useMemo(
    () => ({
      uri: noBackground ? mergedImage : `file://${mergedImage}`,
    }),
    [mergedImage, noBackground],
  );

  const handleBackPress = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <View style={styles.container}>
      <TopBar onBackPress={handleBackPress} />
      <View style={styles.contentContainer}>
        <View style={[styles.imageContainer, imageDimensions]}>
          <Image
            source={require('../assets/images/square_background.png')}
            style={[styles.checkeredBackground, imageDimensions]}
          />
          <Image
            source={imageSource}
            style={[styles.processedImage, imageDimensions]}
            resizeMode="contain"
          />
        </View>
        <View style={styles.iconRow}>
          <IconButton
            onPress={handleSaveToGallery}
            icon={require('../assets/icons/download.png')}
            text="Gallery"
          />
          <IconButton
            onPress={handleShare}
            icon={require('../assets/icons/share.png')}
            text="Share"
          />
        </View>
      </View>
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
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.05,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: 7,
    overflow: 'hidden',
  },
  processedImage: {
    resizeMode: 'contain',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '60%',
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: constants.colors.buttonBackground,
    flexDirection: 'row',
    width: 120,
    height: 50,
    borderRadius: 7,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    height: height * 0.08,
    width: width * 0.08,
    resizeMode: 'contain',
    marginRight: 8,
  },
  iconText: {
    fontSize: constants.fontSizes.small,
    color: constants.colors.textPrimary,
  },
  checkeredBackground: {
    ...StyleSheet.absoluteFill,
  },
});

export default ShareToSocial;
