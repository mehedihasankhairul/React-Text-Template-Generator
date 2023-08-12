import React from "react";
import propTypes from "prop-types";

const Editor = ({ inputText, variableValues, handleVariableInputChange }) => {
  return (
    <div>
      <h2>Editor</h2>
      {inputText &&
        inputText.split("\n").map(
          (sentence, sentenceIndex) => (
            console.log(sentence, "sentence"),
            (
              <div key={sentenceIndex}>
                {sentence.split(/({{.*?}})/).map((part, index) =>
                  part.startsWith("{{") && part.endsWith("}}") ? (
                    // extract the variable name from the part
                    part
                      .slice(2, -2)
                      .split(",")
                      .map((variable, index) => (
                        <input
                          key={index}
                          type="text"
                          defaultValue=""
                          onChange={(e) => handleVariableInputChange(part, e.target.value)}
                        />
                      ))
                  ) : (
                    <span key={index}>{part}</span>
                  )
                )}
              </div>
            )
          )
        )}
    </div>
  );
};

Editor.propTypes = {
  inputText: propTypes.string.isRequired,
  variableValues: propTypes.object.isRequired,
  handleVariableInputChange: propTypes.func.isRequired,
};

export default Editor;
