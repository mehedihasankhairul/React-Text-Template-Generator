import React from "react";
import propTypes from "prop-types";

const Results = ({ generateMergedText }) => {
  return (
    <div>
      <h2>Results</h2>
      <textarea id="editor" name="editor" rows="10" cols="80" defaultValue={generateMergedText()} />
    </div>
  );
};

Results.propTypes = { generateMergedText: propTypes.func.isRequired };

export default Results;
