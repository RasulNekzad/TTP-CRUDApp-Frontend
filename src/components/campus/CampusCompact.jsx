import React from "react";
import { Link } from "react-router-dom";
import { deleteCampusByIdThunk } from "../../redux/campus/campus.actions";
import { useDispatch } from "react-redux";

const CampusCompact = ({ campus }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(deleteCampusByIdThunk(campus.id));
  };

  return (
    <>
      <div>
        <h1>
          <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
          <button onClick={handleClick}>X</button>
        </h1>
        <img src={campus.imageUrl} />
      </div>
      <hr />
    </>
  );
};

export default CampusCompact;
