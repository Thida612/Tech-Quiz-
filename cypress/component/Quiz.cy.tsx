import React from 'react'
import Quiz from '../../client/src/components/Quiz'

describe('<Quiz />', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: '/api/questions/random'
    },
    {
      fixture: 'questions.json',
      statusCode: 200
    }
    ).as('fixtureQuestions');
  });

  it('should render the page and present a "Start Quiz" button to the user', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Quiz />);
    cy.get('[data-cy=start-screen]').should('be.visible');
  });

  it('should progess to the quiz when the "Start Quiz" button is clicked', () => {
    cy.mount(<Quiz />);
    cy.get('[data-cy=start-button]').click();
    cy.get('[data-cy=quiz-question]').should('be.visible');
  });

  it('should display the next question when an answer is submitted', () => {
    cy.mount(<Quiz />);
    cy.get('[data-cy=start-button]').click();
    cy.get('[data-cy=quiz-question-content]').contains('question1');
    cy.get('[data-cy=button-0]').click();
    cy.get('[data-cy=quiz-question-content]').contains('question2');
  });

  it('should display the score once 10 questions are answered', () => {
    cy.mount(<Quiz />);
    cy.get('[data-cy=start-button]').click();
    for (let question = 0; question < 10; question++) {
      cy.get('[data-cy=button-0]').click();
    };
    cy.get('[data-cy=completion-screen]').should('be.visible');
  });

  it('should display the score of 10/10 once 10 questions are answered correctly', () => {
    cy.mount(<Quiz />);
    cy.get('[data-cy=start-button]').click();
    for (let question = 0; question < 10; question++) {
      cy.get('[data-cy=button-0]').click();
    };
    cy.get('[data-cy=completion-screen]').should('contain', 'Your score: 10/10');
  });

  it('should display the score of 0/10 once 10 questions are answered incorrectly', () => {
    cy.mount(<Quiz />);
    cy.get('[data-cy=start-button]').click();
    for (let question = 0; question < 10; question++) {
      cy.get('[data-cy=button-1]').click();
    };
    cy.get('[data-cy=completion-screen]').should('contain', 'Your score: 0/10');
  });

  it ('should take the user to a new quiz when the "Take New Quiz" button is pressed at the end of a quiz', () => {
    cy.mount(<Quiz />);
    cy.get('[data-cy=start-button]').click();
    for (let question = 0; question < 10; question++) {
      cy.get('[data-cy=button-0]').click();
    };
    cy.get('[data-cy=quiz-complete]').click();
    cy.get('[data-cy=quiz-question]').should('be.visible');
  });
});