import { 
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_ERROR,
    GET_PROJECTS_SUCCESS,
    GET_PROJECTS_ERROR,
    RESET_PROJECT_STATES,
    RESET_USER_STATES, 
    GET_STATS_SUCCESS,
    UPDATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_ERROR
} from "./actionTypes";

const initialState = {
    user: {
        userData: {},
        success: "",
        error: ""
    },
    projects: {
        projectsData: [],
        success: "",
        error: ""
    },
    stats: {inProgress: 0, total: 0, completed: 0, archived: 0} 
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_USER_SUCCESS:
            return { 
                ...state, 
                user: {
                    userData: action.user,
                    success: action.user.success,
                    error: ""
                } 
            }
        case LOGIN_USER_ERROR:
            return { 
                ...state, 
                user: {
                    ...state.user,
                    success: "",
                    error: action.user.error
                } 
            }
        case REGISTER_USER_SUCCESS:
            return { 
                ...state, 
                user: {
                    ...state.user,
                    success: action.user.success,
                    error: ""
                } 
            }
        case REGISTER_USER_ERROR:
            return { 
                ...state, 
                user: {
                    ...state.user,
                    success: "",
                    error: action.user.error
                } 
            }
        case ADD_PROJECT_SUCCESS:
            return {
                ...state,
                projects: {
                    ...state.projects,
                    success: action.projects.success,
                    error: "",
                    projectsData: [...state.projects.projectsData, action.projects.data]
                }
            }
        case ADD_PROJECT_ERROR:
            return {
                ...state,
                projects: {
                    ...state.projects,
                    error: action.projects.error,
                    success: "",
                }
            }
        case GET_PROJECTS_SUCCESS:
            return {
                ...state,
                projects: {
                    ...state.projects,
                    projectsData: action.projects.data
                }
            }
        case GET_PROJECTS_ERROR:
            return {
                ...state,
                projects: {
                    ...state.projects,
                }
            }
        case UPDATE_PROJECT_SUCCESS:
            return {
                ...state,
                projects: {
                    ...state.projects,
                    projectsData: state.projects.projectsData.filter(item => item._id !== action.projects.id)
                }
            }
        case UPDATE_PROJECT_ERROR:
            return state
        case RESET_PROJECT_STATES: 
            return {
                ...state,
                projects: {
                    ...state.projects,
                    success: "",
                    error: ""
                }
            }
        case RESET_USER_STATES: 
            return {
                ...state,
                user: {
                    ...state.user,
                    success: "",
                    error: ""
                }
            }
        case GET_STATS_SUCCESS:
            return {
                ...state,
                stats: {
                    ...action.stats
                }
            }
        default:
            return state;
    }
}

export default reducer;