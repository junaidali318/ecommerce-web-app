let topNav = document.querySelector('body > div.container-fluid > div > div:nth-child(1) > header > div.col-12.bg-dark.py-2.d-md-block.d-none > div > div:nth-child(2) > ul');
let currentUser = localStorage.getItem('currentUser');
let html = `
        <li>
            <a href="./profile.html"><i class="fas fa-user-edit mr-2"></i>${currentUser}</a>
        </li>
        <li>
            <a href=#><i class="fas fa-sign-in-alt mr-2"></i>Logout</a>
        </li>
        `
if (localStorage.getItem('currentUser') != null) {
    topNav.innerHTML = html;
}
else {
    topNav.innerHTML =
        `
    <li>
        <a href="register.html"><i class="fas fa-user-edit mr-2"></i>Register</a>
    </li>
    <li>
        <a href="login.html"><i class="fas fa-sign-in-alt mr-2"></i>Login</a>
    </li>
    `
}

let logoutBtn = document.querySelector('body > div.container-fluid > div > div:nth-child(1) > header > div.col-12.bg-dark.py-2.d-md-block.d-none > div > div:nth-child(2) > ul > li:nth-child(2) > a');
logoutBtn.addEventListener('click', () => {
    firebase.auth().signOut()
        .then(() => localStorage.clear())
        .then(() => location.assign('../index.html'))
        .catch(error => alert(error.message));
})

let searchBar = document.querySelector('div.input-group input');
searchBar.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();
    const products = document.querySelectorAll('.product-name');
    Array.from(products).forEach(product => {
        const title = product.textContent
        if (title.toLowerCase().indexOf(e.target.value) != -1) {
            product.parentElement.parentElement.parentElement.style.display = 'block'
        } else {
            product.parentElement.parentElement.parentElement.style.display = 'none'
        }
    })
});

window.addEventListener('load', () => {

    const productList = document.querySelector('body > div > div > div:nth-child(2) > main > div:nth-child(1) > div > div > div.row.list')

    const addProduct = product => {
        let html =
            `
        <div class="col-xl-2 col-lg-3 col-sm-6 my-3">
            <div class="col-12 bg-white text-center h-100 product-item">
                <div class="row h-100">
                    <div class="col-12 p-0 mb-3">
                        <a href="product.html">
                            <img src="../images/image-1.jpg" class="img-fluid">
                        </a>
                    </div>
                    <div class="col-12 mb-3">
                        <a href="product.html" class="product-name">${product.productName}</a>
                    </div>
                    <div class="col-12 mb-3">
                        <span class="product-price">
                            $${product.productPrice}
                        </span>
                    </div>
                    <div class="col-12 mb-3 align-self-end">
                        <button class="btn btn-outline-dark add-to-cart" type="button"><iclass="fas fa-cart-plus mr-2"></i>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
        `

        if (productList)
            productList.innerHTML += html;
    }

    firebase.firestore().collection('products').get().then(snapshot => {
        snapshot.docs.forEach(doc => addProduct(doc.data()))
    })

    const checkoutPrice = document.querySelector('body > div > div > div:nth-child(2) > main > div.col-12.bg-white.py-3.my-3 > div > div.col-lg-2.col-md-3.text-center > div > div > div:nth-child(1) > span.detail-price')
    // console.log(checkoutPrice.textContent)

    if (checkoutPrice)
        localStorage.setItem('checkout', checkoutPrice.textContent)
})