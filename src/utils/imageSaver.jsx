import {NativeModules} from 'react-native';

const {TransparifyHelper} = NativeModules;

export const mergeBackgroundAndImage = (
  processedImage,
  background,
  backgroundType,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const base64Image = processedImage.split(',')[1];
      console.log('What is the color', background);
      console.log('Background Color is: ', background);
      console.log('Background Type is: ', backgroundType);
      if (backgroundType === 'color') {
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
