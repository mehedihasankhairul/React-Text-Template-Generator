import React, { useState } from "react";
import Editor from "./Editor";
import Results from "./Results";

const Template = () => {
  const [inputText, setInputText] = useState("");
  const [variableValues, setVariableValues] = useState({});

  const handleInputChange = (event) => {
    const newText = event.target.value;

    setInputText(newText);
    extractVariables(newText);
  };

  const extractVariables = (text) => {
    const regex = /{{(.*?)}}/g;
    const matches = text.matchAll(regex);
    const extractedVariables = [];

    for (const match of matches) {
      const variableName = match[1];
      extractedVariables[variableName] = "";
    }

    setVariableValues(extractedVariables);
  };

  const handleVariableInputChange = (variableName, value) => {
    setVariableValues((prevValues) => ({
      ...prevValues,
      // slice(2, -2) removes the curly braces from the variable name
      [variableName.slice(2, -2)]: value,
    }));
  };

  const generateMergedText = () => {
    let mergedText = inputText;

    for (const variable in variableValues) {
      const regex = new RegExp(`{{${variable}}}`, "g");
      mergedText = mergedText.replace(regex, variableValues[variable]);
    }

    return mergedText;
  };

  return (
    <div>
      <h2>Your Template Text</h2>
      <p>Enter your template text below. Use double curly braces to indicate variables.</p>
      <textarea
        id="editor"
        name="editor"
        rows="10"
        cols="80"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter Your Text Here"
      />

      <Editor
        inputText={inputText}
        variableValues={variableValues}
        handleVariableInputChange={handleVariableInputChange}
      />

      <Results generateMergedText={generateMergedText} />
    </div>
  );
};

export default Template;
