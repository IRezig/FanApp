import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, InteractionManager, Image, Platform, TouchableOpacity, ScrollView, StatusBar, Dimensions } from 'react-native';

import SearchScreen from '../Search/SearchScreen'
import EventsScreen from '../Events/EventsScreen'
import DiscountsScreen from '../Discounts/DiscountsScreen'
import ProfileScreen from '../Profile/ProfileScreen'
import ShopScreen from '../Shop/ShopScreen'

import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Actions } from 'react-native-router-flux'
import { Fire, AppConfig, Flash, Popup, Loader, Time } from '../../services'
import { Notifications } from 'expo';
import { BlurView } from 'expo-blur';

import Icon from '@expo/vector-icons/FontAwesome'
import AntIcon from '@expo/vector-icons/AntDesign'

import { switchTab } from '../../actions/tab.action'
import { autologin, finishLogin } from '../../actions/auth.action'
import { fetchEvents } from '../../actions/events.action'

import { NotifBubble, AssetImage } from '../Reusable'
import { mainStyle } from '../../styles'

const tabIconSize = 20
const tabColor = '#555'
const tabActiveColor = mainStyle.themeColor
const routes = [
  {
    component: EventsScreen,
    renderIcon: (active: boolean) => (
      <AntIcon name="calendar" size={tabIconSize} color={active ? tabActiveColor : tabColor} />
    )
  },
]

interface Props {
  user: any;
  fireUser: any;
  tab: number;

  autologin: (user: any) => void;
  switchTab: (idx: number) => void;
  finishLogin: () => void;
}
const TabsScreen: React.FC<Props> = (props) => {

  React.useEffect(() => {
    Loader.hide()

    Fire.auth().onAuthStateChanged(async (user: any) => {
      if (user) {
        props.autologin(user)
        savePushToken(user.uid)

        props.finishLogin()
      } else {
        props.autologin(user)
      }

    });

    const listener = Notifications.addListener(_handleNotification);
    return () => {
      if (listener)
        listener.remove()
    }
  }, [])

  const savePushToken = async (userId: string) => {
    try {
      const token = await Notifications.getExpoPushTokenAsync();
      await Fire.store().collection('tokens').doc(userId).set({
        token: token,
        createdAt: new Date()
      })
    } catch (err) {
      //Flash.error(err)
    }
  }

  const _handleNotification = async (notification: any) => {
    const data = notification.data
    if (data.discountId) {
      const ref = Fire.store().collection('discounts').doc(data.discountId)
      const discount = await Fire.get(ref)
      if (discount)
        Actions.discount({ discount: discount })
      props.switchTab(2)
    } else if (data.eventId) {
      const ref = Fire.store().collection('events').doc(data.eventId)
      const event = await Fire.get(ref)
      if (event)
        Actions.event({ event: event })
    }
    
    if (data.notifId) {
      const id: string = notification.data.notifId
      try { 
        await Fire.cloud("tappedNotif", { notifId: id })
      } catch (err) { }
    }
  };

  const selectTab = async (index: number) => {
    props.switchTab(index)   
  }

  const renderRoute = (item: any, index: number) => {
    const Route = item.component
    const isCurrent = props.tab == index
    return (
      <View key={index} style={{flex: 1, ...mainStyle.abs, opacity: isCurrent ? 1 : 0}} pointerEvents={isCurrent ? 'auto': 'none'}>
        <Route />
      </View>
    )
  }
  
  const renderTabBarItem = (item: any, index: number) => {
    const isSelected = props.tab == index
    return (
      <TouchableOpacity key={index} style={{backgroundColor:'rgba(0, 0, 0, 0)'}} onPress={() => selectTab(index)}>
        <View style={[styles.tab, isSelected ? {backgroundColor: 'transparent'} : {}]}>
          {item.renderIcon(isSelected)}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />

      {/* Content */}
      <View style={styles.content}>
        {routes.map((item, index) => renderRoute(item, index))}
      </View>
    
      {/* TabBar */}
      <BlurView tint="light" intensity={88} style={styles.tabs}>
        { routes.map((item, index) => renderTabBarItem(item, index))}
      </BlurView>
    </View>
  );
}

const barSize = mainStyle.mainTabContent

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageWrapper: {
    minWidth: Dimensions.get('window').width,
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },

  tabs: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...ifIphoneX({
      height: barSize.paddingBottom,
    }, {
      height: barSize.paddingBottom,
    }),
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ede',

    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    width: Dimensions.get('window').width / routes.length,
    justifyContent: 'center',
    alignItems: 'center',
    ...ifIphoneX({
      paddingBottom: 15,
    }, {
      paddingBottom: 0,
    })
  },
  tabTxt: {
    textAlign: 'center',
  }
});


const mapStateToProps = (state: any) => ({
  fireUser: state.authReducer.fireUser,
  user: state.authReducer.user,
  tab: state.tabReducer.tab,
})
const mapDispatchToProps = (dispatch: any) => ({
  switchTab: (tab: number) => dispatch(switchTab(tab)),
  autologin: (user: any) => dispatch(autologin(user)),
  finishLogin: () => dispatch(finishLogin()),
  fetchEvents: () => dispatch(fetchEvents()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TabsScreen)
