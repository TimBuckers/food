import firebase from 'firebase/app'
import 'firebase/firestore'
firebase.initializeApp({
    projectId: 'march-food',
    databaseURL: '"https://march-food.firebaseio.com"'
})
export const db = firebase.firestore()