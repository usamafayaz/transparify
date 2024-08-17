import {Image} from 'react-native';
import constants from '../config/constants';

const {width, height} = constants.screen;

export const calculateImageDimensions = imageUri => {
  return new Promise((resolve, reject) => {
    Image.getSize(
      imageUri,
      (originalWidth, originalHeight) => {
        const aspectRatio = originalWidth / originalHeight;
        let newWidth = width * 0.9;
        let newHeight = newWidth / aspectRatio;

        if (newHeight > height * 0.6) {
          newHeight = height * 0.6;
          newWidth = newHeight * aspectRatio;
        }
        resolve({width: newWidth, height: newHeight});
      },
      error => {
        console.error('Error getting image size:', error);
        reject(error);
      },
    );
  });
};
