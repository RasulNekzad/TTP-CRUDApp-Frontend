import axios from "axios";

import CampusActionType from "./campus.types";

export const fetchAllCampuses = (payload) => {
  return {
    type: CampusActionType.FETCH_ALL_CAMPUSES,
    payload,
  };
};

export const fetchAllCampusesThunk = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:8080/api/campus");
      dispatch(fetchAllCampuses(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};
