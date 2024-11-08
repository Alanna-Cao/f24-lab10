import React, { useState, useRef } from 'react'
import './Quiz.css'
import QuizQuestion from '../core/QuizQuestion';
import QuizCore from '../core/QuizCore';
// Hint: Take advantage of the QuizQuestion interface

interface QuizState {
  selectedAnswer: string | null
  isQuizCompleted: boolean
}

const Quiz: React.FC = () => {
  // TODO: Task1 - Seprate the logic of quiz from the UI.
  // Hint: Take advantage of QuizCore to manage quiz state separately from the UI.
  const quizCore = useRef(new QuizCore()).current;
  
  const [state, setState] = useState<QuizState>({
    selectedAnswer: null,  // Initialize the selected answer.
    isQuizCompleted: false,  // Initialize the quiz completion state.
  });

  const currentQuestion = quizCore.getCurrentQuestion();

  const handleOptionSelect = (option: string): void => {
    setState((prevState) => ({ ...prevState, selectedAnswer: option }));
  }


  const handleButtonClick = (): void => {
    // TODO: Task3 - Implement the logic for button click ("Next Question" and "Submit").
    // Hint: You might want to check for a function in the core logic to help with this.
    if (state.selectedAnswer) {
      quizCore.answerQuestion(state.selectedAnswer);
    }
    if (quizCore.hasNextQuestion()) {
      quizCore.nextQuestion();
      setState({
        selectedAnswer: null, // Reset selected answer for the next question
        isQuizCompleted: false,
      });
    } else {
      setState((prevState) => ({
        ...prevState,
        isQuizCompleted: true,
      }));
    }
  } 

  // If the quiz is complete, show the final score
  if (state.isQuizCompleted) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {quizCore.getScore()} out of {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }

  // If no more questions, or if no current question, return null
  if (!currentQuestion) return null;

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={state.selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{state.selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>
        {quizCore.hasNextQuestion() ? 'Next Question' : 'Submit'}
      </button>
    </div>
  );
};

export default Quiz;