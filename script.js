// Array of fallback riddles in case API call fails
const riddles = [
  {
    question: "A train was on its way to Florida and derailed. Where would they bury the survivors?",
    answer: "You don't bury survivors!"
  }
];

let currentRiddle = 0;

// DOM elements
const riddleElement = document.getElementById('riddle');
const answerElement = document.getElementById('answer');
const showAnswerBtn = document.getElementById('show-answer');
const nextBtn = document.getElementById('next');

// Function to fetch a riddle from an API
async function fetchRiddle() {
  try {
    const response = await fetch('https://riddles-api.vercel.app/random');
    if (!response.ok) throw new Error('Failed to fetch riddle');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching riddle:', error);
    return null; // Return null so we can use the local array instead
  }
}

// Function to display a riddle
function displayRiddle(riddle) {
  riddleElement.textContent = riddle.question;
  answerElement.textContent = riddle.answer;
  answerElement.classList.add('hide'); // Hide the answer initially
}

// Event listener to show or hide the answer
showAnswerBtn.addEventListener('click', () => {
  answerElement.classList.toggle('hide');
});

// Event listener to fetch the next riddle
nextBtn.addEventListener('click', async () => {
  const newRiddle = await fetchRiddle();
  if (newRiddle) {
    displayRiddle(newRiddle);
  } else {
    // If API fails, use local array as a fallback
    currentRiddle = (currentRiddle + 1) % riddles.length;
    displayRiddle(riddles[currentRiddle]);
  }
});

// Load an initial riddle on page load
window.addEventListener('load', async () => {
  const firstRiddle = await fetchRiddle();
  if (firstRiddle) {
    displayRiddle(firstRiddle);
  } else {
    displayRiddle(riddles[0]); // Use local fallback
  }
});
