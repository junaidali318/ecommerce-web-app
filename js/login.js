document.addEventListener('submit', (event) => {
    event.preventDefault();

    let inputValues = [];

    const formValues = document.querySelectorAll('form input');
    formValues.forEach((input) => {
        inputValues.push(input.value);
    })

    let [, email, password,] = inputValues;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            let userData = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get()
            userData
                .then(doc => {
                    // console.log(doc.data())
                    localStorage.setItem('currentUser', doc.data().fName)
                    localStorage.setItem('currentUserEmail', doc.data().email)
                })
                .then(() => location.assign('../pages/userDash.html'))
        })
        .catch(err => {
            alert(err.message)
            document.querySelector('form').reset();
        });
})