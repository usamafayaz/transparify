import {useCallback} from 'react';
import {ToastAndroid} from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import Permissions from './permissions';

export const useShareAndInvite = (mergedImage, noBackground) => {
  const handleShare = useCallback(async () => {
    let tempFilePath = null;
    try {
      let imageUri = mergedImage;
      if (noBackground) {
        tempFilePath = `${RNFS.CachesDirectoryPath}/tnspym${Date.now()}.png`;
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
    } catch (error) {
      if (error.message.includes('User did not share')) {
        console.log('User cancelled sharing');
      } else if (
        error.message.includes('android.content.ActivityNotFoundException')
      ) {
        console.log('No suitable app found for sharing', error);
        ToastAndroid.show(
          'No suitable app found for sharing',
          ToastAndroid.SHORT,
        );
      } else {
        console.warn('Sharing completed, but with an error:', error);
      }
    } finally {
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
      console.log('Error saving image to gallery:', error);
    }
  }, [mergedImage, noBackground]);

  const handleWhatsAppShare = useCallback(async () => {
    try {
      const imageUri = noBackground
        ? `data:image/png;base64,${mergedImage.split(',')[1]}`
        : mergedImage;
      const shareOptions = {
        url: imageUri,
        type: 'image/png',
        social: Share.Social.WHATSAPP,
      };
      const shareResponse = await Share.shareSingle(shareOptions);
      console.log('WhatsApp share response:', shareResponse);
    } catch (error) {
      console.log('Error sharing on WhatsApp:', error);
      ToastAndroid.show(
        'Failed to share image on WhatsApp.',
        ToastAndroid.SHORT,
      );
    }
  }, [mergedImage, noBackground]);

  const handleInvite = useCallback(async () => {
    try {
      const shareOptions = {
        title: 'Invite Friends',
        message: 'Join me on the Transparify app and create amazing images!',
        url: 'https://yourapp.link/invite', // Replace with your app link
      };
      const shareResponse = await Share.open(shareOptions);
      console.log('Invite response:', shareResponse);
    } catch (error) {
      console.log('Error sending invitation:', error);
    }
  }, []);

  return {
    handleShare,
    handleSaveToGallery,
    handleWhatsAppShare,
    handleInvite,
  };
};
