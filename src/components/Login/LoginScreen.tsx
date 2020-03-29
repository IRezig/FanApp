import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Linking, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native';

import { HeaderBar, TitledInput, BottomButton, CheckBox } from '../Reusable'
import { Fire, Flash, Loader, AppConfig } from '../../services'
import { Actions } from 'react-native-router-flux'

import Icon from '@expo/vector-icons/FontAwesome'

import { saveName } from '../../actions/auth.action'
import { mainStyle } from '../../styles'

const maxTitle = 60
const maxDescription = 255

interface Props {

  saveName: (name: any) => void;
}
interface State {
  user: any;
  registering: boolean;
  accepted: boolean;
  forgotten: boolean;
  sending: boolean;
}

class LoginScreen extends React.Component<Props, State>  {
  
  state = {
    user: {
      email: !AppConfig.isProd() ? 'julien.brunet.92@gmail.com' : '',
      emailConfirm: '',
      password: !AppConfig.isProd() ? 'coucou123' : '',
      confirm: '',
      first_name: '',
      last_name: '',
    },
    accepted: false,
    registering: false,
    forgotten: false,
    sending: false,
  }

  onChange(key: string, value: string) {
    const { user } = this.state
    user[key] = value
    this.setState({ user })
  }

  async proceed() {
    const { user, registering, accepted } = this.state

    const email = user.email
    const password = user.password

    if (registering) {

      if (user.email == '' || user.emailConfirm == '' ||
        user.password == '' || user.confirm == '' ||
        user.first_name == '' || user.last_name == '') {
        Flash.error("Veuillez remplir tous les champs SVP")
        return
      }
      if (user.email !== user.emailConfirm) {
        Flash.error("Les emails ne correspondent pas")
        return;
      } else if (user.password !== user.confirm) {
        Flash.error("Les mot de passes ne correspondent pas")
        return;
      }

      if (!accepted) {
        Flash.error("Vous devez accepter nos conditions d'utilisation pour poursuivre")
        return;
      }
    } else {
      if (user.email == '' || user.password == '') {
        Flash.error("Veuillez remplir tous les champs SVP")
        return
      }
    }

    Loader.show(registering ? 'Inscription...' : 'Connexion...')
    try {
      if (registering) {
        this.props.saveName({
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name
        })
        await Fire.auth().createUserWithEmailAndPassword(email, password)
      } else {
        await Fire.auth().signInWithEmailAndPassword(email, password)
      }
      Actions.popTo('tabs')
    } catch (err){
      switch (err.code) {
        case "auth/invalid-email":
          Flash.error('Le mail entré est invalide')
          break;

        case "auth/user-not-found":
          Flash.error("Cet utilisateur n'existe pas")
          break;
        
        case "auth/wrong-password":
          Flash.error('Mot de passe incorrect')
          break;

        case "auth/email-already-in-use":
          Flash.error('Le mail entré est déjà utilisé')
          break;

        case "auth/weak-password":
          Flash.error('Le mot de passe est trop faible (6 minimum)')
          break;

        default:
          Flash.error('Vérifiez votre connexion internet')
          break;
      }
    }
    Loader.hide()
  }

  showConditions() {
    Linking.openURL(AppConfig.cguURL)
  }

  async forgotPassword() {
    const { user } = this.state
    this.setState({ sending: true })
    try {
      await Fire.auth().sendPasswordResetEmail(user.email)
      Flash.show('Mail envoyé à ' + user.email)
      this.setState({ forgotten: false })
    } catch (err) {
      Flash.error('Mail entré incorrect')
    }
    this.setState({ sending: false })
  }

  render() {
    const { user, sending, registering, forgotten } = this.state
    return (
      <View style={styles.container}>
        <HeaderBar
          title='Connexion'
          back
          />
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
        <ScrollView>
          <TitledInput
            title={'E-mail'}
            value={user.email}
            placeholder='exemple@popout.fr'
            maxLength={maxTitle}
            autocorrect={false}

            onChange={({ nativeEvent }) => this.onChange('email', nativeEvent.text)}
            />

          { registering &&
            <TitledInput
              title={"Confirmez l'adresse E-mail"}
              value={user.emailConfirm}
              placeholder='exemple@popout.fr'
              maxLength={maxTitle}
              autocorrect={false}

              onChange={({ nativeEvent }) => this.onChange('emailConfirm', nativeEvent.text)}
              />
          }

          { !forgotten &&
            <TitledInput
              secure
              title={'Mot de passe'}
              value={user.password}
              placeholder='**********'
              maxLength={maxTitle}
              autocorrect={false}

              onChange={({ nativeEvent }) => this.onChange('password', nativeEvent.text)}
              />
          }

          { registering &&
            <View>
              <TitledInput
                secure
                title={'Confirmez le Mot de passe'}
                value={user.confirm}
                placeholder='**********'
                maxLength={maxTitle}
                autocorrect={false}

                onChange={({ nativeEvent }) => this.onChange('confirm', nativeEvent.text)}
                />
              <TitledInput
                title={'Prénom'}
                value={user.first_name}
                placeholder='ex: Marie'
                maxLength={maxTitle}
                autocorrect={false}

                onChange={({ nativeEvent }) => this.onChange('first_name', nativeEvent.text)}
                />
              <TitledInput
                title={'Nom'}
                value={user.last_name}
                placeholder='ex: Dupont'
                maxLength={maxTitle}
                autocorrect={false}

                onChange={({ nativeEvent }) => this.onChange('last_name', nativeEvent.text)}
                />
              <CheckBox
                active={this.state.accepted}
                title={"Vous assurez avoir plus de 18 ans et vous autorisez Pop Out à vous proposer des offres promotionnelles pour étudiants.\nJe reconnais avoir lu et compris les CGU\nCliquez ici pour voir nos conditions d'utilisation"}
                onPress={() => this.setState({ accepted: !this.state.accepted })}
                onTapText={() => this.showConditions()}
                />
             </View>
           }

          <View style={styles.switcher}>
            { !forgotten &&
              <TouchableOpacity onPress={() => this.setState({registering: !registering})}>
                <Text style={styles.switcherTxt}>{registering ? 'Vous avez déjà un compte ?' : 'Pas encore inscrit ?'}</Text>
              </TouchableOpacity>
            }
            { !registering &&
              <TouchableOpacity style={{marginTop: 20}} onPress={() => this.setState({ forgotten: !forgotten })}>
                <Text style={styles.switcherTxt}>{forgotten ? 'Je connais mon mot de passe' : 'Mot de passe oublié ?'}</Text>
              </TouchableOpacity>
            }
          </View>


          { !forgotten ? (
            <BottomButton
              style={{marginTop: 40}}
              title={registering ? 'M\'inscrire' : 'Me connecter'}
              backgroundColor={mainStyle.themeColor}

              onPress={() => this.proceed()}
              />
          ) : (
            <BottomButton
              style={{marginTop: 40}}
              title={sending ? 'Envoi...' : 'Changer mon mot de passe'}
              backgroundColor={mainStyle.themeColor}

              onPress={() => this.forgotPassword()}
              />
          )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  switcher: {
    marginTop: 20,
    marginLeft: 20,
  },
  switcherTxt: {
    color: 'rgb(100, 100, 222)'
  }
});

const mapStateToProps = (state: any) => ({

})
const mapDispatchToProps = (dispatch: any) => ({
  saveName: (name: any) => dispatch(saveName(name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
