import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Icon from '@expo/vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux'

import { Fire, Popup, Loader } from '../../services'
import { mainStyle } from '../../styles'

interface Props {
  active: boolean;
  user: any;
  fireUser: any;

  onPress: () => void;
}
const FollowButton: React.FC<Props> = (props) => {

  const pressed = async () => {
    if (!props.fireUser) {
      Popup.info({
        title: 'Inscription',
        message: 'Connectez-vous pour suivre votre asso préférée !',
        continueTitle: "Me connecter",
        onContinue: () => {
          Actions.landing()
        }
      })
    } else if (!Fire.isUserVerified()) {

      Loader.show('Chargement...')
      try {
        await Fire.confirmEmail()
        props.onPress()
      } catch (err) {
        Popup.info({
          title: 'Une dernière étape',
          message: 'Vous devez valider votre compte en cliquant sur le mail que nous vous avons envoyé (' + props.fireUser.email + ')',
          continueTitle: 'Renvoyer',
          onContinue: async () => {
            await Fire.resendMail()
            Flash.show('Email envoyé !')
          }
        })
      }
      Loader.hide()
    } else {
      props.onPress()
    }
  }

  return (
    <TouchableOpacity
      style={[styles.container, props.active ? styles.following : {}]}
      onPress={() => pressed()}
      >
      <Text style={styles.followTxt}>{(!props.active ? "Follow" : "Unfollow").toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 6,
    backgroundColor: mainStyle.themeGradient.start,
  },
  following: {
    backgroundColor: mainStyle.themeGradient.end,
  },
  followTxt: {
    ...mainStyle.montBold,
    fontSize: 11,
    color: '#fff',
    textAlign: 'center',
  },
});

const mapStateToProps = (state: any) => ({
  user: state.authReducer.user,
  fireUser: state.authReducer.fireUser,
})
const mapDispatchToProps = (dispatch: any) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton)
