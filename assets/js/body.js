var currentImg = 0;
var myTimeout;

const renderSpotlight = () => {
    fetch('/assets/data/games.json')
        .then(res => res.json())
        .then(data => {
            const spotlight = document.querySelector('.spotlight');
            spotlight.innerHTML = '<div class="main__img"><img src="" alt=""></div><div class="list__img"></div>';
            let listImg = spotlight.querySelector('.list__img');
            listImg.innerHTML = '';

            data["spotlight"].map((e, index) => {
                listImg.innerHTML += `
                    <div ${index == currentImg ? "class='active'" : ""}>
                        <img src="${e['thumbnail']}" alt="">
                        <div class="info">
                            <div class="info__price">${e['price']}</div>
                            <div class="info__control">
                                ${
                                    e['price'] == 'Free'
                                        ? '<button>PLAY FOR FREE</button>'
                                        : inCart(e['id'])
                                            ? '<button>In Cart</button>'
                                            : '<button id="' + e['id'] + '" onclick="toCart(this);"><i class="fa-duotone fa-cart-shopping"></i>ADD TO CART</button>'
                                }
                                <button>ADD TO WISHLIST</button>
                            </div>
                        </div>
                    </div>
                `
            })
            
            // Change Image
            const list_div_img = spotlight.querySelectorAll('.list__img>div');
            
            const nextImg = () => {
                currentImg = currentImg == list_div_img.length - 1 ? 0 : currentImg + 1;
                setActiveImg(currentImg);
            }
            
            const setActiveImg = index => {
                spotlight.querySelector('.main__img img').src = list_div_img[index].querySelector('img').src.replace('_thumbnail', '');
                let active = document.querySelector('.active');
                active && active.classList.remove('active');
                list_div_img[index].classList.add('active');
                clearTimeout(myTimeout);
                myTimeout = setTimeout(nextImg, 4000);
            }
            
            list_div_img.forEach((img, index) => img.addEventListener('click', () => {
                currentImg = index;
                setActiveImg(currentImg);
            }))
            
            setActiveImg(currentImg);
            myTimeout = setTimeout(nextImg, 4000);
        })
}

const renderSections = () => {
    const sections = document.querySelector('.sections');
    sections.innerHTML = '';

    fetch('/assets/data/games.json')
        .then(res => res.json())
        .then(data => {
            data['sections'].map(s => {
                let section = `
                <div class="section">
                    <h2 class="section__title">${s['name']}</h2>
                    <div class="section__inner">
                        <div class="list_game">
                `

                s['data'].map(g => {
                    section += `
                    <div class="game">
                        <img class="game__thumbnail" src="${g['thumbnail']}" alt="">
                        <div class="game__detail">
                            <div class="game__name">${g['name']}</div>
                            <div class="game__price">${g['price']}</div>
                            ${
                                g['price'] == 'Free'
                                    ? '<button class="game__btn">PLAY FOR FREE</button>'
                                    : inCart(g['id'])
                                        ? '<button class="game__btn">In Cart</button>'
                                        : '<button class="game__btn" id="' + g['id'] + '" onclick="toCart(this);"><i class="fa-duotone fa-cart-shopping"></i>Add to cart</button>'
                            }
                        </div>
                    </div>
                    `
                })

                section += '</div></div></div>';

                sections.innerHTML += section;
            })
        })
}

const renderContent = () => {
    clearTimeout(myTimeout);
    renderSpotlight();
    renderSections();
}