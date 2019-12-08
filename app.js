const STORE = {

  questions: [
    {

      question: 'What is the Capital of Florida?',
      id: 1,
      answers: [
        'Orlando',
        'Miami',
        'Tallahassee',
        'Fort Lauderdale'
      ],
      correctAnswer: 'Tallahassee'
    },
    {
      question: 'What is the Capital of California?',
      id: 2,
      answers: [
        'Los Angeles',
        'San Diego',
        'San Francisco',
        'Sacramento'
      ],
      correctAnswer: 'Sacramento'
    },
    {
      question: 'What is the Capital of Texas?',
      id: 3,
      answers: [
        'Austin',
        'Dallas',
        'Houston',
        'San Antonio'
      ],
      correctAnswer: 'Austin'
    },
    {
      question: 'What is the Capital of Massachusetts?',
      id: 4,
      answers: [
        'Salem',
        'Boston',
        'Cambridge',
        'Plymouth'
      ],
      correctAnswer: 'Boston'
    },
    {
      question: 'What is the Capital of New York?',
      id: 5,
      answers: [
        'New York',
        'Albany',
        'Buffalo',
        'Syracuse'
      ],
      correctAnswer: 'Albany'
    }

  ],

  questionNumber: 0,
  userScore: 0,
  quizBegin: false
};

//this increments questionNumber (which will always be different than the ACTUAL INDEX)
function questionIncrement () { 
console.log('questionIncrement ran');
    STORE.questionNumber++;
  };

//this increments the score of the user
function updateScore() {
console.log('updateScore ran') 
  STORE.userScore++;
};

//this handles the HTML for the quiz's landing page.
function quizHomePage() {
console.log('quizHomePage ran')

  const homeHeaderHTML= 
  `<header role="banner">
  <h1> State Quiz App </h1>
  </header>
  <h2 class ="title-2"> Do you know your state capitals? </h2>
  <h3 class ="title-3"> Let's find out! </h3>`
  
  const homePageHTML = 
  `<main id = "home-page">
  <form id = "start-page">
  <input type="button" id="start-quiz" aria-label="Start Page Button" value="Start Quiz"></input>
  </form>
  <br><br>
  <img src="#" alt="Map of the United States"> 
  </main>`

$('main').html(homePageHTML); 
$('header').html(homeHeaderHTML);
};

// this handles the HTML for the results page. 
function resultsPage() {
  console.log('resultsPage ran')
  const resultsHeader =  
  `<header role ="banner">
  <h1>Results</h1>
  <h2>Your final score was ${STORE.userScore} out of 5!</h2>
  </header>`

  const resultsHTML = `
  <form id = "restart-quiz">
  <input type="button" id="restart-quiz-button" aria-label="Restart Quiz Button" value= "Click to Try Again!">
  </input>
  </form>
  
  <br>
  <br>
  <img src="#" alt="Map of the United States"> 
  `
  $('main').html(resultsHTML);
  $('header').html(resultsHeader);
};

// this handles the HTML for the user's progress/score and acutal question text.
function questionInformation() {
  console.log('questionHeaders ran')
  const headers = 
  `<h3 class = "question-text">${STORE.questions[STORE.questionNumber].question}</h3>`
  const questionTracker =
  `<p class = "question-tracker"> You are on Question ${STORE.questionNumber + 1} of 5. </p>`;
  const scoreTracker = 
  `<p class = "score-tracker"> Your current score is ${STORE.userScore} out of 5. </p>`
  $('header').html(headers + questionTracker + scoreTracker);
}

// this handles the HTML for the answers and buttons on every question page. 
function renderAnswers() {
    console.log('renderAnswersran');

    const answersHTML = STORE.questions[STORE.questionNumber].answers.map(answer => {
    return `
    <input type="radio" name="answers" aria-label="Answer Selections" value="${answer}">${answer}
    </input>
    <br><br>`
    });

    const buttonHTML = 
    `<input type="button" id="next-question" aria-label="Next Question Button" value="Next Question"></input>
     <input type="button" id="submit-button" aria-label="Submit Answer Button" value="Submit Answer"></input>`

    $('main').html(answersHTML.join('') + buttonHTML); 
    $('#next-question').hide()
};

// this checks the user's answer input. if they have not answered, it prevents them from moving on in the quiz. 
function checkAnswerInput() {
  $(".no-answer").remove();
  const selectedAnswer = $("input[name='answers']:checked").val();
  if (selectedAnswer === undefined) {
    $("#next-question").before(`<p class="no-answer">Please select an answer.</p>`);
  }
  else if (selectedAnswer === STORE.questions[STORE.questionNumber].correctAnswer) {
    questionIncrement();
    updateScore(); 
    $("#submit-button").hide();
    $("#next-question").show().before(`<p class="correct">Nice job! You got it right! Your current score is ${STORE.userScore} out of 5.`);
  }
  else if (selectedAnswer !== STORE.questions[STORE.questionNumber].correctAnswer) {
    questionIncrement(); 
    $("#submit-button").hide();
    $("#next-question").show().before(`<p class="incorrect">Sorry! That's incorrect. The correct answer is ${STORE.questions[STORE.questionNumber -1].correctAnswer}.  
    Your current score is ${STORE.userScore} out of 5.`);
    };
  };

// this loads all button interactions IMMEDIATELY so that the uer can interact with the page based on several checks.
  function initializeQuiz() {
  console.log('initialize quiz ran'); 
  $(document).on("click", "#start-quiz", function(event) {  
    STORE.quizBegin = true;   
    renderQuiz();
  });
  $(document).on("click","#submit-button",function(event) {
    checkAnswerInput(); 
  }); 
  $(document).on("click", "#next-question", function(event) {
    renderQuiz(); 
  });
  $(document).on("click", "#restart-quiz", function(event) {
    STORE.quizBegin = false;
    STORE.questionNumber = 0;
    STORE.userScore = 0; 
    quizHomePage();
  });
  renderQuiz(); 
}; 

// this re-renders the quiz page EVERY TIME the user interacts with a button and based on several checks.
function renderQuiz() {
  console.log('renderQuiz function ran')  
  if (STORE.quizBegin === false) {
    quizHomePage();
  }
  else if (STORE.questionNumber >= 0 && STORE.questionNumber < 5) {
    renderAnswers(); 
    questionInformation();
  }
  else if (STORE.questionNumber >= 5) {
    resultsPage(); 
    updateScore(); 
  }
}; 

// calls initializeQuiz to get button interaction to load immediately for users. 
$(initializeQuiz);