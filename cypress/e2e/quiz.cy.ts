describe('tech quiz', () => {
    context('Setup', () => {
      it('should render the page and present a "Start Quiz" button to the user', () => {
        cy.visit('/');
        cy.get('[data-cy=start-screen]').should('be.visible');
      });
    });
  
    context('Start Quiz', () => {
      it('should progess to the quiz when the "Start Quiz" button is clicked', () => {
        cy.visit('/');
        cy.get('[data-cy=start-button]').click();
        cy.get('[data-cy=quiz-question]').should('be.visible');
      });
    });
  
    context('Answer a Question', () => {
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
        cy.visit('/');
      });
      it('should display the next question when an answer is submitted', () => {
        cy.visit('/');
        cy.get('[data-cy=start-button]').click();
        cy.get('[data-cy=quiz-question-content]').contains('question1');
        cy.get('[data-cy=button-0]').click();
        cy.get('[data-cy=quiz-question-content]').contains('question2');
      });
    });
  
    context('Answer All Questions', () => {
      it('should display the score once 10 questions are answered', () => {
        cy.visit('/');
        cy.get('[data-cy=start-button]').click();
        for (let question = 0; question < 10; question++) {
          cy.get('[data-cy=button-0]').click();
        };
        cy.get('[data-cy=completion-screen]').should('be.visible');
      });
    });
  
    context('Answer All Questions Correctly', () => {
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
        cy.visit('/');
      });
  
      it('should display the score of 10/10 once 10 questions are answered correctly', () => {
        cy.get('[data-cy=start-button]').click();
        for (let question = 0; question < 10; question++) {
          cy.get('[data-cy=button-0]').click();
        };
        cy.get('[data-cy=completion-screen]').should('contain', 'Your score: 10/10');
      });
    });
  
    context('Answer All Questions Incorrectly', () => {
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
        cy.visit('/');
      });
  
      it('should display the score of 0/10 once 10 questions are answered incorrectly', () => {
        cy.get('[data-cy=start-button]').click();
        for (let question = 0; question < 10; question++) {
          cy.get('[data-cy=button-1]').click();
        };
        cy.get('[data-cy=completion-screen]').should('contain', 'Your score: 0/10');
      });
    });
  
    context('Start a New Quiz', () => {
      it ('should take the user to a new quiz when the "Take New Quiz" button is pressed at the end of a quiz', () => {
        cy.visit('/');
        cy.get('[data-cy=start-button]').click();
        for (let question = 0; question < 10; question++) {
          cy.get('[data-cy=button-0]').click();
        };
        cy.get('[data-cy=quiz-complete]').click();
        cy.get('[data-cy=quiz-question]').should('be.visible');
      });
    });
  });