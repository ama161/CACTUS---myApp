import firebase from 'firebase';

export function getReserve(){
    var userId = firebase.auth().currentUser.uid;

    return new Promise((resolve, reject) => {    
        firebase.database().ref('/users-reserve/' + userId).once('value')
            .then((snapshot) => {
                resolve(snapshot.val());
            })
            .catch((error) => {
            });
        })
}