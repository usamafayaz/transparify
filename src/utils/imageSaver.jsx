import RNFS from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Platform, ToastAndroid } from 'react-native';
import { NativeModules } from 'react-native';
import Permissions from './permissions';

const { TransparifyHelper } = NativeModules;

export const saveImageToGallery = (processedImage, background, backgroundType) => {
  return new Promise(async (resolve, reject) => {
    try {
      const writePermissionGranted = await Permissions.checkWritePermission();
      if (!writePermissionGranted) {
        const result = await Permissions.requestWritePermission();
        if (!result) return false;
      }
      const base64Image = processedImage.split(',')[1]

      let colorData;
      if (backgroundType === "color") {
        backgroundData = { type: 'color', color: '#FF0000' }
      } else if (backgroundType === "gradient") {
        backgroundData = { type: 'gradient', gradient: { startColor: background[0], endColor: background[1] } }
      } else if (backgroundType === "image") {
        backgroundData = { type: 'image', uri: background }
      }
      console.log("what is the background and type=====>", background, backgroundType);

      TransparifyHelper.mergeImageWithBackground(base64Image, backgroundData).
        then(async (res) => {
          const directoryPath = `${RNFS.PicturesDirectoryPath}`;
          const savePath = `${RNFS.PicturesDirectoryPath}/${new Date().getTime()}.png`;
          const exists = await RNFS.exists(directoryPath)

          if (!exists) {
            await RNFS.mkdir(directoryPath);
            console.log("directory created");
          }

          await RNFS.copyFile(res, savePath);
          await RNFS.scanFile(savePath);

          resolve(true)

        }).catch((error) => {
          console.log("what is the error during merge ====>", error)
          reject(error)
        })
    } catch (error) {
      reject(error);
    }
  });
};