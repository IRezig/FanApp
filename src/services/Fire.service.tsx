import * as firebase from 'firebase';

import 'firebase/app'
import 'firebase/firestore';
import 'firebase/functions'
import 'firebase/storage'

import AppConfig from './AppConfig.service'

export default class Fire {

  // Initialize Firebase
  static init() {
    if (!firebase.apps || !firebase.apps.length)
      firebase.initializeApp(AppConfig.get().firebaseOptions);
  }

  // Retrieve base firestore
  static store() {
    return firebase.firestore()
  }

  // Retrieve base auth
  static auth() {
    return firebase.auth()
  }

  // Retrieve base storage
  static storage() {
    return firebase.storage()
  }

  // Is email-logged user
  static isPasswordUser() {
    const user = Fire.auth().currentUser
    if (!user)
      return false
    return (user.providerData &&
      user.providerData.length > 0 &&
      user.providerData[0].providerId === 'password')
  }

  // Is verified
  static isUserVerified() {
    const user = Fire.auth().currentUser
    if (!user)
      return false
    return !(user.providerData &&
      user.providerData.length > 0 &&
      user.providerData[0].providerId === 'password' &&
      !user.emailVerified)
  }

  static async reauthEmail(email: string, password: string) {
    const user = Fire.auth().currentUser
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return user.reauthenticateWithCredential(credential)
  }

  static async confirmEmail() {
    const user = Fire.auth().currentUser
    try {
      await user.reload()
      const reloaded = Fire.auth().currentUser
      if (!reloaded.emailVerified)
        throw 'not verified'
    } catch (err) {
      throw 'could not reload'
    }
  }

  static async resendMail() {
    const user = Fire.auth().currentUser
    if (!user || this.isUserVerified())
      return false
    await user.sendEmailVerification().catch((err) => console.log(err))
    return true
  }
  
  // Sign in using google token
  static signInGoogle(token: any) {
    const credential = firebase.auth.GoogleAuthProvider.credential(token);
    return firebase.auth().signInWithCredential(credential)
  }


  // Retrieve base functions
  static async cloud(name: string, data: any) {
    const callable = firebase.functions().httpsCallable(name)
    const res = await callable(data)
    return res.data
  }

  // Increment a field
  static increment(nb: number) {
    return firebase.firestore.FieldValue.increment(nb);
  }

  // Upload a file to Storage
  static async uploadFile(location: string, uri: string) {
    // Retrieve Blob
    const res = await fetch(uri)
    const blob = await res.blob()
    // Send it to Firebase Storage
    const store = Fire.storage().ref()
    const ref = store.child(location)
    const uploaded = await ref.put(blob)
    // Retrieve persistent URL
    return await uploaded.ref.getDownloadURL()
  }

  // Shortcuts

  static async get(ref: any) {
    const doc = await ref.get()
    if (doc.exists) {
      return {
        id: doc.id,
        ...doc.data()
      }
    }
    return null
  }

  static async list(ref: firebase.firestore.Query): Promise<any> {
    const snap = await ref.get({source: 'server'})
    const array: any[] = []
    snap.forEach((doc: any) => {
      if (doc.exists) {
        array.push({
          id: doc.id,
          ...doc.data(),
        })
      }
    })
    return array
  }

  // Dates

  // Retrieve timestamp for given date (for test purpopses only)
  static getTimeFor(date: Date) {
    return firebase.firestore.Timestamp.fromDate(date)
  }

  // Retrieve date from timestamp
  static getDateFor(timestamp: firebase.firestore.Timestamp){
    const tmp = new firebase.firestore.Timestamp(timestamp.seconds, timestamp.nanoseconds)
    return tmp.toDate()
  }
}