const getSerie = async (name) => {
    try {
        // const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${name}`):
        const res = await axios.get(`http://api.tvmaze.com/search/shows`, { params: { q: name } });
        return res
    } catch (e) {
        console.log(`oops ! Something didn't work - out`);
    }
}


const form = document.querySelector('#form');
const list = document.querySelector('#list');
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log('SUBMITTED !');
    // Let's erase the last search results
    list.innerHTML = '';
    // continue
    const res = await getSerie(form.elements.query.value);
    console.log("Here's the response", res);
    showResHandler(res);
    form.elements.query.value = '';
})

function showResHandler(response) {
    if (!response.data.length) {
        console.log('Nothing found !')
        const sorry = document.createElement('p');
        sorry.innerText = `Sorry ! No show named ${form.elements.query.value} was found.`
        list.append(sorry);
        return;
    }
    console.log('Something found!');
    for (show of response.data) {
        showDisplay(show.show.name, show.show.image.medium);
    }
}

function showDisplay(showName, imgSrc) {
    // We create an li in which there's a p and div in which there's the img
    const li = document.createElement('li');
    const div = document.createElement('div');
    const text = document.createElement('p');
    li.innerText = `${showName}`;
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = `${showName}`;
    div.append(img);
    li.append(div);
    list.append(li);
}

console.log('coucou')