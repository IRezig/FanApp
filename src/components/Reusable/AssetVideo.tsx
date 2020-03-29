import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { Video } from 'expo-av'

interface Props {
  src: any;
  play: boolean;

  ref?: any;
  style?: any;
  resizeMode?: any;

  isMuted?: boolean;
  isLooping?: boolean;
  volume?: number;
}
const defaultProps = {
  resizeMode: 'contain'
}

const AssetVideo: React.SFC<Props> = (props) => {
  return (
    <Video
      ref={props.ref}
      source={props.src}
      rate={1.0}
      volume={props.volume || 1.0}
      isMuted={props.isMuted || false}
      resizeMode={props.resizeMode}
      shouldPlay={props.play || false}
      isLooping={props.isLooping || false}
      style={[styles.video, props.style]}
    />
  )
}

const styles = StyleSheet.create({
  video: {
    width: undefined,
    height: undefined,
    flex: 1,
  },
});

AssetVideo.defaultProps = defaultProps
export default AssetVideo