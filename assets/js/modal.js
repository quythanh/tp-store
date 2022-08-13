// Error DOMException: Failed to set the 'animation' property on 'CSSStyleDeclaration': These styles are computed, and therefore the 'animation' property is read-only.
// FIXED: https://stackoverflow.com/questions/4481485/changing-css-pseudo-element-styles-via-javascript
var addRule = (function (style) {
    var sheet = document.head.appendChild(style).sheet;
    return function (selector, css) {
        var propText = typeof css === "string" ? css : Object.keys(css).map(function (p) {
            return p + ":" + (p === "content" ? "'" + css[p] + "'" : css[p]);
        }).join(";");
        sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
    };
})(document.createElement("style"));

/* ================================================================================================= */

const createModal = () => {
    var modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal__inner">
            <div class="modal__logo">
                <i class="fa-duotone fa-gamepad-modern"></i>
            </div>
            <div class="modal__seperate"></div>
            <div class="modal__form-container">
                <div class="modal__form-container--inner">
                    <form class="modal__form" id="sign_up">
                        <div class="modal__title">Sign up</div>
                        <div class="username">
                            <input type="text" name="username" placeholder=" " autocomplete="off">
                            <label for="username">Username</label>
                        </div>
                        <p>&nbsp;</p>
                        
                        <div class="password">
                            <input type="password" name="password" placeholder=" ">
                            <label for="password">Password</label>
                        </div>
                        <p>&nbsp;</p>
                        
                        <div class="password">
                            <input type="password" name="password2" placeholder=" ">
                            <label for="password2">Confirm password</label>
                        </div>
                        <p>&nbsp;</p>
                        <button id="form__submit">Sign up</button>

                        <p class="nav_msg">Have an account? <a>Sign In</a> now.</p>
                    </form>
                    
                    <form class="modal__form" id="sign_in">
                        <div class="modal__title">Sign in</div>
                        <div class="username">
                            <input type="text" name="username" placeholder=" " autocomplete="off">
                            <label for="username">Username</label>
                        </div>
                        <p>&nbsp;</p>
                        
                        <div class="password">
                            <input type="password" name="password" placeholder=" ">
                            <label for="password">Password</label>
                        </div>
                        <p>&nbsp;</p>
                        <button id="form__submit">Sign in</button>

                        <p class="nav_msg">Don't have an account? <a>Sign Up</a>.</p>
                    </form>
                </div>
            </div>
        </div>`;
    

    modal.querySelectorAll('.modal__form').forEach(form => {
        let btn_submit = form['form__submit'];
        let list_inp = form.querySelectorAll('input');
        
        list_inp.forEach(inp => {
            if (inp.value == '')
                btn_submit.classList.add('disabled');

            inp.addEventListener('blur', () => {
                if (inp.value == '') {
                    inp.parentElement.nextElementSibling.innerHTML = 'Required';
                    inp.classList.add('error');
                    btn_submit.classList.add('disabled');
                } else {
                    inp.parentElement.nextElementSibling.innerHTML = '&nbsp;';
                    inp.classList.remove('error');

                    if ([...list_inp].map(e => e.value == '').includes(true) == false)
                        btn_submit.classList.remove('disabled');
                }
            })
        })

        form.querySelector('.nav_msg a').addEventListener('click', () => {            
            if (form.id == "sign_in") {
                addRule(".modal__seperate::before", {
                    animation: "LeftToRight 1s forwards"
                });
                addRule(".modal__seperate::after", {
                    animation: "charge 0.5s linear 0.125s forwards"
                });
                setTimeout(() => {
                    addRule('.modal__form-container--inner', {"margin-left": "0"});
                    addRule('.modal__seperate::after', {animation: "rs 0s forwards"});

                    form.reset();
                }, 625);
            }
            else {
                addRule(".modal__seperate::before", {
                    animation: "RightToLeft 1s forwards"
                });
                addRule(".modal__seperate::after", {
                    animation: "charge 0.5s linear 0.125s forwards"
                });
                setTimeout(() => {
                    addRule('.modal__form-container--inner', {"margin-left": "-370px"});
                    addRule('.modal__seperate::after', {animation: "rs 0s forwards"});

                    form.reset();
                }, 625);
            }
        })
        
        form.addEventListener('submit', e => {
            e.preventDefault();

            if (form.id == 'sign_up') {
                if (searchUser(list_inp[0].value) != false) {
                    list_inp[0].parentElement.nextElementSibling.innerHTML = 'Username is taken! Please try another.';
                    list_inp[0].classList.add('error');
                    return;
                }
                if (list_inp[1].value != list_inp[2].value) {
                    list_inp[2].parentElement.nextElementSibling.innerHTML = 'Password does not match! Please try again.';
                    list_inp[2].classList.add('error');
                    return;
                }

                // Create user
                let user = {
                    "username": list_inp[0].value,
                    "password": list_inp[1].value,
                    "cart": []
                }
                addNewUser(user);
            }
            else {
                let user = searchUser(list_inp[0].value);
                if (user == false) {
                    list_inp[0].parentElement.nextElementSibling.innerHTML = 'Username does not exist! Please check again.';
                    list_inp[0].classList.add('error');
                    return;
                }

                if (user['password'] != list_inp[1].value) {
                    list_inp[1].parentElement.nextElementSibling.innerHTML = 'Password does not match! Please try again.';
                    list_inp[1].classList.add('error');
                    return;
                }

                login(user);
            }
            
        })
    })
    
    modal.addEventListener('click', e => e.target === e.currentTarget ? document.body.removeChild(modal) : null);
    
    document.body.prepend(modal);
}

const addNewUser = user => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    login(user);
}

const searchUser = username => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    for (let i = 0; i < users.length; i++)
        if (users[i]['username'] == username)
            return users[i];
    return false;
}

const updateUser = user => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    for (let i = 0; i < users.length; i++)
        if (users[i]['username'] == user['username']) {
            users[i] = user;
            return;
        }
}

const inCart = id => {
    let user = JSON.parse(localStorage.getItem('user')) || 0;
    if (user)
        for (let i = 0; i < user['cart'].length; i++)
            if (user['cart'][i] == id)
                return true;
    return false;
}

const toCart = e => {
    let user = JSON.parse(localStorage.getItem('user')) || 0;
    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (user) {
        user['cart'].push(e.id);
        localStorage.setItem('user', JSON.stringify(user));

        for (let i = 0; i < users.length; i++)
            if (users[i]['username'] == user['username']) {
                users[i]['cart'] = user['cart'];
                localStorage.setItem('users', JSON.stringify(users));
                break;
            }
        
        e.innerHTML = 'In cart';

    } else
        createModal();

}

const login = user => {
    localStorage.setItem('user', JSON.stringify(user));
    document.body.querySelector('.modal').remove();
    init();
}

const logout = () => {
    localStorage.setItem('user', 'false');
    init();
}

const init = () => {
    if (JSON.parse(localStorage.getItem('user'))) {
        document.querySelector('.user').innerHTML = `
            <div class="user__icon">
                <i class="fa-duotone fa-user"></i>
            </div>
            <div class="user__nav">
                <a>Cart</a>
                <a>Sign out</a>
            </div>`;

        document.querySelector('.user__nav a:last-child').addEventListener('click', logout);
    }
    else {
        document.querySelector('.user').innerHTML = '<button id="signIn">Sign in</button>';
        document.querySelector('#signIn').addEventListener('click', createModal);
    }

    renderContent();
}

init();