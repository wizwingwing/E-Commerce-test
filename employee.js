let Employee = document.querySelector('#Employee');
console.log(db.collection('employee').doc)

db.collection('employee').orderBy('position').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        // console.log(change);
        if (change.type == 'added'){
            renderEmployee(change.doc);
        } else if (change.type == 'removed'){
            let option = Employee.querySelector(`[data-id=${change.doc.id}]`);
            Employee.removeChild(option);
        }
    })
});

function renderEmployee(doc){
    let option = document.createElement('option');
    db.collection('employee').doc
    option.setAttribute('data-id', doc.id);
    option.textContent = doc.data().position;
    Employee.appendChild(option);
}
