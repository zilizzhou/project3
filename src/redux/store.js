import {createStore} from "redux";
import {INITIAL_STATE} from "./stateConstants";
import {CHANGE_USERNAME} from "./actionConstants";


const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return {
                ...state,
                username: action.username 
            };
        case 'UPDATE_JOB_OWNER':
            return {
                ...state,
                jobOwner: action.jobOwner 
            };
        default:
            return state;
    }
}

export default createStore(rootReducer);