import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Animated, Easing, Image, TouchableOpacity, Dimensions } from 'react-native';

import { AssetImage, VeilView, AssetVideo } from '../Reusable'
import { Fire, Flash, Time, Cache } from '../../services'
import { ifIphoneX } from 'react-native-iphone-x-helper'

import { switchTab } from '../../actions/tab.action'

import Icon from '@expo/vector-icons/AntDesign'

import { mainStyle } from '../../styles'

interface Props {
  index: number;
  event: any;

  onPress: () => void;
}
class EventItem extends React.PureComponent<Props> {

  render() {

    const { event, onPress } = this.props

    return (
      <TouchableOpacity onPress={onPress} style={[styles.container]}>
        <View style={styles.picture}>
          <Text>{event.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    height: 50,
  }
});

export default EventItem