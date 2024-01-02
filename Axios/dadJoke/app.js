const getDadJoke = async () => {
    try {
        const dadJoke = await axios.get('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json'
            }
        });
        // console.log("hey", dadJoke.data.joke);
        return dadJoke.data.joke;
    } catch (e) {
        console.log('ERROR', e);
        return 'Problem ! Check the console.'
    }

}

const button = document.querySelector('#button').addEventListener('click', async () => {
    const joke = await getDadJoke();
    const li = document.createElement('li');
    li.innerText = joke;
    // console.log(joke);
    const list = document.querySelector('#list').append(li);
})