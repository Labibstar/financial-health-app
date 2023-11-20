// firebaseService.js
import { getFirestore, collection, setDoc ,getDoc, doc } from 'firebase/firestore';
import firebaseapp from '../app/firebase'; // Import the initialized Firebase app

const db = getFirestore(firebaseapp);


export const addFinancialData = async (formData, month) => {
  try {
    const docRef = await setDoc(collection(db, 'UserData', {month}), formData);
    console.log('Document written with ID: ', docRef.id);
    
  } catch (e) {
    console.error('Error adding document: ', e);
    throw new Error('Error adding financial data to Firebase');
  }
};

export const queryUserData = async () => {

  var data;
  
  try {
   
    const docRef = doc(db, "UserData", "7gbU6NXQ7sbnI1JUWqMD");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      data = docSnap.data();
      console.log("Document data:", data.expenses);
      return(data)

    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    /*
    
    const querySnapshot = await collectionRef.get();

    
    querySnapshot.forEach((doc) => {
      console.log('Document ID:', doc.id);
      console.log('Document Data:', doc.data());
    }); */

  } catch (error) {
    console.error('Error querying data:', error.message);
  }

};