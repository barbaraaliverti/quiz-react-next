import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';

const BackgroundImage = styled.div`
  background-image: url(${db.bg});
  flex: 1;
  background-size: cover;
  background-position: center;
`;

const  QuizContainer = styled.div`
width: 100%;
max-width: 350px;
padding-top: 45px;
margin: auto 10%;
@media screen and (max-width: 500px) {
  margin: auto;
  padding: 15px;
}
`;



export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo></QuizLogo>
        <Widget>
          <Widget.Header>
            <h1>Titulo tremtrem</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Trem trem</p>
          </Widget.Content>          
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Oioi titulo</h1>
            <p>Alo clo alo</p>
          </Widget.Content>          
        </Widget>
      </QuizContainer>
      <GitHubCorner projectUrl={'https://github.com/barbaraaliverti'}></GitHubCorner>
      <Footer></Footer>
    </QuizBackground>
  )
}
