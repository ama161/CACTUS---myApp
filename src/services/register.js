import firebase from 'firebase';
import {login} from './login'

export function register(email, password){
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                resolve(login(email, password));
            })
            .catch((error) => {
                reject(error.message);            
            });
    })
    
}