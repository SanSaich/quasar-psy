import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBTskRmWsIfHcZbxNMcP8Th4WvMrsS9BQg',
    authDomain: 'quasar-psy.firebaseapp.com',
    databaseURL: 'https://quasar-psy-default-rtdb.firebaseio.com',
    projectId: 'quasar-psy',
    storageBucket: 'quasar-psy.appspot.com',
    messagingSenderId: '388792681542',
    appId: '1:388792681542:web:81002688fa4d096d85f647',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
