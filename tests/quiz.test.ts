import NoOptionException from "../lib/exceptions/nooptionexception";
import NoPlayerException from "../lib/exceptions/noplayerexception";
import { Quiz } from "../lib/quiz";

test("Quiz(options) with no question", () => {
  expect(() => {
    new Quiz({
      id: 1,
      name: "Quiz 1",
      questions: [],
      player: {
        name: "Player 1",
        score: 0,
      },
    });
  }).toThrow("No Questions was provided");
});

test("Quiz(options) with no player", () => {
  expect(() => {
    new Quiz({
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
          duration: 10,
        },
      ],
      player: null,
    });
  }).toThrow(NoPlayerException);
});

test("Quiz(options) less that two options", () => {
  expect(() => {
    new Quiz({
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
          ],
          duration: 10,
        },
      ],
      player: {
        name: "Player 1",
        score: 0,
      },
    });
  }).toThrowError(new NoOptionException("Not enough options"));
});

test("Quiz(options) with no question", () => {
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
        duration: 10,
      },
    ],
    player: {
      name: "Player 1",
      score: 0,
    },
  });
  expect(quiz.hasNext()).toBe(true);
});

test("Inswerable anser() with correct answer", () => {
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
        duration: 10,
      },
    ],
    player: {
      name: "Player 1",
      score: 0,
    },
  });
  expect(
    quiz.next().answer({
      id: 1,
      selected: [
        {
          id: 1,
          text: "Option 1",
        },
      ],
    })
  ).toBe(true);
});

// test("Inswerable whenTimedOut()",async () => {
//   const quiz = new Quiz({
//     id: 1,
//     name: "Quiz 1",
//     questions: [
//       {
//         id: 1,
//         text: "Question 1",
//         rightAnswer: {
//           id: 1,
//           selected: [
//             {
//               id: 1,
//               text: "Option 1",
//             },
//           ],
//         },
//         options: [
//           {
//             id: 1,
//             text: "Option 1",
//           },
//           {
//             id: 2,
//             text: "Option 2",
//           },
//         ],
//         duration: 1,
//       },
//     ],
//     player: {
//       name: "Player 1",
//       score: 0,
//     },
//   });
//   const errorMsg = "from whenTimedOut"
//   await expect(()=>{ return new Promise(async ()=>{
//     quiz
//     .next()
//     .whenTimedOut(()=>{
//       throw new Error(errorMsg)
//     })
//     await new Promise((res)=>{setTimeout(res,5000)})
//   })   
//   }).toThrow(errorMsg);
// });

test("Inswerable answer a Question with incorrect answer", () => {
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
        duration: 10,
      },
    ],
    player: {
      name: "Player 1",
      score: 0,
    },
  });
  expect(
    quiz
    .next()
    .answer({
      id: 1,
      selected: [
        {
          id: 1,
          text: "not correct",
        },
      ],
    })
  ).toBe(false);
});
