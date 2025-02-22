
// Array of riddles (replace this with your API call)
const riddles = [
  {
      question: "A train was on its way to Florida and derailed. Where would they bury the survivors?",
      answer: "You don't bury survivors!"
  },
  // Add more riddles or replace with API call
];

let currentRiddle = 0;

// DOM elements
const riddleElement = document.getElementById('riddle');
const answerElement = document.getElementById('answer');
const showAnswerBtn = document.getElementById('show-answer');
const nextBtn = document.getElementById('next');

// Function to fetch riddle from API
async function fetchRiddle() {
  try {
      // Replace this with your actual API call
      const response = await fetch('https://riddles-api.vercel.app/random');
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching riddle:', error);
      return null;
  }
}

// Function to display riddle
function displayRiddle(riddle) {
  riddleElement.textContent = riddle.question;
  answerElement.textContent = riddle.answer;
  answerElement.classList.add('hide');
}

// Event listeners
showAnswerBtn.addEventListener('click', () => {
  answerElement.classList.toggle('hide');
});

nextBtn.addEventListener('click', async () => {
  // If using API:
  const newRiddle = await fetchRiddle();
  if (newRiddle) {
      displayRiddle(newRiddle);
  }
  
  // If using local array:
  // currentRiddle = (currentRiddle + 1) % riddles.length;
  // displayRiddle(riddles[currentRiddle]);
});

// Initial load
window.addEventListener('load', async () => {
  // If using API:
  const firstRiddle = await fetchRiddle();
  if (firstRiddle) {
      displayRiddle(firstRiddle);
  }
  
 
});