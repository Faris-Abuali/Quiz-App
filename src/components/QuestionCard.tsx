import React from 'react'
// types
import { AnswerObject } from '../App'
// styles
// import { Wrapper, ButtonWrapper } form './QuestionCard.styles'
type Props = {
    question: string;
    answers: string[];
    callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined; // the type is AnswerObject, but also can be undefinde in the beginning.
    questionNumber: number;
    totalQuestions: number;
}
const QuestionCard: React.FC<Props> = ({ 
    questionNumber, 
    totalQuestions,
    question, 
    answers, 
    userAnswer, 
    callback, 
}) => {
    return (
        <div>
            <p className='number'>
                Question: {questionNumber} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{__html: question}}></p>
            <div>
                {
                    answers.map((answer) => (
                        <div key={answer}>
                            <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                                <span dangerouslySetInnerHTML={{__html: answer}} />
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default QuestionCard
