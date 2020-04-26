import React from "react";
import Button from "../button/button";
import "./base-view.css";
import { difficulties, categories } from "./categories-difficulties";

const BaseView = React.forwardRef(({ ...props }, ref) => {
  const {
    className,
    title,
    message,
    userPoint,
    buttons,
    welcomePage,
    img
  } = props;

  const [difficulty, setDifficulty] = React.useState("easy");
  const [category, setCategory] = React.useState(9);

  React.useImperativeHandle(ref,() => ({
      example: () => [category, difficulty]
  }), [category,difficulty])

  return (
    <div className={`${className} items-center flex flex-col`}>
      <div className="my-8" style={{ width: img.props.width || "50%" }}>
        {img}
      </div>
      {title && <span className="base-view-label">{title}</span>}
      {message && <span className="base-view-label">{message}</span>}
      {userPoint && (
        <span className="base-view-label">Total: {userPoint} Points</span>
      )}
      {welcomePage && (
        <div className="mb-8 flex w-full">
          <div className="w-full flex justify-center ml-4 mr-2 flex-col sm:flex-row">
            <label className="pr-1" htmlFor="categories">
              Choose a category:{" "}
            </label>
            <select
              className="base-select"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              id="categories"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full flex justify-center ml-2 mr-4 flex-col sm:flex-row">
            <label className="pr-1" htmlFor="difficulties">
              Choose a difficulty:{" "}
            </label>
            <select
              className="base-select"
              onChange={(e) => setDifficulty(e.target.value)}
              value={difficulty}
              id="difficulties"
            >
              {difficulties.map((dif) => (
                <option key={dif.value} value={dif.value}>
                  {dif.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {buttons.map((button) => (
        <Button
          disabled={button.disabled}
          key={button.key || button.value}
          value={button.value}
          label={button.label}
          className={`${button.className || ""}`}
          onClick={button.onClick}
        />
      ))}
    </div>
  );
});

export default BaseView;
