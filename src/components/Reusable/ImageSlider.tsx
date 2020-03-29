import React from 'react';
import { StyleSheet, Image, FlatList, View, Dimensions, Text } from 'react-native';

import AssetImage from './AssetImage'
import VeilView from './VeilView'

import { Cache } from '../../services'

import { mainStyle } from '../../styles'

interface Props {
  pictures: any[];

  width: number;
  height: number;
}
interface State {
  selectedIndex: number;
}
export default class ImageSlider extends React.Component<Props, State>  {
  
  state = {
    selectedIndex: 0,
  }

  onScroll(event: any) {
    const { width } = this.props
    const { selectedIndex } = this.state

    const x = event.nativeEvent.contentOffset.x
    const newIndex = width > 0 ? Math.ceil(x / width) : 0;

    if (newIndex !== selectedIndex) {
      this.setState({
        selectedIndex: newIndex
      })
    }
  }

  renderItem(item: any, index: number) {
    const { width, height } = this.props

    return (
      <View style={[styles.picture, {width: width, height: height}]}>
        <AssetImage style={styles.bgImage} src={{ uri: Cache.serve(item) }} resizeMode='cover' />
        <VeilView abs start='rgba(0, 0, 0, 0.26)' end='rgba(0, 0, 0, 0.12)' />
      </View>
    )
  }

  render() {
    const { selectedIndex } = this.state
    const { pictures } = this.props
    const { width, height } = this.props
    return (
      <View style={[styles.container,  {width: width, height: height}]}>
        <FlatList
          data={pictures}
          pagingEnabled
          onScroll={(event: any) => this.onScroll(event)}
          scrollEventThrottle={16}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => this.renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          />
        { pictures && pictures.length >= 2 &&
          <View style={styles.pagination}>
            {pictures.map((item, index) => 
              <View
                key={index}
                style={[
                  styles.dot,
                  index == selectedIndex ? styles.dotSelected : {}
              ]}></View>
            )}
          </View>
        }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picture: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    ...mainStyle.abs,
    flex: 1,
  },
  text: {
    ...mainStyle.montBold,
    fontSize: 42,
    color: '#fff',
  },
  pagination: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dot: {
    ...mainStyle.circle(8),
    marginRight: 2,
    marginLeft: 2,
    borderWidth: 1,
    borderColor: '#fff'
  },
  dotSelected: { 
    backgroundColor: '#fff',
  }
});