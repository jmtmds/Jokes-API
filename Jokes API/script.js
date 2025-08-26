document.addEventListener('DOMContentLoaded', () => {

    const displayElement = document.querySelector('.display');
    const jokeButton = document.querySelector('.button');
    const signalElements = document.querySelectorAll('.signal');

    let message = 'JM - Jokes API \n(icanhaz dadjoke)';
    let processing = false;

    function showProcessing(isProcessing) {
        signalElements.forEach(signal => {
            if (isProcessing) {
                signal.classList.remove('hidden');
            } else {
                signal.classList.add('hidden');
            }
        });
    }

    function updateDisplay(newText) {
        displayElement.textContent = newText;
    }

    updateDisplay(message);

    async function getJoke() {
        showProcessing(true);
        updateDisplay('...');

        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            const response = await fetch('https://icanhazdadjoke.com/', {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'My Joker API Project'
                }
            });

            if (!response.ok) {
                throw new Error('A piada se perdeu no caminho!');
            }

            const data = await response.json();
            updateDisplay(data.joke);

        } catch (error) {
            console.error('Erro ao buscar a piada:', error);
            updateDisplay('Piada ruim. Tente de novo mais tarde.');

        } finally {
            showProcessing(false);
        }
    }

    jokeButton.addEventListener('click', getJoke);

});