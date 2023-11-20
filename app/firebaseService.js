// firebaseService.js
import { getFirestore, collection, addDoc, Firestore } from 'firebase/firestore';
import firebaseapp from '../app/firebase'; // Import the initialized Firebase app

const db = getFirestore(firebaseapp);


export const addFinancialData = async (financialData) => {
  try {
    const docRef = await addDoc(collection(db, 'UserData'), financialData);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
    throw new Error('Error adding financial data to Firebase');
  }
};

export const queryUserData = async () => {
  try {
   
    const collectionRef = db.collection('UserData');

    
    const querySnapshot = await collectionRef.get();

    
    querySnapshot.forEach((doc) => {
      console.log('Document ID:', doc.id);
      console.log('Document Data:', doc.data());
    });
  } catch (error) {
    console.error('Error querying data:', error.message);
  }
};