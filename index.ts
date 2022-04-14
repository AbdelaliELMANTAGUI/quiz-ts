// Quiz(options)
// quiz.addQuestion
// quiz.answer(question, answer)

import { Inswerable, Quiz } from "./lib/quiz";

const quiz = new Quiz({
  id: 1,
  name: "Quiz 1",
  questions: [
    {
      id: 1,
      text: "Question 1",
      rightAnswer: {
        id: 1,
        selected: [
          {
            id: 1,
            text: "Option 1",
          },
        ],
      },
      options: [
        {
          id: 1,
          text: "Option 1",
        },
        {
          id: 2,
          text: "Option 2",
        },
      ],
      duration: 1,
    },
  ],
  player: {
    name: "Player 1",
    score: 0,
  },
});

const answer = quiz.next()
    // .whenTimedOut(()=>{
    //   console.log("it timed out")
    // })