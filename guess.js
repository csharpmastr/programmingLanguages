document.addEventListener('DOMContentLoaded', function () {
    const flagImg = document.getElementById('flag-img');
    const guessInput = document.getElementById('guess-input');
    const submitBtn = document.getElementById('submit-btn');
    const resultMsg = document.getElementById('result');
    const corAns = document.getElementById('corAns');

    // function to fetch from API
    function fetchRandomFlag() {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                const randomIndex = Math.floor(Math.random() * data.length);
                const flagUrl = data[randomIndex].flags.png;
                const countryName = data[randomIndex].name.common;
                flagImg.src = flagUrl;
                flagImg.dataset.country = countryName;

            })
            .catch(error => console.log('Error fetching data: ', error));
    }

    // Check if user's guess is correct
    function checkGuess() {
        const userGuess = guessInput.value.trim().toLowerCase();
        const correctAnswer = flagImg.dataset.country.toLowerCase();

        console.log(userGuess, correctAnswer);

        if (userGuess === correctAnswer) {
            resultMsg.textContent = 'Correct!';
            resultMsg.style.color = 'green';
            corAns.textContent = "";
        } else {
            resultMsg.textContent = 'Incorrect. Try again.';
            resultMsg.style.color = 'red';
            corAns.textContent = 'Correct Answer: ' + correctAnswer;
            corAns.style.color = 'red';
        }

        // Clear the input after checking the guess
        guessInput.value = '';

        // Fetch a new random flag for the next round
        fetchRandomFlag();
    }

    // Event listener for the submit button
    submitBtn.addEventListener('click', function() {
        checkGuess();
        clearInterval(timerInterval);
        timer();
    });

    // Fetch a random flag when the page loads
    fetchRandomFlag();

    var timerInterval;

    //function for timer
    function timer() {
        var sec = 30;
        const timerText = document.getElementById('timer');
        timerInterval = setInterval(function() {
            timerText.innerHTML='00:'+ (sec < 10 ? '0' : '') + sec;
            sec--;
            if(sec < 0) {
                clearInterval(timerInterval);
                checkGuess();
                timer();
            }
        }, 1000);
    }

    window.onload = function() {
        timer();
    }
});