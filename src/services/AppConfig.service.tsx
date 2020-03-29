import Constants from 'expo-constants'

type Environment = {
  firebaseOptions: any;
}

type Environments = {
  dev: Environment,
  prod: Environment;
}

export default class AppConfig {

  // Default tab for the main Tab Bar
  static defaultTab: number = 0

  // Facebook Id
  static facebookId: string = '756591474776473'

  // App Store Id
  static appStoreId: string = 'https://apps.apple.com/us/app/pop-out-soir%C3%A9es-%C3%A9tudiantes/id1482498442?l=fr&ls=1'

  // Google Store Id
  static googleStoreId: string = 'https://play.google.com/store/apps/details?id=com.popout.app'

  // Universal Store Id
  static universalStoreId: string = 'http://popout.app.link/flVlcVTTK0'

  // CGU's URL
  static cguURL: string = 'https://firebasestorage.googleapis.com/v0/b/popout-c514d.appspot.com/o/Copie_de_CGU_POP_OUT_NOV_2019.docx?alt=media&token=d2c614a6-991e-4da9-af9e-7b4f8aec0fa0'

  // Insta URL
  static instaURL: string = 'https://www.instagram.com/popoutapp/'

  // FB URL
  static fbURL: string = 'https://www.facebook.com/PopOutParis/'

  /**
   * Environment related configuration
   */

  static envs: Environments = {
    // Development configuration
    dev: {
      firebaseOptions: {
        apiKey: "AIzaSyAY97nHcUeTV--ZOGyFpB9TXqmQPhepnO0",
        authDomain: "fan-app-dev.firebaseapp.com",
        databaseURL: "https://fan-app-dev.firebaseio.com",
        projectId: "fan-app-dev",
        storageBucket: "fan-app-dev.appspot.com",
        messagingSenderId: "900781593527",
        appId: "1:900781593527:web:62753a9b2bb3d4ec388e32",
        measurementId: "G-FYBRH8V3FX"
      },
    },
    // Production configuration
    prod: {
      firebaseOptions: {
        apiKey: "AIzaSyAY97nHcUeTV--ZOGyFpB9TXqmQPhepnO0",
        authDomain: "fan-app-dev.firebaseapp.com",
        databaseURL: "https://fan-app-dev.firebaseio.com",
        projectId: "fan-app-dev",
        storageBucket: "fan-app-dev.appspot.com",
        messagingSenderId: "900781593527",
        appId: "1:900781593527:web:62753a9b2bb3d4ec388e32",
        measurementId: "G-FYBRH8V3FX"
      }
    }
  }
  
  static get(): Environment {
    //return this.envs.prod
    if (Constants &&
        Constants.manifest &&
        Constants.manifest.releaseChannel === 'prod')
      return this.envs.prod
    return this.envs.dev
  }

  static isProd() {
    return (Constants && Constants.manifest && Constants.manifest.releaseChannel === 'prod')
  }

}