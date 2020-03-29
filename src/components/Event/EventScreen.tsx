import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Alert, ScrollView, Share, Platform, Linking, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps'

import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Actions } from 'react-native-router-flux'

import Collapsible from 'react-native-collapsible'
import Constants from 'expo-constants';

import { HeaderBar, AssetImage, BottomButton, FollowButton, ImageSlider, VeilView } from '../Reusable'
import { Fire, Flash, Time, AppConfig, Popup, Loader } from '../../services'
import AntDesign from '@expo/vector-icons/AntDesign'
import Feather from '@expo/vector-icons/Feather'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import { switchTab } from '../../actions/tab.action'

import { mainStyle } from '../../styles'

interface Props {
  event: any;
  user: any;
  fireUser: any;

  switchTab: (tab: number) => void;
}

const EventScreen: React.FC<Props> = (props) => {
  
  React.useEffect(() => {
  }, [])

  const shareEvent = () => {
    Share.share({
      title: 'Oki',
      message: 'Hello\n',
    })
  }

  const { event } = props
  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <ScrollView>
        <Text>{event.name}</Text>
        <TouchableOpacity onPress={shareEvent}>
          <Text>Partager</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100,
  },

});


const mapStateToProps = (state: any) => ({
  user: state.authReducer.user,
  fireUser: state.authReducer.fireUser,
})
const mapDispatchToProps = (dispatch: any) => ({
  switchTab: (tab: number) => dispatch(switchTab(tab)),
})
export default connect(mapStateToProps, mapDispatchToProps)(EventScreen)
