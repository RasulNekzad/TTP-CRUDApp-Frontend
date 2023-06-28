import { combineReducers } from "redux";
import studentReducer from "./student/student.reducer";
import campusReducer from "./campus/campus.reducer";

const rootReducer = combineReducers({
  student: studentReducer,
  campus: campusReducer,
});

export default rootReducer;
