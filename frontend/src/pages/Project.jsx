import React from "react";
import { useParams } from "react-router-dom";

function Project() {
  const { id } = useParams();
  return (
    <div>
      <h2>Project Page</h2>
      <p>This is a dummy Project page for project ID: {id}</p>
    </div>
  );
}

export default Project;
