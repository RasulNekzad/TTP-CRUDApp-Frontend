import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCampusesThunk } from "../redux/campus/campus.actions";
import ListItems from "../components/ListItems";

const Campuses = () => {
  const allCampuses = useSelector((state) => state.campus.allCampuses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCampusesThunk());
  }, []);

  return (
    <div>
      <h1>Campuses</h1>
      <ListItems list={allCampuses} />
    </div>
  );
};

export default Campuses;
