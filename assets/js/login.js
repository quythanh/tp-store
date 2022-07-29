const init = () => {
    var usr = localStorage.getItem('user') || 0;

    if (usr) {
        document.querySelector('.user').innerHTML = `
            <div class="user__icon">
                <i class="fa-duotone fa-user"></i>
            </div>
            <div class="user__nav">
                <a href="">Thông tin</a>
                <a>Đăng xuất</a>
            </div>`;
    }
    else {
        document.querySelector('.user').innerHTML = '<button id="signIn">Sign in</button>';

        document.querySelector('#signIn').addEventListener('click', createModal);
    }
}

init();