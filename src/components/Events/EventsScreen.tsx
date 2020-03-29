import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, FlatList, Share, Linking, Platform, TouchableOpacity, RefreshControl, SectionList, Dimensions } from 'react-native';

import { ifIphoneX } from 'react-native-iphone-x-helper'
import { HeaderBar, AssetImage, FadeInView, VeilView, BottomButton, LoadingView } from '../Reusable'

import EventItem from './EventItem'
import * as IntentLauncher from 'expo-intent-launcher';
import Constants from "expo-constants";

import { Actions } from 'react-native-router-flux'
import { Fire, Flash, AppConfig, Popup, Time } from '../../services'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import { loadUserNotifEnabled } from '../../actions/auth.action'
import { fetchEvents } from '../../actions/events.action'
import { switchTab } from '../../actions/tab.action'

import { mainStyle } from '../../styles'

const minimumPrice = 5

interface Props {

}
const EventsScreen: React.FC<Props> = (props) => {
  
  const [loading, setLoading] = React.useState(false)
  const events = useSelector(state => state.eventsReducer.list)
  const dispatch = useDispatch()

  const refresh = async () => {

    setLoading(true)
    try {
      await dispatch(fetchEvents())
    } catch (err) {
      console.log(err)
      Flash.error('Impossible de récup les events: ' + JSON.stringify(err))
    }
    setLoading(false)
  }
  React.useEffect(() => {
    refresh()
  }, [])

  const renderEvent = (item: any) => {
    return (
      <EventItem
        event={item}
        onPress={() => Actions.event({ event: item })}
        />
    )
  }

  const renderEmpty = () => {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTxt}>{ loading ? 'Chargement en cours... ' : 'Aucun évènement actuellement\nSoyez patient !'}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <HeaderBar
        titleView={
          <View style={{width: 120, flex: 1}}>
            <AssetImage src={require('../../images/logo.png')} />
          </View>
        }
        />

      <View style={styles.container}>
        { (loading) ? (
          <LoadingView
            title="Chargement des évènements..."
            />
        ) : (
          <FlatList
            initialNumToRender={3}
            removeClippedSubviews

            keyExtractor={(_, i) => i.toString()}
            data={events}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => renderEvent(item)}
            />
      )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#eee',
  },
});

export default EventsScreen