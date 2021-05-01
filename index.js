let userList = document.querySelector('#userList');
let form = document.querySelector('#addUser');

function renderUser(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let del = document.createElement('div');
    del.className = 'del';

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;

    del.textContent = 'X';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(del);

    userList.appendChild(li);

    // Delete Data
    del.addEventListener('click', (e) => {
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('users').doc(id).delete();
    })
}

// db.collection('users').get().then(user => {
//     user.docs.forEach(doc => {
//         console.log(doc.data());
//         renderUser(doc);
//     })
// });

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('users').add({
        name: form.name.value,
        city: form.city.value
    })
    form.name.value = '';
    form.city.value = '';
})

// Real-Time Database
db.collection('users').orderBy('name').onSnapshot(snapshot =>{
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            // console.log(change);
            if (change.type == 'added'){
                renderUser(change.doc);
            } else if (change.type == 'removed'){
                let li = userList.querySelector(`[data-id=${change.doc.id}]`);
                userList.removeChild(li);
            }
        })
    });