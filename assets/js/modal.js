const createModal = () => {
    var modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal__inner">
            <div class="modal__logo">
                <i class="fa-duotone fa-gamepad-modern"></i>
            </div>
            <div class="modal__title">Sign in</div>
            <form class="modal__form">
                <div class="username">
                    <input type="text" id="username" placeholder=" " autocomplete="off">
                    <label for="username">Username</label>
                </div>
                <p id="usr__msg">&nbsp;</p>
                
                <div class="password">
                    <input type="password" id="password" placeholder=" ">
                    <label for="password">Password</label>
                </div>
                <p id="pwd__msg">&nbsp;</p>
                <button id="form__submit">Sign in</button>
            </form>
        </div>`;
    
    let usr = modal.querySelector('#username');
    let pwd = modal.querySelector('#password');
    let btn_submit = modal.querySelector('#form__submit');

    if (!usr.value || !pwd.value)
        btn_submit.classList.add('disabled');

    usr.addEventListener('blur', e => {
        if (e.target.value == '') {
            modal.querySelector('#usr__msg').innerHTML = 'Required';
            usr.classList.add('error');
            btn_submit.classList.add('disabled');
        } else {
            modal.querySelector('#usr__msg').innerHTML = '&nbsp;';
            usr.classList.remove('error');

            if (pwd.value != '')
                btn_submit.classList.remove('disabled');
        }
    });
    
    pwd.addEventListener('blur', e => {
        if (e.target.value == '') {
            modal.querySelector('#pwd__msg').innerHTML = 'Required';
            pwd.classList.add('error');
            btn_submit.classList.add('disabled');
        } else {
            modal.querySelector('#pwd__msg').innerHTML = '&nbsp;';
            pwd.classList.remove('error');

            if (usr.value != '')
                btn_submit.classList.remove('disabled');
        }
    });
    
    modal.querySelector('form').addEventListener('submit', e => {
        e.preventDefault();

        if (usr.value == '')
            modal.querySelector('#usr__msg').innerHTML = 'Required';
        if (pwd.value == '')
            modal.querySelector('#pwd__msg').innerHTML = 'Required';

        
    })
    
    modal.addEventListener('click', e => e.target === e.currentTarget ? document.body.removeChild(modal) : null);
    
    document.body.prepend(modal);
}