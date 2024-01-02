const rgbP = document.querySelector('#rgbP');
const rgbButton = document.querySelector('#rgbButton');
const body = document.querySelector('body')

rgbButton.addEventListener('click', () => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    body.style.backgroundColor = `rgb(${r},${g},${b})`;
    rgbP.innerHTML = `rgb(${r},${g},${b})`;
})