import { shuffleArray } from "./utils";

export type Question = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
}

// This 'QuestionState' will use the types of Questions, but add the property 'answers' to it
export type QuestionState = Question & { answers: string[] };
// QuestionState is a type which now has 7 possible subtypes.

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}
export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {


    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;

    // First, await for the fetch itself, then await for the conversion to json
    const data = await (await fetch(endpoint)).json();
    //console.log(data)

    // We want to merge the correct_answer with the array of incorrect_answers and then shuffle the array so that the correct answer does not always appear in a specific position.
    // This new array will be referenced by the key "answers" which is again is an array of all answers combined (the incorrect_answers plus the correct answer among them):
    return data.results.map((question: Question) => (
        {
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }
    ));
}
 