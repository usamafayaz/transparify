import {ToastAndroid} from 'react-native';
import apiUrl from '../config/apiUrl';
export const removeBackground = async uri => {
  const formData = new FormData();
  formData.append('image', {
    uri: uri,
    name: 'image.png',
    type: 'image/png',
  });
  formData.append('format', 'png');
  formData.append('model', 'v1');

  try {
    const response = await fetch(apiUrl.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const imageBlob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(imageBlob);
    });
  } catch (error) {
    ToastAndroid.show(
      'Please check your internet connection and try again.',
      ToastAndroid.SHORT,
    );
  }
};
