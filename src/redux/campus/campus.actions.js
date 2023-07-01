import axios from "axios";

import CampusActionType from "./campus.types";

export const fetchAllCampuses = (payload) => {
  return {
    type: CampusActionType.FETCH_ALL_CAMPUSES,
    payload,
  };
};

export const deleteCampusById = (payload) => {
  return {
    type: CampusActionType.DELETE_CAMPUS_BY_ID,
    payload,
  };
};

export const updateCampusById = (payload) => {
  return {
    type: CampusActionType.UPDATE_CAMPUS_DATA_BY_ID,
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

export const deleteCampusByIdThunk = (campusId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:8080/api/campus/${campusId}`);
      dispatch(deleteCampusById(campusId));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateCampusByIdThunk = (campusId, updatedCampus) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/campus/${campusId}`,
        updatedCampus
      );
      dispatch(updateCampusById(response.data.newData));
    } catch (error) {
      console.error(error);
    }
  };
};
