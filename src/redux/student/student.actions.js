import axios from "axios";

import StudentActionType from "./student.types";

export const fetchAllStudents = (payload) => {
  return {
    type: StudentActionType.FETCH_ALL_STUDENTS,
    payload,
  };
};

export const deleteStudentById = (payload) => {
  return {
    type: StudentActionType.DELETE_STUDENT_BY_ID,
    payload,
  };
};

export const updateStudentById = (payload) => {
  return {
    type: StudentActionType.UPDATE_STUDENT_DATA_BY_ID,
    payload,
  };
};

export const fetchAllStudentsThunk = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:8080/api/student");
      dispatch(fetchAllStudents(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteStudentByIdThunk = (studentId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:8080/api/student/${studentId}`);
      dispatch(deleteStudentById(studentId));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateStudentByIdThunk = (studentId, updatedStudent) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/student/${studentId}`,
        updatedStudent
      );
      dispatch(updateStudentById(response.data.newData));
    } catch (error) {
      console.error(error);
    }
  };
};
