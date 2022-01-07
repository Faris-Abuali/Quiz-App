import React, { useState } from 'react';
// styles
import { GlobalStyle } from './App.styles'; 
import { fetchQuizQuestions } from './API';
// components
import QuestionCard from './components/QuestionCard';
// Types
import { QuestionState, Difficulty } from './API';

export type AnswerObject = {
  question: string,
  answer: string,
  correct: boolean,
  correctAnswer: string
}


const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);



  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    // Grab the data from the API
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false); // to inform that the data is fetched and ready to start
  }

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // get user's clicked answer
      const answer = event.currentTarget.value; // the value of the clicked button 
      // Check answer against the correct answer
      const correct = questions[number].correct_answer === answer;
      if (correct) {setScore(score + 1);} // increase the user's answer

      // Save answer in the array of user's answers
      const answerObject = {
        question: questions[number].question, // question's text
        answer: answer, // user's answer for this question
        correct: correct, // boolean
        correctAnswer: questions[number].correct_answer, // the correct answer
      }
      // Update the array of user's answers
      setUserAnswers((prev) => [...prev, answerObject]);
      // setUserAnswers([...userAnswers, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if this is not the last question
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    }
    else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <h1>Quiz App with React TypeScript</h1>
        {
          gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <button className='start' onClick={startTrivia}>
                Start
            </button>
          ) : null
        }
        {!gameOver ? <p className='score'>Score: {score}</p> : null}
        {loading ? <p>Loading questions...</p> : null}
        {!loading && !gameOver && (
            <QuestionCard
              questionNumber={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          )
        } 
        {
          !gameOver && !loading && userAnswers.length === (number + 1) && number <=           (TOTAL_QUESTIONS-1) ? (
              <button className='next' onClick={nextQuestion}>
                Next Question
              </button>
          ) : null
        }    
      </div>
    </>
  );
}

export default App;
