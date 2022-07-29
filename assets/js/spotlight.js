const main_img = document.querySelector('.spotlight .main__img img'),
    list_img = document.querySelectorAll('.spotlight .list__img>div');

var currentImg = 0;
var myInterval;

const nextImg = () => {
    currentImg = currentImg == list_img.length - 1 ? 0 : currentImg + 1;
    setActiveImg(currentImg);
}

const setActiveImg = index => {
    main_img.src = list_img[index].querySelector('img').src.replace('_thumbnail', '');
    document.querySelector('.active').classList.remove('active');
    list_img[index].classList.add('active');
    clearInterval(myInterval);
    myInterval = setInterval(nextImg, 4000);
}

list_img.forEach((img, index) => img.addEventListener('click', () => {
    currentImg = index;
    setActiveImg(currentImg);
}))

myInterval = setInterval(nextImg, 4000);