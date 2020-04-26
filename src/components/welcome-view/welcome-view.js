import React from "react";
import "./welcome-view.css";
import { withRouter } from "react-router-dom";
import BaseView from "../base-view/base-view";
import Lottie from "react-lottie";
import Button from "../button/button"
import "./welcome-view.css";
const welcomeData = require("./assets/12546-welcome.json");

const options = {
  loop: true,
  autoplay: true,
  animationData: welcomeData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const WelcomeView = ({ ...props }) => {
  const ref = React.useRef();

  const handleClick = () => {
    const current = ref.current.example();
        props.history.push(`/category/${current[0]}/difficulty/${current[1]}`);
    };
    const handleRandomButtonClick = () => {
        props.history.push(`/random`);
    };

    return (
      <div
        className="w-full h-full flex flex-col items-center background-lightgray overflow-auto"
      >
        <BaseView
          ref={ref}
          className="mt-20"
          img={<Lottie options={options} />}
          welcomePage
          title="A TRIVIA GAME"
          message="Select category and difficulty then you are ready to go. Have Fun!"
          buttons={[
            {
              key: "1",
              value: "",
              label: "GET STARTED",
              onClick: handleClick,
            },
          ]}
        />
        <div className="flex flex-col items-center animation">
          <div className="mt-4 mb-8 mx-4">
            <div>
              OR IF YOU ARE A TRUE CHALLENGER, CHOOSE THE OPTIONS RANDOMLY AND{" "}
              <span className="font-bold">BE REWARDED</span>
            </div>
          </div>
          <Button
            value={""}
            label={"GO FOR IT"}
            className="random-button"
            onClick={handleRandomButtonClick}
          />
        </div>
      </div>
    );
};

export default withRouter(WelcomeView);
