import {ToastAndroid} from 'react-native';
import apiUrl from '../config/apiUrl';

const checkInternetConnection = async (timeout = 5000) => {
  const url = 'https://www.google.com';
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      cache: 'no-cache',
      signal: controller.signal,
    });
    console.log('Response from google:', response.ok);

    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const removeBackground = async (uri, navigation) => {
  const isConnected = await checkInternetConnection();

  if (!isConnected) {
    navigation.goBack();
    ToastAndroid.show(
      'Please check your internet connection and try again.',
      ToastAndroid.SHORT,
    );
    return;
  }

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
    console.log('Background API Called !');

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(imageBlob);
    });
  } catch (error) {
    navigation.goBack();
    ToastAndroid.show(
      'An error occurred while processing your request. Please try again.',
      ToastAndroid.SHORT,
    );
  }
};
