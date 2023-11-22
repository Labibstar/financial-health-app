// firebaseService.js
import { getFirestore, collection, setDoc ,getDocs, doc } from 'firebase/firestore';
import firebaseapp from '../app/firebase'; // Import the initialized Firebase app

const db = getFirestore(firebaseapp);


export const addFinancialData = async (formData, month) => {
  try {
    const docRef = await setDoc(doc(db, 'UserData', month), formData);
    //console.log('Document written with ID: ', docRef.id);
    
  } catch (e) {
    console.error('Error adding document: ', e);
    throw new Error('Error adding financial data to Firebase');
  }
};

export const queryUserData = async () => {

  var data=[];
  var month;

  try {
       
    const collectionRef = collection(db, "UserData");

    const querySnapshot = await getDocs(collectionRef);

    
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
      console.log('Document ID:', doc.id);
      console.log('Document Data:', data[0]);

    }); 
    return(data);
  } catch (error) {
    console.error('Error querying data:', error.message);
  }

};