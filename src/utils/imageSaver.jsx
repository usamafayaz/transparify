import { NativeModules } from 'react-native';
const { TransparifyHelper } = NativeModules;
import RNFS from 'react-native-fs';

export const mergeBackgroundAndImage = (
  processedImage,
  background,
  backgroundType,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const base64Image = processedImage.split(',')[1];
      if (backgroundType === 'color') {
        backgroundData = { type: 'color', color: background };
      } else if (backgroundType === 'gradient') {
        backgroundData = {
          type: 'gradient',
          gradient: { startColor: background[0], endColor: background[1] },
        };
      } else if (backgroundType === 'image') {
        backgroundData = { type: 'image', uri: background };
      }

      const cacheDir = RNFS.CachesDirectoryPath;
      TransparifyHelper.mergeImageWithBackground(base64Image, backgroundData)
        .then(async res => {
          const oldFiles = await RNFS.readDir(cacheDir);
          let filePaths = oldFiles.map(file => file.path);
          filePaths = filePaths.filter((path) => path.includes('tnspym') && path !== res);
          await Promise.all(filePaths.map(path => RNFS.unlink(path)));
          resolve(res);
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
