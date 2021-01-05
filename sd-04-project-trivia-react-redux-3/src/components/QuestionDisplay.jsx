import React from 'react';

class QuestionsDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions:
      {
        response_code: 0,
        results: [
          {
            category: 'Entertainment: Video Gamess',
            type: 'boolean',
            difficulty: 'hard',
            question: 'TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy',
            correct_answer: 'False',
            incorrect_answers: [
              'True',
              'test1',
              'test2',
            ],
          },
        ],
      },

    };
    this.answerListMaker = this.answerListMaker.bind(this);
    this.shuffleAnswerList = this.shuffleAnswerList.bind(this);
  }

  shuffleAnswerList(listInput) {
    this.bar = 0; // recause CC Expected 'this' to be used by class method 'shuffleAnswerList'
    const list = listInput;
    for (let i = list.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  answerListMaker() {
    const questionToDisplay = this.state.questions.results[0];
    const answerList = [{ testId: 'correct-answer', answer: questionToDisplay.correct_answer }];
    questionToDisplay.incorrect_answers.map((answer, index) => (
      answerList.push({ testId: `wrong-answer-${index}`, answer })
    ));
    return this.shuffleAnswerList(answerList);
  }

  render() {
    const answersToDisplay = this.answerListMaker();
    const questionToDisplay = this.state.questions.results[0];
    return (
      // <Header />
      <div>
        <p data-testid="question-category">Category: {questionToDisplay.category}</p>
        <p data-testid="question-text">Question: {questionToDisplay.question}</p>
        <div>
          <p>Please chose an answer:</p>
          {answersToDisplay.map((answer) => (
            <button key={answer.answer} data-testid={answer.testId}>{answer.answer} </button>
          ),
          )}
        </div>
      </div>

    );
  }
}

export default QuestionsDisplay;
