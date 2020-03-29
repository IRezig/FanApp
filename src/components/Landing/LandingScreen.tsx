import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity, Linking, StatusBar, Dimensions } from 'react-native';

import { ifIphoneX } from 'react-native-iphone-x-helper'
import Icon from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { AssetImage, VeilView } from '../Reusable'
import { Fire, Flash, AppConfig, Cache } from '../../services'
import { Actions } from 'react-native-router-flux'

import { saveName } from '../../actions/auth.action'

import { mainStyle } from '../../styles'

interface Props {
  saveName: (name: any) => void;
}
interface State {
  editing: boolean;
}
class LandingScreen extends React.Component<Props, State>  {
  
  state = {
    editing: false,
  }

  componentDidMount() {
    Cache.clear();
    //setTimeout(Actions.login, 200)
  }

  skip() {
    Actions.pop()
  }

  showConditions() {
    Linking.openURL(AppConfig.cguURL)
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <AssetImage style={styles.background} src={require('../../images/bg-landing.jpg')} resizeMode='cover' />
        <VeilView abs start={'rgba(0, 0, 0, 0.31)'} end={'rgba(0, 0, 0, 0.46)'} />

        <View style={styles.logoWrapper}>
          <View style={styles.logo}>
            <AssetImage src={require('../../images/logo.png')} />
          </View>
        </View>

        <TouchableOpacity style={styles.skip} onPress={() => this.skip()}>
          <Text style={styles.skipTxt}>PASSER <AntDesign name="right" /></Text>
        </TouchableOpacity>

        <View style={styles.floatingBottom}>

          <View style={styles.intro}>
            <Text style={styles.introTxt}>
              Sortez{'\n'}
              Vivez,{'\n'}
              Partagez.
            </Text>
            <Text style={styles.introEndTxt}>Par les étudiants, pour les étudiants !</Text>
          </View>

          <View style={styles.btns}>

            {/*}
            <TouchableOpacity style={{marginTop: 0}} onPress={() => this.facebookLogin()}>
              <View style={[styles.btn, {backgroundColor: '#3C5A99'}]}>
                <View style={styles.floating}>
                  <View style={styles.fbIcon}>
                    <Icon name='facebook' color={'#3C5A99'} size={22} />
                  </View>
                </View>
                <Text style={[styles.txt, {marginLeft: 20, color: '#fff'}]}>{'Connexion Facebook'.toUpperCase()}</Text>
              </View>
            </TouchableOpacity>
            */}

            <TouchableOpacity style={{marginTop: 20}} onPress={Actions.login}>
              <View style={[styles.btn, {backgroundColor: '#fff'}]}>
                <Text style={styles.txt}>{'Connexion par email'.toUpperCase()}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.showConditions()}>
              <Text style={styles.rgpd}>En continuant, vous assurez avoir lu nos conditions d'utilisations générales. Cliquez ici pour voir nos CGUs</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const margin = 30
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d47',
  },
  background: {
    position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
  },
  skip: {
    position: 'absolute',
    top: 30,
    right: 14,
    padding: 6,
  },
  skipTxt: {
    ...mainStyle.montBold,
    fontSize: 13,
    color: '#fff',
  },
  logoWrapper: {
    ...ifIphoneX({
      marginTop: 80,
    }, {
      marginTop: 50,
    }),
    alignItems: 'center'
  },
  logo: {
    ...ifIphoneX({
      width: 280,
      height: 100,
    }, {
      width: 260,
      height: 90,
    }),
    
  },
  slogan: {
    ...mainStyle.montBold,
    fontSize: 21,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 32,
  },

  intro: {
    marginBottom: 30,
    marginLeft: margin,
  },
  introTxt: {
    ...mainStyle.montBold,
    fontSize: 36,
    color: '#fff',
  },
  introEndTxt: {
    ...mainStyle.montLight,
    marginTop: 10,
    paddingRight: 10,
    fontSize: 24,
    fontStyle: 'italic',
    color: '#fff',
  },

  floatingBottom: {
    position: 'absolute', left: 0, right: 0,
    ...ifIphoneX({
      bottom: 44
    }, {
      bottom: 26
    })
  },

  btns: {
    alignItems: 'center'
  },

  btn: {
    width: Dimensions.get('window').width - (margin * 2),
    height: 52,
    borderRadius: 26,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  txt: {
    ...mainStyle.montBold,
    fontSize: 12,
  },

  floating: {
    position: 'absolute', top: 0, bottom: 0, left: 6,
    justifyContent: 'center',
  },
  fbIcon: {
    backgroundColor: '#fff',
    ...mainStyle.circle(36),
    marginLeft: 2,

    justifyContent: 'center',
    alignItems: 'center',
  },

  rgpd: {
    ...mainStyle.montLight,
    fontSize: 11,
    color: mainStyle.lightColor,
    paddingHorizontal: 18,
    textAlign: 'center',
    marginTop: 16,
  }
});

const mapStateToProps = (state: any) => ({

})
const mapDispatchToProps = (dispatch: any) => ({
  saveName: (name: any) => dispatch(saveName(name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen)
