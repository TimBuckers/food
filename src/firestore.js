import firebase from 'firebase/app'
import 'firebase/firestore'
firebase.initializeApp({
    projectId: 'march-food',
    databaseURL: 'https://march-food.firebaseio.com',
})
const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })
export const db = firestore