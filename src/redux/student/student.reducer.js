import StudentActionType from "./student.types";

export const INITIAL_STUDENT_STATE = {
  allStudents: [],
};

const studentReducer = (state = INITIAL_STUDENT_STATE, { type, payload }) => {
  switch (type) {
    case StudentActionType.FETCH_ALL_STUDENTS:
      return { ...state, allStudents: payload };

    default:
      return state;
  }
};

export default studentReducer;
