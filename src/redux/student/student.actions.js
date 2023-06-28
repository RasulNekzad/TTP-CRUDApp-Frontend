import axios from "axios";

import StudentActionType from "./student.types";

export const fetchAllStudents = (payload) => {
  return {
    type: StudentActionType.FETCH_ALL_STUDENTS,
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
