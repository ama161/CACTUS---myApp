import firebase from 'firebase';

export function login(email, password){
    return new Promise((resolve, reject) => {    
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) =>{
                resolve(user);
            })
            .catch((error) => {
                reject(error);
            });
        })
      
}