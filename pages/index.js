import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

export default function Home() {
  const router = useRouter(); // isso é um hook
  const [name, setName] = React.useState(''); // isso é um hook

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>
          How much do you know?
        </title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Are you a hardcore The Office fan?</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(infosdoEvento) => {
              infosdoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(infosdoEvento) => {
                  setName(infosdoEvento.target.value);
                }}
                placeholder="What's your name?"
                value={name}
              />
              <Button
                type="submit"
                disabled={name.length === 0}
              >
                {`Start ${name}`}
              </Button>
            </form>

          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Oioi titulo</h1>
            <p>Alo clo alo</p>
          </Widget.Content>
        </Widget>
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/barbaraaliverti" />
      <Footer />
    </QuizBackground>
  );
}
