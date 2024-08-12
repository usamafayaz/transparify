import RNFS from 'react-native-fs';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Platform, ToastAndroid} from 'react-native';
import {NativeModules} from 'react-native';
import Permissions from './permissions';

const {TransparifyHelper} = NativeModules;

export const saveImageToGallery = (
  processedImage,
  background,
  backgroundType,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const writePermissionGranted = await Permissions.checkWritePermission();
      if (!writePermissionGranted) {
        const result = await Permissions.requestWritePermission();
        if (!result) return false;
      }
      const base64Image = processedImage.split(',')[1];
      console.log('What is the color', background);

      const directoryPath = `${RNFS.PicturesDirectoryPath}`;
      const savePath = `${
        RNFS.PicturesDirectoryPath
      }/${new Date().getTime()}.png`;
      const exists = await RNFS.exists(directoryPath);

      if (!exists) {
        await RNFS.mkdir(directoryPath);
        console.log('directory created');
      }
      console.log('Background Color is: ', background);
      console.log('Background Type is: ', backgroundType);
      if (backgroundType === 'nobackground') {
        console.log('backgroundType  ', backgroundType);
        console.log('Entering in No background Block');
        RNFS.writeFile(savePath, base64Image, 'base64');
        await RNFS.scanFile(savePath);
        resolve(savePath);
        return;
      } else if (backgroundType === 'color') {
        backgroundData = {type: 'color', color: background};
      } else if (backgroundType === 'gradient') {
        backgroundData = {
          type: 'gradient',
          gradient: {startColor: background[0], endColor: background[1]},
        };
      } else if (backgroundType === 'image') {
        backgroundData = {type: 'image', uri: background};
      }
      TransparifyHelper.mergeImageWithBackground(base64Image, backgroundData)
        .then(async res => {
          await RNFS.copyFile(res, savePath);
          await RNFS.scanFile(savePath);
          resolve(savePath);
        })
        .catch(error => {
          console.log('what is the error during merge ====>', error);
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};
