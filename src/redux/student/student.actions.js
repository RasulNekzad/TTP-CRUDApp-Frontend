import axios from "axios";
import StudentActionType from "./student.types";
import { BASE_URL } from "../../Api/baseUrl";

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
      const response = await axios.get(`${BASE_URL}/api/student`);
      dispatch(fetchAllStudents(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteStudentByIdThunk = (studentId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${BASE_URL}/api/student/${studentId}`);
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
        `${BASE_URL}/api/student/${studentId}`,
        updatedStudent
      );
      dispatch(updateStudentById(response.data.newData));
    } catch (error) {
      console.error(error);
    }
  };
};
