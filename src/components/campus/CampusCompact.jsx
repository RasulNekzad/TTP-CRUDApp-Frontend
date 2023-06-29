import React from "react";
import { Link } from "react-router-dom";

const CampusCompact = ({ campus }) => {
  return (
    <>
      <div>
        <h1>
          <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
        </h1>
        <img src={campus.imageUrl} />
      </div>
      <hr />
    </>
  );
};

export default CampusCompact;
