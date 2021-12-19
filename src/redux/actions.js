import { createStore } from "redux";
import { CHANGE_USERNAME } from "./actionConstants";

export const changeUsernameStatus = newUsernameStatus => ({
    type: CHANGE_USERNAME,
    payload: {
        newUsernameStatus: newUsernameStatus
    }
});
