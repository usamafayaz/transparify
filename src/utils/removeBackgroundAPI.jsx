import {ToastAndroid} from 'react-native';

export const removeBackground = async (uri, setIsLoading, navigation) => {
  setIsLoading(true);
  const formData = new FormData();
  formData.append('image', {
    uri: uri,
    name: 'image.png',
    type: 'image/png',
  });
  formData.append('format', 'png');
  formData.append('model', 'v1');

  try {
    const response = await fetch('https://api2.pixelcut.app/image/matte/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const imageBlob = await response.blob();

    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      setIsLoading(false);
      navigation.navigate('Home', {
        originalImage: uri,
        processedImage: reader.result,
      });
    };
  } catch (error) {
    ToastAndroid.show(
      'Please check your internet connection and try again.',
      ToastAndroid.SHORT,
    );
    setIsLoading(false);
  }
};
