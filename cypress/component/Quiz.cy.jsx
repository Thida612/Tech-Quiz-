import Quiz from '../../client/src/components/Quiz'; // Adjust the path to your Quiz component

describe('Quiz Component', () => {
  beforeEach(() => {
    cy.intercept({

      method: 'GET',
      url: '/api/questions/random'

    },
      {
        fixture: 'questions.json',
        statusCode: 200
      }
    ).as('getRandomQuesiton')
    // Replace with your actual fixture file path
  });

  it('should start the quiz when the start button is clicked', () => {
    cy.mount(<Quiz />); // Mount the Quiz component
    cy.get('.btn').contains("Start Quiz").click(); // Adjust the selector to match your start button
    cy.get('h2').contains("What is the keyword used to define a function in Python?").should('exist'); // Check if the question element is displayed
  });

  it('should display the second question when an answer is selected', () => {
    cy.mount(<Quiz />);
    cy.get('.btn').contains('Start Quiz').click(); // Start the quiz
    cy.get('.btn').contains('1').click();
    cy.get('h2').contains("What is the output of print(2 ** 3)?").should('exist');
  });

  it('should display the third question when an answer is selected', () => {
    cy.mount(<Quiz />);
    cy.get('.btn').contains('Start Quiz').click(); // Start the quiz
    cy.get('.btn').contains('1').click();
    cy.get('.btn').contains('1').click();
    cy.get('h2').contains("Which of the following is a mutable data type in Python?").should('exist');

  });

  // it('should display the fourth question when an answer is selected', () => {
  //   cy.mount(<Quiz />);
  //   cy.get('.btn').contains('Start Quiz').click(); // Start the quiz
  //   cy.get('h2').contains("?").should('exit');
  //   cy.get('.btn').click(); // Click the next question button
  //   cy.get('.question').should('exist'); // Ensure the next question is displayed
  // });



  it('should show the score after all questions are answered', () => {
    cy.mount(<Quiz />);
    cy.get('.btn').contains('Start Quiz').click(); // Start the quiz

    // Loop through all questions (assuming you have a known number of questions)
    cy.get('.btn').contains('1').click();
    cy.get('.btn').contains('1').click();
    cy.get('.btn').contains('1').click();
    // cy.get('input[type="radio"]').each((radio) => {
    //   cy.wrap(radio).check(); // Select each answer
    //   cy.get('button.next-question').click(); // Click the next question button
    // });

    // After the last question, check if the score is displayed
    // cy.get('.alert').contains('Your score:').should('exist'); // Adjust the selector to match your score display
    cy.get('h2').contains("Quiz Completed").should('exist');
  });

  it('should allow the user to start a new quiz after viewing the score', () => {
    cy.mount(<Quiz />);
    cy.get('.btn').contains('Start Quiz').click(); // Start the quiz

    // Loop through all questions (assuming you have a known number of questions)
    for (let i = 0; i < 3; i++) {
      cy.get('.btn').contains('1').click();
    }

    // click on the Take New Quiz button
    cy.get('.btn').contains('Take New Quiz').click();

    // expect to see the first question again
    cy.get('h2').contains("What is the keyword used to define a function in Python?").should('exist');

  });
});
