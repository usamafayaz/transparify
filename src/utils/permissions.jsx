import { PermissionsAndroid, Platform, Alert, Linking } from 'react-native';

const checkCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      return granted;
    } catch (error) {
      console.error('Error checking camera permission:', error);
      return false;
    }
  }
  return true;
};


const checkGalleryPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      return granted;
    } catch (error) {
      console.error('Error checking gallery permission:', error);
      return false;
    }
  }
  return true;
};

const checkWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      return granted;
    } catch (error) {
      console.error('Error checking writing permission:', error);
      return false;
    }
  }
  return true;
};

const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
        return true;
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        console.log('Camera permission denied');
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log('Camera permission blocked');
        showPermissionAlert('Camera');
      }
      return false;
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      return false;
    }
  }
  return true;
};

const requestGalleryPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Gallery permission granted');
        return true;
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        console.log('Gallery permission denied');
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log('Gallery permission blocked');
        showPermissionAlert('Gallery');
      }
      return false;
    } catch (error) {
      console.error('Error requesting gallery permission:', error);
      return false;
    }
  }
  return true;
};

const requestWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Gallery permission granted');
        return true;
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        console.log('Gallery permission denied');
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log('Gallery permission blocked');
        showPermissionAlert('Gallery');
      }
      return false;
    } catch (error) {
      console.error('Error requesting gallery permission:', error);
      return false;
    }
  }
  return true;
};

const showPermissionAlert = permissionType => {
  Alert.alert(
    `${permissionType} Permission Required`,
    `To use this feature, please enable the ${permissionType} permission in the app settings.`,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Open Settings',
        onPress: () => Linking.openSettings(),
      },
    ],
    { cancelable: false },
  );
};

const Permissions = {
  checkCameraPermission,
  checkGalleryPermission,
  requestCameraPermission,
  requestGalleryPermission,
  checkWritePermission,
  requestWritePermission,
};

export default Permissions;
