import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCampusesThunk } from "../redux/campus/campus.actions";
import { Campus } from "../components";
import { CampusCompact } from "../components";

const Campuses = () => {
  const allCampuses = useSelector((state) => state.campus.allCampuses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCampusesThunk());
    console.log("all campuses", allCampuses);
  }, []);

  useEffect(() => console.log("all campuses", allCampuses), [allCampuses]);
  return (
    <div>
      <h1>Campuses</h1>
      <div className="campusListDiv">
        {allCampuses.map((campus) => {
          console.log("im mapping this capus obj:", campus);
          return (
            <div key={campus.id}>
              {/* <Campus campusId={campus.id} /> */}
              <CampusCompact campus={campus} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Campuses;
