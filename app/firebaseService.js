// firebaseService.js
import { getFirestore, collection, addDoc } from 'firebase/firestore';
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
