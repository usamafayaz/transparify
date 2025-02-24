import React, {useMemo, useCallback} from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import constants from '../config/constants';
import {useShareAndInvite} from '../utils/saveAndShare';

const {width, height} = constants.screen;

const TopBar = React.memo(({onBackPress, onInvitePress}) => (
  <View style={styles.topBar}>
    <TouchableOpacity activeOpacity={0.5} onPress={onBackPress}>
      <Image
        resizeMode="contain"
        source={require('../assets/icons/left_arrow.png')}
        style={styles.iconStyle}
        tintColor={constants.colors.textSecondary}
      />
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.5} onPress={onInvitePress}>
      <Image
        resizeMode="contain"
        source={require('../assets/icons/invite.png')}
        style={[styles.iconStyle, {width: 24, height: 24}]}
        tintColor={constants.colors.textSecondary}
      />
    </TouchableOpacity>
  </View>
));

const ShareToSocial = ({route, navigation}) => {
  const {mergedImage, noBackground, imageDimensions} = route.params;
  const {handleShare, handleSaveToGallery, handleWhatsAppShare, handleInvite} =
    useShareAndInvite(mergedImage, noBackground);

  const imageSource = useMemo(
    () => ({
      uri: noBackground ? mergedImage : `file://${mergedImage}`,
    }),
    [mergedImage, noBackground],
  );

  const handleBackPress = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <View style={styles.container}>
      <TopBar onBackPress={handleBackPress} onInvitePress={handleInvite} />
      <View style={styles.contentContainer}>
        <View style={[styles.imageContainer, imageDimensions]}>
          <Image
            source={require('../assets/images/square_background.png')}
            style={[styles.checkeredBackground, imageDimensions]}
          />
          <Image
            source={imageSource}
            style={[styles.processedImage, imageDimensions]}
            resizeMode="contain"
          />
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleSaveToGallery}
            style={[styles.iconButton, styles.saveButton]}>
            <Image
              source={require('../assets/icons/download.png')}
              style={[styles.iconStyle, {width: 25, height: 25}]}
              tintColor="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleWhatsAppShare}
            style={[styles.iconButton, styles.whatsappButton]}>
            <Image
              source={require('../assets/icons/whatsapp.png')}
              style={[styles.iconStyle, {width: 40, height: 40}]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleShare}
            style={[styles.iconButton, styles.shareButton]}>
            <Image
              source={require('../assets/icons/share.png')}
              style={[styles.iconStyle, {width: 24, height: 24}]}
              tintColor="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.colors.backgroundColor,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.06,
    justifyContent: 'space-between',
    marginVertical: height * 0.02,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.025,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.05,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: 7,
    overflow: 'hidden',
  },
  processedImage: {
    resizeMode: 'contain',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    paddingBottom: height * 0.02,
  },
  iconButton: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: constants.colors.primary,
  },
  shareButton: {
    backgroundColor: 'grey',
  },
  whatsappButton: {
    backgroundColor: '#29A71A',
  },
  iconStyle: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  checkeredBackground: {
    ...StyleSheet.absoluteFill,
  },
});

export default ShareToSocial;
