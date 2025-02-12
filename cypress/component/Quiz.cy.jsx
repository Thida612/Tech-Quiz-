import Quiz from '../../client/src/components/Quiz'; // Adjust the path to your Quiz component

describe('Quiz Component', () => {
    beforeEach(() => {
      cy.intercept({
    
        method: 'GET',
        url: '/api/questions/random'

        },
        { fixture: 'questions.json', 
          statusCode: 200
        }
      ).as ('getRandomQuesiton')
      // Replace with your actual fixture file path

      
    });
  
    it('should start the quiz when the start button is clicked', () => {
      cy.mount(<Quiz />); // Mount the Quiz component
      cy.get('button.start-quiz').click(); // Adjust the selector to match your start button
      cy.get('.question').should('exist'); // Check if the question element is displayed
    });
  
    it('should display the next question when an answer is selected', () => {
      cy.mount(<Quiz />);
      cy.get('button').should('be.visible').contains('Start Quiz').click(); // Start the quiz
      cy.get('input[type="radio"]').first().check(); // Select the first answer
      cy.get('button.next-question').click(); // Click the next question button
      cy.get('.question').should('exist'); // Ensure the next question is displayed
    });
  
    it('should show the score after all questions are answered', () => {
      cy.mount(<Quiz />);

      cy.get('button.start-quiz').click(); // Start the quiz
  
      // Loop through all questions (assuming you have a known number of questions)
      cy.get('input[type="radio"]').each((radio) => {
        cy.wrap(radio).check(); // Select each answer
        cy.get('button.next-question').click(); // Click the next question button
      });
  
      // After the last question, check if the score is displayed
      cy.get('.score').should('exist'); // Adjust the selector to match your score display
    });
  
    it('should allow the user to start a new quiz after viewing the score', () => {
      cy.mount(<Quiz />);
      cy.get('button.start-quiz').click(); // Start the quiz
  
      // Answer all questions as before
      cy.get('input[type="radio"]').each((radio) => {
        cy.wrap(radio).check();
        cy.get('button.next-question').click();
      });
  
      // Check if the score is displayed
      cy.get('.score').should('exist');
  
      // Click the button to start a new quiz
      cy.get('button.start-new-quiz').click(); // Adjust the selector
      cy.get('button.start-quiz').should('exist'); // Ensure the start button is back
    });
  });
