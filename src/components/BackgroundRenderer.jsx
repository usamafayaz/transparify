import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BackgroundRenderer = React.memo(
  ({
    selectedGradient,
    selectedBackgroundImage,
    backgroundColor,
    imageDimensions,
    processedImage,
  }) => {
    if (selectedGradient) {
      return (
        <LinearGradient
          colors={selectedGradient}
          style={[styles.backgroundContainer, imageDimensions]}>
          <Image
            source={{uri: processedImage}}
            style={styles.processedImage}
            resizeMode="contain"
          />
        </LinearGradient>
      );
    } else if (selectedBackgroundImage) {
      return (
        <View style={[styles.backgroundContainer, imageDimensions]}>
          <Image
            source={{uri: selectedBackgroundImage}}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
          <Image
            source={{uri: processedImage}}
            style={styles.processedImage}
            resizeMode="contain"
          />
        </View>
      );
    } else {
      return (
        <View
          style={[
            styles.backgroundContainer,
            imageDimensions,
            {backgroundColor},
          ]}>
          <Image
            source={{uri: processedImage}}
            style={styles.processedImage}
            resizeMode="contain"
          />
        </View>
      );
    }
  },
);

const styles = StyleSheet.create({
  backgroundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  processedImage: {
    width: '100%',
    height: '100%',
  },
});

export default BackgroundRenderer;
