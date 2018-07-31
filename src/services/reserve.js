import firebase from 'firebase';
import {onAuthStateChanged} from './onAuthStateChanged';

export function newReserve(reserve){
    return new Promise((resolve, reject) => {    
        if(firebase.auth().currentUser){
            var userId = firebase.auth().currentUser.uid;
            
            let newPostKey = firebase.database().ref().child('reserve').push().key;
        
            let postData = {
                id: newPostKey,
                userId: userId,
                name: reserve.name,
                email: reserve.email,
                phone: reserve.phone,
                diners: reserve.diners,
                date: reserve.date,
                time: reserve.time,
                status: 'pending'
            }
        
            var updates = {};
            updates['/reserve/' + newPostKey] = postData;
            updates['/status-reserve/pending/' + newPostKey] = postData;
            updates['/users-reserve/' + userId + '/' + newPostKey] = postData;
            
            firebase.database().ref().update(updates);
            resolve(true);
        }
        else{
            resolve(false);
        }
    });
}

export function getAll(){
    if(firebase.auth().currentUser){
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
}

export function getById(id){
    var userId = firebase.auth().currentUser.uid;

    return new Promise((resolve, reject) => {    
        firebase.database().ref('/users-reserve/' + userId + '/' + id).once('value')
            .then((snapshot) => {
                resolve(snapshot.val());
            })
            .catch((error) => {
            });
        })
}

export function edit(reserve, idReserve){
    var userId = firebase.auth().currentUser.uid;
    
    let postData = {
        id: idReserve,
        userId: userId,
        name: reserve.name,
        email: reserve.email,
        phone: reserve.phone,
        diners: reserve.diners,
        date: reserve.date,
        time: reserve.time,
        status: 'pending'
    }
    
    var updates = {};
    updates['/reserve/' + idReserve] = postData;
    updates['/status-reserve/pending/' + idReserve] = postData;    
    updates['/users-reserve/' + userId + '/' + idReserve] = postData;
    
    return firebase.database().ref().update(updates);
}

export function cancelReserve(idReserve){
    var userId = firebase.auth().currentUser.uid;

    if(userId){
        
        var updates = {};
        updates['/reserve/' + idReserve + '/status/'] = 'canceled';
        updates['/users-reserve/' + userId + '/' + idReserve + '/status/'] = 'canceled';        
        
        getById(idReserve)
        .then(reserve => {
            let status = reserve.status;
            updates['/status-reserve/canceled/' + idReserve] = reserve;    

            firebase.database().ref('/status-reserve/'+ status +'/' + idReserve).remove();
            
            return firebase.database().ref().update(updates);
        })
        
    }
}