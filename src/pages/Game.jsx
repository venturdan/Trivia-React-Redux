import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { saveTimer } from '../Redux/Actions/indexActions';

class Game extends Component {
  state = {
    index: 0,
    aleatoryAnswers: [],
    isLoading: true,
    blockAnswers: false,
  };

  componentDidMount() {
    this.startTimer();
    const { questions } = this.props;
    this.setState(() => ({
      aleatoryAnswers: this.getAleatoryAnswers(questions[0]),
      isLoading: false,
    }));
  }

  startTimer = async () => {
    const awaitToStart = 5000;
    setTimeout(() => {
      const interval = 1000;
      let { timer } = this.props;
      const timerCount = setInterval(() => {
        timer -= 1;
        const { dispatch } = this.props;
        dispatch(saveTimer(timer));
        if (timer === 0) {
          clearInterval(timerCount);
          this.setState({
            blockAnswers: true,
          });
        }
      }, interval);
    }, awaitToStart);
  };

  getAleatoryAnswers = (answers) => {
    const random = 0.5;
    return [{
      answer: answers.correct_answer,
      isCorrect: true,
    },
    ...answers.incorrect_answers.map((incorrectAnswer) => ({
      answer: incorrectAnswer,
      isCorrect: false,
    }))].sort(() => Math.random() - random);
  };

  render() {
    const { questions, timer } = this.props;
    const { index, aleatoryAnswers, isLoading, blockAnswers } = this.state;
    const { question, category } = questions[index];
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <section>
        <p>{ timer }</p>
        <p data-testid="question-text">{ question }</p>
        <p data-testid="question-category">{ category }</p>
        <div data-testid="answer-options">
          {
            aleatoryAnswers.map((answer) => (
              <button
                key={ answer.answer }
                data-testid={ answer.isCorrect ? 'correct-answer' : 'wrong-answer' }
                disabled={ blockAnswers }
              >
                { answer.answer }

              </button>
            ))
          }
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  timer: state.timer.timer,
});

Game.propTypes = {
  questions: propTypes.shape({
    correct_answer: propTypes.string.isRequired,
    incorrect_answers: propTypes.arrayOf(propTypes.string),
  }),
}.isRequired;

export default connect(mapStateToProps)(Game);
