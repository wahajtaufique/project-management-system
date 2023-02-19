import { 
    LOGIN_USER,
    REGISTER_USER,
    ADD_PROJECT,
    GET_PROJECTS,
    RESET_PROJECT_STATES,
    RESET_USER_STATES, 
    GET_STATS,
    UPDATE_PROJECT
} from "./actionTypes";

export const loginUser = (payload) => ({ type: LOGIN_USER, payload });

export const registerUser = (payload) => ({type: REGISTER_USER, payload });

export const addProject = (payload) => ({type: ADD_PROJECT, payload});

export const getProjects = (payload) => ({type: GET_PROJECTS, payload});

export const updateProject = (payload) => ({type: UPDATE_PROJECT, payload});

export const resetProjectStates = () => ({type: RESET_PROJECT_STATES});

export const resetUserStates = () => ({type: RESET_USER_STATES});

export const getStats = () => ({type: GET_STATS});