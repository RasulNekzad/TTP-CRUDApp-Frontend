import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStudentsThunk } from "../redux/student/student.actions";

const Students = () => {
  const allStudents = useSelector((state) => state.student.allStudents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllStudentsThunk());
  }, []);

  return (
    <div>
      <h1>Students</h1>
    </div>
  );
};

export default Students;
