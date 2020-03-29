import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Animated, Easing, Image, TouchableOpacity, Dimensions } from 'react-native';

import { AssetImage, VeilView } from '../Reusable'
import { Fire, Flash, Time } from '../../services'
import { ifIphoneX } from 'react-native-iphone-x-helper'

import Icon from '@expo/vector-icons/AntDesign'

import { mainStyle } from '../../styles'

interface Props {
  asso: any;

  onPress: () => void;
}
const AssoItem: React.FC<Props> = (props) => {

  const { asso, onPress } = props

  const pictures = asso.pictures
  const logo = pictures && pictures.length > 0 ? {uri: pictures[0]} : undefined

  const price = Number(asso.price || 0).toFixed(2)

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.picture}>
        <AssetImage style={mainStyle.abs} src={logo || require('../../images/event2.jpg')} resizeMode="cover" />
      </View>
      <Text numberOfLines={2} style={styles.name}>{asso.asso}</Text>
    </TouchableOpacity>
  );
}

const pictureSize = ifIphoneX({height: 80}, {height: 60}).height
const width = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginRight: 6,
    paddingHorizontal: 10,
    width: pictureSize + 20 * 2,
  },
  picture: {
    ...mainStyle.circle(pictureSize),
    borderWidth: 1,
    borderColor: '#ddd',
  },
  name: {
    marginTop: 12,
    ...mainStyle.montLight,
    fontSize: 15,
    textAlign: 'center',
  },
  radius: {
    flex: 1,
    borderRadius: 3,
    overflow: 'hidden'
  },
});

const mapStateToProps = (state: any) => ({

})
const mapDispatchToProps = (dispatch: any) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(AssoItem)