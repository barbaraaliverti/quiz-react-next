/* eslint-disable react/prop-types */
import React from 'react';
import db from '../../db.json';
import Widget from '../../src/components/Widget';
import QuizLogo from '../../src/components/QuizLogo';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import Button from '../../src/components/Button';
import AlternativesForm from '../../src/components/AlternativesForm';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Results
      </Widget.Header>

      <Widget.Content>
        <h1>
          You got
          {' '}
          <strong>
            {/* {results.reduce((currentSum, currentResult) => {
              const isRightAnswer = currentResult === true;
              if (isRightAnswer) {
                return currentSum + 1;
              }
              return currentSum;
            }, 0)} */}
            {/* pq o array so tem true/false pode usar o filter */}
            {results.filter((result) => result).length}
            {' '}
          </strong>
          {' '}
          {(results.filter((result) => result).length) === 1 ? 'question' : 'questions'}
          {' '}
          right!
        </h1>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              {`# ${index + 1}: `}
              {result ? ' Correct' : ' Wrong'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) {
  // selectedAlternative é o estado e setSelectedAlternative é a função que muda o estado
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const questionId = `question__${questionIndex}`;
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const isCorrect = selectedAlternative === question.answer;
  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;

            return (
              <Widget.Topic
                as="label" /* recurso do styled components */
                key={alternativeId} /* React precisa de key */
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >

                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />

                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={Number.isNaN(selectedAlternative)}>
            Confirmar
          </Button>
          {isCorrect && isQuestionSubmited && <p>Correct!</p>}
          {!isCorrect && isQuestionSubmited && <p>Nope :(</p>}
        </AlternativesForm>

      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  // isso é um hook! define o estado inicial = 'LOADING'
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0); // é um hook
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  // depois de 1s, vai mudar o estado de 'LOADING' para 'QUIZ':
  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
    // nasce === didMount -> só roda uma vez
  }, []);

  // [React chama de Efeitos = Effects:]
  // novidade: não usa mais mudança de estado, usa hooks
  // React.useEffect = isso é um hook
  // nasce === didMount
  // atualizado === willUpdate
  // morre === willUnmount

  // não pode usar ternário pq tem que atribuir a alguma const; ex: const x = coisa? opção1:opção2
  function handleSubmit() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            onSubmit={handleSubmit}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT
        && (
        <ResultWidget results={results} />
        )}
      </QuizContainer>
    </QuizBackground>
  );
}
