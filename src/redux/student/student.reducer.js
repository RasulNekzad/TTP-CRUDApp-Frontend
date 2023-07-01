import StudentActionType from "./student.types";

export const INITIAL_STUDENT_STATE = {
  allStudents: [],
};

const studentReducer = (state = INITIAL_STUDENT_STATE, { type, payload }) => {
  switch (type) {
    case StudentActionType.FETCH_ALL_STUDENTS:
      return { ...state, allStudents: payload };
    case StudentActionType.DELETE_STUDENT_BY_ID:
      const updatedStudents = state.allStudents.filter(
        (student) => student.id !== payload
      );
      return { ...state, allStudents: updatedStudents };
    case StudentActionType.UPDATE_STUDENT_DATA_BY_ID:
      const updatedStudentIndex = state.allStudents.findIndex(
        (student) => student.id === payload.id
      );
      if (updatedStudentIndex !== -1) {
        const updatedStudent = {
          ...state.allStudents[updatedStudentIndex],
          ...payload,
        };
        const updatedStudents = [
          ...state.allStudents.slice(0, updatedStudentIndex),
          updatedStudent,
          ...state.allStudents.slice(updatedStudentIndex + 1),
        ];
        return { ...state, allStudents: updatedStudents };
      }
      return state;
    default:
      return state;
  }
};

export default studentReducer;
