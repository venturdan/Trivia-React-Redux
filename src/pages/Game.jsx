import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Game extends Component {
  state = {
    index: 0,
    aleatoryAnswers: [],
    isLoading: true,
  };

  componentDidMount() {
    const { questions } = this.props;
    this.setState(() => ({
      aleatoryAnswers: this.getAleatoryAnswers(questions[0]),
      isLoading: false,
    }));
  }

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
    const { questions } = this.props;
    const { index, aleatoryAnswers, isLoading } = this.state;
    const { question, category } = questions[index];
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <section>
        <p data-testid="question-text">{ question }</p>
        <p data-testid="question-category">{ category }</p>
        {
          aleatoryAnswers.map((answer) => (
            <button
              key={ answer.answer }
              data-testid={ answer.isCorrect ? 'correct-answer' : 'wrong-answer' }
            >
              { answer.answer }

            </button>
          ))
        }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

Game.propTypes = {
  questions: propTypes.shape({
    correct_answer: propTypes.string.isRequired,
    incorrect_answers: propTypes.arrayOf(propTypes.string),
  }),
}.isRequired;

export default connect(mapStateToProps)(Game);
