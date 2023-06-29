import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCampusesThunk } from "../redux/campus/campus.actions";
import { CampusCompact } from "../components";

const Campuses = () => {
  const allCampuses = useSelector((state) => state.campus.allCampuses);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("in campuses");
    dispatch(fetchAllCampusesThunk());
  }, []);

  return (
    <div>
      <h1>Campuses</h1>
      <div className="campusListDiv">
        {allCampuses.map((campus) => {
          return (
            <div key={campus.id}>
              <CampusCompact campus={campus} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Campuses;
