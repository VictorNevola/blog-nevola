import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/analytics';
const { REACT_APP_APIKEY, REACT_APP_AUTHDOMAIN, REACT_APP_DATABASEURL, REACT_APP_PROJECTID, REACT_APP_STORAGEBUCKET, REACT_APP_MESSAGINGSENDERID, REACT_APP_APPID, REACT_APP_MEASUREMENTID } = process.env;

let firebaseConfig = {
    apiKey: REACT_APP_APIKEY,
    authDomain: REACT_APP_AUTHDOMAIN,
    databaseURL: REACT_APP_DATABASEURL,
    projectId: REACT_APP_PROJECTID,
    storageBucket: REACT_APP_STORAGEBUCKET,
    messagingSenderId: REACT_APP_MESSAGINGSENDERID,
    appId: REACT_APP_APPID,
    measurementId: REACT_APP_MEASUREMENTID
};

class firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        app.analytics();
        this.app = app.database();
    };

    login(email, password) {
        return app.auth().signInWithEmailAndPassword(email, password)
    };

    async register(email, password) {
        return await app.auth().createUserWithEmailAndPassword(email, password)
    };

    async createUser(id, email, nome) {
        return await app.database().ref('usuarios').child(id).set({
            nome: nome,
            email: email
        });
    };

    registerWithGoogle() {
        // Using a popup.
        var provider = new app.auth.GoogleAuthProvider();
        return app.auth().signInWithPopup(provider);
    };

    userInitialized() {
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve);
        });
    };
};

export default new firebase();