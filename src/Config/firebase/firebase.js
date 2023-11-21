import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import swal from "sweetalert";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,serverTimestamp,query,where,onSnapshot
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import { initializeApp } from "firebase/app";

  const firebaseConfig = {
    apiKey: "AIzaSyCkOaafmzhKaSSpY2Kgy2_FSqThqDjRY6Q",
    authDomain: "authentication-247ce.firebaseapp.com",
    databaseURL: "https://authentication-247ce-default-rtdb.firebaseio.com",
    projectId: "authentication-247ce",
    storageBucket: "authentication-247ce.appspot.com",
    messagingSenderId: "1066835457540",
    appId: "1:1066835457540:web:62c4a8ff35ee65fdb8a751",
    measurementId: "G-SHP1Z40XXW"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);




async function SignupFirebase(userInfo) {
  const { email, password } = userInfo
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)

  await addUserToDB(userInfo, userCredential.user.uid)

}

const signInGoogle = async () => {
    try {
      var provider = new GoogleAuthProvider();
      const result = await auth;
      await signInWithPopup(auth, provider);
    //   await addUserToDB();
       alert ("suusesfull")
    } catch (e) {
      console.log(e.message);
    }
  };
  console.log(auth);

  function signinFirebase(loginEmail, loginPassword) {
    return signInWithEmailAndPassword(auth, loginEmail, loginPassword)

}

  const addUserToDB = async () => {
    const uid = auth.currentUser.uid;
    var userProfile = { email: "", name: "", photoURL: "" };
    userProfile.email = auth.currentUser.email;
    userProfile.name = auth.currentUser.displayName;
    userProfile.photoURL = auth.currentUser.photoURL;
  
    return setDoc(doc(db, "users", uid), userProfile);
  };

  function keeploggined() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log("User is loggined");
        } else {
            console.log("User is signed out");
        }
    });
}




keeploggined()

  export {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,auth,addUserToDB,
    SignupFirebase,
    swal,   
    signinFirebase,
    keeploggined,
  createUserWithEmailAndPassword,
doc,setDoc,collection,getDocs,db,
storage,ref,uploadBytes,getDownloadURL,
updateDoc,deleteDoc,getDoc,
addDoc,serverTimestamp,query,where,onSnapshot
}  



























// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {
//     // Allow read and write access to authenticated users for all documents
//     match /{document=**} {
//       allow read, write: if request.auth != null;
//     }
//   }
// }