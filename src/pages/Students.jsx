import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStudentsThunk } from "../redux/student/student.actions";
import ListItems from "../components/ListItems";

const Students = () => {
  const allStudents = useSelector((state) => state.student.allStudents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllStudentsThunk());
  }, []);

  return (
    <div>
      <h1>Students</h1>
      <ListItems list={allStudents} />
    </div>
  );
};

export default Students;
