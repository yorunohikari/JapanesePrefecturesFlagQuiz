// Initialize variables outside the function scope
let numCorrectAnswers = 0;
let numWrongAnswers = 0;

// Get the modal element
const modal = document.getElementById('help-modal');
const helpBtn = document.getElementById('help-btn');
const closeBtn = document.getElementsByClassName('close')[0];
const playBtn = document.getElementById('play-btn');

// Initialize array to store wrong answers
const wrongAnswers = [];

// When the user clicks on the button, open the modal
helpBtn.onclick = function () {
    modal.style.display = 'block';
}

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function () {
    modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Attach event listener to the play button
playBtn.addEventListener('click', startQuiz);

// Function to start the quiz
function startQuiz() {
    // Hide main menu
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('main-menu').style.display = 'none';

    // Reset variables for a new quiz
    numCorrectAnswers = 0;
    numWrongAnswers = 0;
    wrongAnswers.length = 0;

    // Get the selected number of prefectures
    const numPrefectures = document.getElementById('prefecture-count').value;
    console.log('Starting quiz with ' + numPrefectures + ' prefectures.');

    // Fetch the data from GitHub (replace with actual URL)
    fetch('flags.json')
        .then(response => response.json())
        .then(data => {
            // Shuffle the data
            const shuffledData = shuffleArray(data);

            // Slice the shuffled data to get the selected number of prefectures
            const selectedPrefectures = shuffledData.slice(0, numPrefectures);

            // Start the quiz with the selected prefectures
            startQuizWithPrefectures(selectedPrefectures);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to end the quiz and display results
function endQuiz() {
    // Hide quiz container and display main menu
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    // Display results
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = `
        <h1>Quiz Results</h1>
        <p>Number of correct answers: ${numCorrectAnswers}</p>
        <p>Number of wrong answers: ${numWrongAnswers}</p>
        <div id="wrong-answers"></div>
        <button id="play-again-btn">Play Again</button>
    `;
    displayWrongAnswers();

    // Attach event listener to the play again button
    const playAgainBtn = document.getElementById('play-again-btn');
    playAgainBtn.addEventListener('click', resetQuiz);

}


// Function to display wrong answers
function displayWrongAnswers() {
    const wrongAnswersContainer = document.getElementById('wrong-answers');
    wrongAnswersContainer.innerHTML = '<h2>Wrong Answers</h2>';

    // Create table
    const table = document.createElement('table');
    table.classList.add('styled-table'); // Add CSS class to the table
    const headerRow = table.insertRow();
    headerRow.innerHTML = '<th>Prefecture</th><th>Flag</th>';

    // Populate table with wrong answers
    wrongAnswers.forEach(answer => {
        const row = table.insertRow();
        const prefectureCell = row.insertCell();
        prefectureCell.textContent = answer.prefecture;

        const flagCell = row.insertCell();
        const flagImage = document.createElement('img');
        flagImage.src = answer.flag;
        flagImage.alt = `${answer.prefecture} Flag`;
        flagImage.classList.add('wrong-flag-image'); // Add CSS class to the image
        flagCell.appendChild(flagImage);
    });

    wrongAnswersContainer.appendChild(table);
}


// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to start the quiz with selected prefectures
function startQuizWithPrefectures(prefectures) {
    // Initialize quiz variables
    let currentQuestionIndex = 0;

    // Function to display the current question
    function displayQuestion() {
        const currentQuestion = prefectures[currentQuestionIndex];
        const flagUrl = currentQuestion.flag;
        const prefectureName = currentQuestion.prefecture;

        // Display flag image
        document.getElementById('flag-container').innerHTML = `<img src="${flagUrl}" alt="${prefectureName} Flag">`;

        // Shuffle options (excluding the correct answer)
        const options = shuffleArray(prefectures.map(prefecture => prefecture.prefecture));
        const correctIndex = options.indexOf(prefectureName);
        options.splice(correctIndex, 1); // Remove correct answer
        options.splice(3); // Keep only 3 options

        // Add correct answer and shuffle options again
        options.push(prefectureName);
        const shuffledOptions = shuffleArray(options);

        // Display options
        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = '';
        shuffledOptions.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => checkAnswer(option === prefectureName, prefectureName);
            optionsContainer.appendChild(button);
        });
    }

    // Function to handle user selecting an option
    function checkAnswer(isCorrect, prefectureName) {
        const flagUrl = prefectures[currentQuestionIndex].flag;

        if (isCorrect) {
            numCorrectAnswers++;
            document.getElementById('result').textContent = 'Correct!';
        } else {
            numWrongAnswers++;
            wrongAnswers.push({ prefecture: prefectureName, flag: flagUrl }); // Record wrong answer with prefecture name and flag URL
            console.log(flagUrl)
            document.getElementById('result').textContent = 'Incorrect!';
        }

        // Proceed to next question after a brief delay
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < prefectures.length) {
                displayQuestion();
                document.getElementById('result').textContent = '';
            } else {
                endQuiz();
            }
        }, 1000); // 3 second delay
    }

    // Display the first question to start the quiz
    displayQuestion();
}

// Function to reset the quiz
function resetQuiz() {
    // Reset variables
    numCorrectAnswers = 0;
    numWrongAnswers = 0;
    wrongAnswers.length = 0;

    // Hide quiz container and display main menu
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('main-menu').style.display = 'block';

    // Clear any existing quiz results
    // Clear any existing quiz results
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = '';
    document.getElementById('result-container').style.display = 'none';

    // Clear flag, options, and result
    document.getElementById('flag-container').innerHTML = '';
    document.getElementById('options').innerHTML = '';
    document.getElementById('result').textContent = '';
}