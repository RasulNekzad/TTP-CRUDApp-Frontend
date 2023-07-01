import CampusActionType from "./campus.types";

export const INITIAL_CAMPUS_STATE = {
  allCampuses: [],
};

const campusReducer = (state = INITIAL_CAMPUS_STATE, { type, payload }) => {
  switch (type) {
    case CampusActionType.FETCH_ALL_CAMPUSES:
      return { ...state, allCampuses: payload };
    case CampusActionType.DELETE_CAMPUS_BY_ID:
      const updatedCampuses = state.allCampuses.filter(
        (campus) => campus.id !== payload
      );
      return { ...state, allCampuses: updatedCampuses };
    case CampusActionType.UPDATE_CAMPUS_DATA_BY_ID:
      const updatedCampusIndex = state.allCampuses.findIndex(
        (campus) => campus.id === payload.id
      );
      if (updatedCampusIndex !== -1) {
        const updatedCampus = {
          ...state.allCampuses[updatedCampusIndex],
          ...payload,
        };
        const updatedCampuses = [
          ...state.allCampuses.slice(0, updatedCampusIndex),
          updatedCampus,
          ...state.allCampuses.slice(updatedCampusIndex + 1),
        ];
        return { ...state, allCampuses: updatedCampuses };
      }
      return state;
    default:
      return state;
  }
};

export default campusReducer;
