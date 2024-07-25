import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {height} = Dimensions.get('window');

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.imageStyle}
      />
      <Text style={styles.titleStyle}>Transparify</Text>
      <Text style={styles.textStyle}>Easily transform your images into</Text>
      <Text style={styles.textStyle}>transparent PNGs.</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate('Image Upload' as never);
        }}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: '7%',
    justifyContent: 'center',
  },
  imageStyle: {
    marginTop: height * 0.3,
  },
  titleStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: height * 0.05,
  },
  textStyle: {
    fontSize: 18,
    color: '#5B5B5B',
    textAlign: 'center',
    marginBottom: 5,
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: '#202455',
    borderRadius: 40,
    padding: 12,
    marginTop: height * 0.2,
    alignItems: 'center',
    shadowColor: '#202455',
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Welcome;
