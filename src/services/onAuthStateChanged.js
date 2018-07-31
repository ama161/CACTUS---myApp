import firebase from 'firebase';

export function onAuthStateChanged(){
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // firebase.database().ref('/users/' + user.uid).once('value').then((snapshot)=>{
                //     console.log(snapshot.val());
                // });
                resolve(user);

            } else {
                console.log("no usuario activo");
                reject();
            }
          });
    })
}