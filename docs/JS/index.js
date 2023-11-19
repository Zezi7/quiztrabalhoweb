const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Monkey D. Luffy é você?"
      break
    case (performance >= 70):
      message = "Você é um dos chapéu de palha!"
      break
    case (performance >= 50):
      message = "é mais ou menos..."
      break
    default:
      message = "Você é da marinha? :/"
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Quem deu o Chapéu de Palha do Luffy?",
    answers: [
      { text: "Law", correct: false },
      { text: "Ace", correct: false },
      { text: "Shanks", correct: true },
      { text: "Sabo", correct: false }
    ]
  },
  {
    question: "Qual deles são os dois irmãos do Luffy?",
    answers: [
      { text: "Ace e Sabo", correct: true },
      { text: "Crocodile e Enel", correct: false },
      { text: "Buggy e Arlong", correct: false },
      { text: "Gol D. Roger e Oden", correct: false }
    ]
  },
  {
    question: 'Qual é o grande sonho do Luffy?',
    answers: [
      { text: 'Ser rei dos piratas', correct: true },
      { text: 'Ser médico', correct: false },
      { text: 'Ser o melhor espadachim do mundo', correct: false },
      { text: "Nenhuma das alternativas", correct: false }
    ]
  },
  {
    question: '"Chopper dos Chapéu de Palha é um guaxinim."',
    answers: [
      { text: "Verdadeiro", correct: false },
      { text: "Falso", correct: true }
    ]
  },
  {
    question: 'Qual o nome completo de Luffy?',
    answers: [
      { text: 'Gol D. Luffy', correct: false },
      { text: 'Monkey D. Luffy', correct: true },
      { text: 'Monkey Luffy', correct: false },
      { text: 'Roronoa Luffy', correct: false }
    ]
  },
  {
    question: 'Quantos tripulantes tem os piratas do Chapéu de palha?',
    answers: [
      { text: '5', correct: false },
      { text: '10', correct: true },
      { text: '8', correct: false },
      { text: '80', correct: false }
    ]
  },
  {
    question: 'Quem foi o primeiro a descobrir o segredo do ONE PIECE?',
    answers: [
      { text: 'Barba branca', correct: false },
      { text: 'Buggy', correct: false },
      { text: 'Gol D. Roger', correct: true },
      { text: 'Shanks', correct: false },
    ]
  },
  {
    question: 'Qual o motivo da morte de Gol D. Roger?',
    answers: [
      { text: 'Execução', correct: true },
      { text: 'Foi morto por Luffy', correct: false },
      { text: 'Suicidio', correct: false },
      { text: 'Foi traído assim que realizou seu sonho', correct: false },
    ]
  },
  {
    question: 'Qual dessas é a habilidade principal de Luffy?',
    answers: [
      { text: 'Comer carne', correct: true },
      { text: 'Poder controlar o fogo', correct: false },
      { text: 'Habilidade com espadas', correct: false },
      { text: 'Ser um homem borracha', correct: true },
    ]
  },
  {
    question: 'Qual a maior fraqueza de usuários de fruto do diabo?',
    answers: [
      { text: 'Kryptonita', correct: false },
      { text: 'Sal', correct: false },
      { text: 'Água', correct: true },
      { text: 'Expectativa de vida', correct: false },
    ]
  },
]