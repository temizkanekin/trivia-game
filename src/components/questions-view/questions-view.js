import React from "react";
import "./questions-view.css";
import Button from "../button/button";
import BaseView from "../base-view/base-view";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Lottie from "react-lottie";

const wrongData = require("./assets/18053-no-error-cancelled.json");
const timesUpData = require("./assets/6640-times-up.json");
const correctData = require("./assets/18052-ok-done-complete.json");
const completedData = require("./assets/10121-reward-trophy-animation.json");

const wrongDataOptions = {
  loop: true,
  autoplay: true,
  animationData: wrongData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const timesUpDataOptions = {
  loop: true,
  autoplay: true,
  animationData: timesUpData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const correctDataOptions = {
  loop: true,
  autoplay: true,
  animationData: correctData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const completedDataOptions = {
  loop: true,
  autoplay: true,
  animationData: completedData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const QuestionsView = ({ ...props }) => {
  const initialState = [
    {
      category: "",
      type: "",
      difficulty: "",
      question: "",
      correct_answer: "",
      incorrect_answers: [],
    },
  ];

  const [questions, setQuestions] = React.useState(initialState);
  const [currentQuestionNumber, setCurrentQuestionNumber] = React.useState(0);
  const [userPoint, setUserPoint] = React.useState(0);
  const [questionPoint, setQuestionPoint] = React.useState(0);
  const [remainingTime, setRemainingTime] = React.useState(undefined);
  const [renderQuestionPage, setRenderQuestionPage] = React.useState(true);
  const [renderCorrectAnswerPage, setRenderCorrectAnswerPage] = React.useState(false);
  const [renderWrongAnswerPage, setRenderWrongAnswerPage] = React.useState(false);
  const [renderTimeIsUpPage, setRenderTimeIsUpPage] = React.useState(false);
  const [renderGameCompletedPage, setRenderGameCompletedPage] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [timerId, setTimerId] = React.useState(undefined);
  const [shuffledQuestions, setShuffledQuestions] = React.useState([]);
  const [isJokerButtonDisabled, setIsJokerButtonDisabled] = React.useState(false);
  
  const timer = () => {
    setRemainingTime(15)
     setTimerId(window.setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
    }, 1000))
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array.map((item) => ({
      value: item,
      disabled: false,
    }));
  };

  const fetchQuestions = () => {
    const { category, difficulty } = props.match.params;
    let requestUrl;
    if (window.location.pathname === "/random") {
      setUserPoint(250);
      requestUrl = `https://opentdb.com/api.php?amount=10&type=multiple`;
    } else {
      requestUrl =
        difficulty === "any"
          ? `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`
          : `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;
    }
    setLoader(true);
    axios.post(requestUrl).then((res) => {
      // console.log(res.data.results);
      if(res.data.results.length > 0){
        setTimeout(timer(),500)
        setQuestions(res.data.results);
      }
      setLoader(false);
    });
  };

  React.useEffect(() => {
    if (renderGameCompletedPage) {
      const storedHighestScore = localStorage.getItem("highestScore");
      if (!storedHighestScore || userPoint > storedHighestScore) {
        localStorage.setItem("highestScore", userPoint);
      }
    }
  }, [renderGameCompletedPage, userPoint]);

  React.useEffect(() => {
    questions[currentQuestionNumber] &&
      setShuffledQuestions(
        shuffle(
          questions[currentQuestionNumber]["incorrect_answers"].concat(
            questions[currentQuestionNumber]["correct_answer"]
          )
        )
      );
  }, [currentQuestionNumber, questions]);


  React.useEffect(() => {
    if(renderTimeIsUpPage){
      setRenderQuestionPage(false)
      setRenderWrongAnswerPage(true)
    }
  },[renderTimeIsUpPage])

  const decodeString = (encodedStr) => {
    var parser = new DOMParser();
    var dom = parser.parseFromString(
      encodedStr, "text/html"
    );
    return dom.body.textContent;
  };
  React.useEffect(fetchQuestions, []);

  React.useEffect(() => {
    if(renderCorrectAnswerPage || renderWrongAnswerPage || renderGameCompletedPage){
      clearInterval(timerId);
    }
    else if (remainingTime === 0){
      clearInterval(timerId)
      setRenderTimeIsUpPage(true)
    }
    else if (renderQuestionPage) {
      setRenderTimeIsUpPage(false)
    }
  },[renderCorrectAnswerPage, renderWrongAnswerPage, renderGameCompletedPage, timerId, remainingTime, renderQuestionPage]);

  const handleButtonClick = (answer) => (e) => {
    answer === questions[currentQuestionNumber]["correct_answer"]
      ? handleCorrectAnswer()
      : handleWrongAnswer();
  };
  
  const prepareNextState = (
    renderQuestionPage,
    renderCorrectAnswerPage,
    renderWrongAnswerPage,
    renderGameCompletedPage
  ) => {
    setRenderQuestionPage(renderQuestionPage);
    setRenderCorrectAnswerPage(renderCorrectAnswerPage);
    setRenderWrongAnswerPage(renderWrongAnswerPage);
    setRenderGameCompletedPage(renderGameCompletedPage);
  };

  const findQuestionPointByDifficulty = () => {
    switch (questions[currentQuestionNumber]["difficulty"]) {
      case "easy":
        return 60;
      case "medium":
        return 90;
      case "hard":
        return 120;
      default:
        return 60;
    }
  };

  const handleCorrectAnswer = () => {
    setUserPoint((prevState) => {
      const questionPoint = findQuestionPointByDifficulty() + remainingTime * 10;
      setQuestionPoint(questionPoint);
      return userPoint + questionPoint;
    });
    if (currentQuestionNumber === questions.length - 1) {
      handleGameComplete();
    } else {
      prepareNextState(false, true, false, false, false);
    }
  };

  const handleWrongAnswer = () => {
    prepareNextState(false, false, true, false, false);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionNumber(currentQuestionNumber + 1);
    prepareNextState(true, false, false, false, true);
    setTimeout(timer(),500)
  };

  const handleGameComplete = () => {
    prepareNextState(false, false, false, true, false);
  };

  const returnToQuestionsPage = () => {
    setUserPoint(0);
    setCurrentQuestionNumber(0);
    prepareNextState(true, false, false, false, true);
    setIsJokerButtonDisabled(false);
    fetchQuestions();
  };

  const returnToWelcomePage = () => {
    const { history } = props;
    history.push("/welcome");
  };

  const handleJokerButtonClick = () => {
    const questionsJokerApplied = shuffledQuestions.slice();
    const correctAnswer = questions[currentQuestionNumber]["correct_answer"];
    const pickRandomWrongAnswer = questionsJokerApplied
      .filter((question) => question.value !== correctAnswer)
      .splice(
        Math.floor(Math.random() * (questionsJokerApplied.length - 1)),
        1
      )[0];
    questionsJokerApplied.forEach((question) => {
      if (question.value !== correctAnswer &&
          question.value !== pickRandomWrongAnswer.value)
        question.disabled = true;
    });
    setShuffledQuestions(questionsJokerApplied);
    setIsJokerButtonDisabled(true);
  };

  const jokerButtonAndHighScore = () => {
    const storedHighestScore = localStorage.getItem("highestScore");
    return (
      <div className="w-full p-4 flex justify-between">
        <div className="flex">
          <div className="m-auto">
            Highest Score: <span className="font-bold">{storedHighestScore || 0}</span>
          </div>
        </div>
        <div className="flex">
        <Button
          disabled={isJokerButtonDisabled}
          className="joker-button"
          value=""
          label="50:50"
          title={"Removes 2 wrong answers. Can be used only once!"}
          onClick={handleJokerButtonClick}
        />
        </div>
      </div>
    );
  };

  const gameCompletedPage = () => {
    return (
      <BaseView
        className="content-height"
        img={<Lottie options={completedDataOptions} width={"50%"} />}
        title={"Congratulations!"}
        message={`You have won the game with ${userPoint} total score`}
        buttons={[
          {
            key: "1",
            value: "",
            label: "Return To Questions Page",
            onClick: returnToQuestionsPage,
          },
          {
            key: "2",
            value: "",
            label: "Return To Welcome Page",
            onClick: returnToWelcomePage,
          },
        ]}
      />
    );
  };

  const wrongAnswerPage = () => {
    const title = renderTimeIsUpPage && "Time Is Up!";
    return (
      <BaseView
        className="content-height"
        img={
          <Lottie
            options={title ? timesUpDataOptions : wrongDataOptions}
            width={"50%"}
          />
        }
        title={title || "Wrong Answer!"}
        message="You have lost your points. Choose one of the options below to continue"
        buttons={[
          {
            key: "1",
            value: "",
            label: "Return To Questions Page",
            onClick: returnToQuestionsPage,
          },
          {
            key: "2",
            value: "",
            label: "Return To Welcome Page",
            onClick: returnToWelcomePage,
          },
        ]}
      />
    );
  };

  const correctAnswerPage = () => {
    return (
      <BaseView
        className="content-height"
        img={<Lottie options={correctDataOptions} width={"50%"} />}
        title="Correct!"
        message={`You have earned ${questionPoint} Points`}
        userPoint={userPoint}
        buttons={[
          {
            key: "1",
            value: "",
            label: "Next Question",
            onClick: handleNextQuestion,
          },
        ]}
      />
    );
  };

  const questionPage = () => {
    const questionLabel =
      questions[currentQuestionNumber] &&
      decodeString(questions[currentQuestionNumber].question);
    return (
      <React.Fragment>
        {jokerButtonAndHighScore()}
        <div className="question-label flex">
          <div className="m-auto">{questionLabel || "No question to show"}</div>
        </div>

        <div className="content-height-smaller flex flex-col items-center">
          {shuffledQuestions.length > 1 &&
            shuffledQuestions.map((answer) => (
              <Button
                className="question-button"
                disabled={answer.disabled}
                value={answer.value}
                key={answer.value}
                label={decodeString(answer.value)}
                onClick={handleButtonClick(answer.value)}
              />
            ))}
        </div>
      </React.Fragment>
    );
  };

  const toolbar = () => {
    return (
      <div className="w-full toolbar flex">
        <div className="w-full flex">
          <span className="m-auto">
            Question{" "}
            <span className="font-bold">
              {questions.length > 0 ? currentQuestionNumber + 1 : 0}
            </span>{" "}
            / {questions.length}
          </span>
        </div>
        <div className="w-full flex flex-col">
          {renderQuestionPage && (
            <React.Fragment>
              <div className="w-full flex h-full">
                <span className="m-auto mb-0">{userPoint}</span>
              </div>
              <span className="flex justify-center h-full">Points</span>
            </React.Fragment>
          )}
        </div>
        <div className="w-full flex">
          {renderQuestionPage && (
            <span className="m-auto">Remaining Time: {remainingTime}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className="w-full h-full flex flex-col background-lightgray overflow-auto"
    >
      {toolbar()}
      {renderQuestionPage && questionPage()}
      {renderCorrectAnswerPage && correctAnswerPage()}
      {renderWrongAnswerPage && wrongAnswerPage()}
      {renderGameCompletedPage && gameCompletedPage()}
      {loader && <div id="cover-spin"></div>}
    </div>
  );
};
export default withRouter(QuestionsView);
