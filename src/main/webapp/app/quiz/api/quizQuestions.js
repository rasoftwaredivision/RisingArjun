const quizQuestions = [
  {
      question: 'What is the laplace transform of u(t)?',
      answers: [
          {
              type: 'Correct',
              content: '1/s'
          },
          {
              type: 'Wrong1',
              content: 's'
          },
          {
              type: 'Wrong2',
              content: 's^2'
          }
      ]
  },
  {
      question: 'Is merge sort a stable sort?',
      answers: [
          {
              type: 'Correct',
              content: 'Yes'
          },
          {
              type: 'Wrong1',
              content: 'No'
          },
          {
              type: 'Wrong2',
              content: 'Depends on implementation'
          }
      ]
  },
  {
      question: 'What is the integral of x?',
      answers: [
          {
              type: 'Correct',
              content: 'x^2/2+c'
          },
          {
              type: 'Wrong1',
              content: 'x+c'
          },
          {
              type: 'Wrong2',
              content: '2x+c'
          }
      ]
  }
];

export default quizQuestions;
