document.addEventListener('submit', (event) => {
    event.preventDefault();

    let inputValues = [];

    const formValues = document.querySelectorAll('form input');
    formValues.forEach((input) => {
        inputValues.push(input.value);
    })

    let [, fName, email, password, cnfrmPass] = inputValues;

    if (password === cnfrmPass) {

        userObj = { fName, email, password }

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('SignUp SucessFull!')

                firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set(userObj)
                    .then(() => console.log('Database Updated sucessfully!'))
                    .then(() => document.querySelector('body > div > div > div:nth-child(2) > main > div > div > div > form').reset())
                    .then(() => location.assign('../pages/login.html'))
                    .catch(err => alert(err.message))

            })
            .catch(error => console.log(error.message));

    }
    else {
        alert('Password Doesnot Match')
    }
})