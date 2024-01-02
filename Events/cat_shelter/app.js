const catForm = document.querySelector('#catForm');
const bulletList = document.querySelector('#catList');
const catName = document.querySelector('#catName')
catForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let newCat = document.createElement('li');
    newCat.innerHTML = catName.value;
    bulletList.append(newCat)
    catForm.reset()
    // catName.value = '';
});
