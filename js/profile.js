let email = document.querySelector('body > div > div > div:nth-child(2) > div > div > div > div > div > div.col-sm-6.col-md-8 > p')
let name = document.querySelector('body > div > div > div:nth-child(2) > div > div > div > div > div > div.col-sm-6.col-md-8 > h4')
name.innerHTML = `<h4>${localStorage.getItem('currentUser')}</h4>`
email.innerHTML = `
<p>
    <i class="glyphicon glyphicon-envelope"></i>
    ${localStorage.getItem('currentUserEmail')}
<br />
    <i class="glyphicon glyphicon-globe"></i><a
    href="http://www.jquery2dotnet.com">www.jquery2dotnet.com</a>
<br />
    <i class="glyphicon glyphicon-gift"></i>
    June 02, 1988
</p>`