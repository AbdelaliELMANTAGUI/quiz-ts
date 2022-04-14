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
        },
      ],
      player: {
        name: "Player 1",
        score: 0,
      },
    });
  }).toThrowError(new NoOptionException("Not enough options"));
});

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
      },
    ],
    player: {
      name: "Player 1",
      score: 0,
    },
  });

test("add Question with no options", () => {
    expect(() => {
        quiz.addQuestion({
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
            options: [],
          });
    }).toThrowError(new NoOptionException("Not enough options"));
})


test("answer a Question with correct answer", () => {
    expect(quiz.answer(1,{
              id: 1,
              selected: [
                {
                    id: 1,
                    text: "Option 1",
                  },
              ],
            })
    ).toBe(true);
})

test("answer a Question with incorrect answer", () => {
    expect(quiz.answer(1,{
              id: 1,
              selected: [
                {
                    id: 1,
                    text: "not correct",
                  },
              ],
            })
    ).toBe(false);
})