import RNFS from 'react-native-fs';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {ToastAndroid} from 'react-native';
import Permissions from './permissions';

export const saveImageToGallery = async viewShotRef => {
  try {
    const galleryPermissionGranted = await Permissions.checkGalleryPermission();
    if (!galleryPermissionGranted) {
      const result = await Permissions.requestGalleryPermission();
      if (!result) return;
    }
    if (!viewShotRef.current) {
      throw new Error('ViewShot ref is not available');
    }

    const uri = await viewShotRef.current.capture({
      quality: 1,
      format: 'png',
      result: 'tmpfile',
    });

    if (!uri) {
      throw new Error('Failed to capture screenshot');
    }

    const fileName = `transparify_${Date.now()}.png`;
    const directory = `${RNFS.PicturesDirectoryPath}/Transparify`;
    await RNFS.mkdir(directory);

    const newPath = `${directory}/${fileName}`;
    await RNFS.copyFile(uri, newPath);

    await CameraRoll.saveAsset(`file://${newPath}`, {
      type: 'photo',
      album: 'Transparify',
    });

    ToastAndroid.show('Image saved to gallery', ToastAndroid.SHORT);
    return uri;
  } catch (error) {
    console.error('Error saving image:', error);
    ToastAndroid.show(
      'Error: Failed to save image. Please try again.',
      ToastAndroid.SHORT,
    );
    return false;
  }
};
