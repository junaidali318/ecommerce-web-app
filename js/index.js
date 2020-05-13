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