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
    console.log("in campuses");
    dispatch(fetchAllCampusesThunk());
  }, []);

  const handleClick = () => {
    navigate("/add-campus");
  };

  return (
    <div>
      <h1>All Campuses</h1>
      <button onClick={handleClick}>Add Campus</button>
      <div className="campusListDiv">
        {allCampuses.map((campus) => {
          return (
            <div key={campus.id}>
              <CampusCompact campus={campus} />
            </div>
          );
        })}
      </div>
      {allCampuses.length === 0 && (
        <h2>There are currently no registered campuses.</h2>
      )}
    </div>
  );
};

export default Campuses;
