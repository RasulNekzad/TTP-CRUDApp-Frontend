import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCampusesThunk } from "../redux/campus/campus.actions";
import { CampusCompact, AddCampusForm } from "../components";
import { useNavigate } from "react-router-dom";

const Campuses = () => {
  const allCampuses = useSelector((state) => state.campus.allCampuses);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllCampusesThunk());
  }, []);

  const handleClick = () => {
    navigate("/add-campus");
  };

  return (
    <div>
      <div className="campusesHeader">
        <h1 style={{ fontSize: "50px" }}>All Campuses</h1>
        <button onClick={handleClick} className="addButton">
          Add Campus
        </button>
      </div>
      <div className="campusListContainer">
        {allCampuses
          .sort((a, b) => a.id - b.id)
          .map((campus) => {
            return (
              <div key={campus.id}>
                <CampusCompact campus={campus} />
              </div>
            );
          })}
      </div>
      {allCampuses.length === 0 && (
        <h2 style={{ textAlign: "center" }}>
          There are currently no registered campuses.
        </h2>
      )}
    </div>
  );
};

export default Campuses;
