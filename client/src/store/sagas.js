import { call, put, takeEvery } from 'redux-saga/effects';
import { 
    ADD_PROJECT, 
    LOGIN_USER, 
    GET_PROJECTS,
    REGISTER_USER,
    LOGIN_USER_SUCCESS, 
    LOGIN_USER_ERROR,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_ERROR,
    GET_PROJECTS_SUCCESS,
    GET_PROJECTS_ERROR,
    RESET_PROJECT_STATES,
    RESET_PROJECT_STATES_SUCCESS,
    RESET_USER_STATES,
    RESET_USER_STATES_SUCCESS,
    GET_STATS,
    GET_STATS_SUCCESS,
    UPDATE_PROJECT,
    UPDATE_PROJECT_ERROR,
    UPDATE_PROJECT_SUCCESS
 } from './actionTypes';
import Axios from '../config/axios';

const registerUserAPICall = async (payload) => await Axios.post('/users/register', payload)

function* registerUser({payload}) {
    try {
        const req = yield call(registerUserAPICall, payload);
        if (req.data.status) {
            yield put({ type: REGISTER_USER_SUCCESS, user: { success: req.data.message }});
        } else {
            localStorage.removeItem('@token');
			localStorage.removeItem('authUser');
            yield put({type: REGISTER_USER_ERROR, user: { error: req.data.message}})
        }
    } catch (error) {
        localStorage.removeItem('@token');
		localStorage.removeItem('authUser');
        yield put({type: REGISTER_USER_ERROR, user: { error: error.message}})
    }
}

const addProjectAPICall = async (payload) => await Axios.post('/projects/add', payload)

function* addProject({payload}) {
    try {
        const req = yield call(addProjectAPICall, payload);
        if (req.data.status) {
            yield put({ type: ADD_PROJECT_SUCCESS, projects: { success: req.data.message, data: req.data.project} });
        } else {
            yield put({type: ADD_PROJECT_ERROR, projects: { error: req.data.message } })
        }
    } catch (error) {
        localStorage.removeItem('@token');
		localStorage.removeItem('authUser');
        yield put({type: ADD_PROJECT_ERROR, projects: { error: error.message } })
    }
}

const getProjectsAPICall = async (payload) => await Axios.get("/projects", { params: payload})

function* getProjects({payload}) {
    try {
        yield put({ type: GET_PROJECTS_SUCCESS, projects: { data: [] } });
        const req = yield call(getProjectsAPICall, payload);
        if (req.data.status) {
            yield put({ type: GET_PROJECTS_SUCCESS, projects: { success: req.data.message, data: req.data.projects || []} });
        } else {
            yield put({type: GET_PROJECTS_ERROR, projects: { error: req.data.message } })
        }
    } catch (error) {
        localStorage.removeItem('@token');
		localStorage.removeItem('authUser');
        yield put({type: GET_PROJECTS_ERROR, projects: { error: error.message } })
    }
}

const loginUserAPICall = async (payload) => await Axios.post('/users/login', payload);

function* loginUser({payload}) {
    try {
        const req = yield call(loginUserAPICall, payload);
        if (req.data.status) {
            localStorage.setItem("authUser", JSON.stringify(req.data.user));
            localStorage.setItem("@token", req.data.token);
            yield put({ type: LOGIN_USER_SUCCESS, user: { success: req.data.message, data: req.data.user } })
        } else {
            localStorage.removeItem('@token');
			localStorage.removeItem('authUser');
            yield put({type: LOGIN_USER_ERROR, user: { error: req.data.message}})
        }
    } catch (error) {
        localStorage.removeItem('@token');
		localStorage.removeItem('authUser');
        yield put({type: REGISTER_USER_ERROR, user: { error: error.message}})
    }
}

function* resetProjectStates() {
    try {
        yield put({ type: RESET_PROJECT_STATES_SUCCESS })
    } catch (error) {
        localStorage.removeItem('@token');
		localStorage.removeItem('authUser');
        window.location.reload();
    }
}

function* resetUserStates() {
    try {
        yield put({ type: RESET_USER_STATES_SUCCESS })
    } catch (error) {
        localStorage.removeItem('@token');
		localStorage.removeItem('authUser');
        window.location.reload();
    }
}

const getStatsAPICall = async () => await Axios.get("/projects/stats");

function* getStats() {
    try {
        const req = yield call(getStatsAPICall);
        if (req.data.status) {
            yield put({ type: GET_STATS_SUCCESS, stats: { ...req.data.stats } });
        } else {
            yield put({type: GET_PROJECTS_ERROR, projects: { error: req.data.message } })
        }
    } catch (error) {
        localStorage.removeItem('@token');
		localStorage.removeItem('authUser');
        yield put({type: GET_PROJECTS_ERROR, projects: { error: error.message } })
    }    
}

const updateProjectAPICall = async (payload) => await Axios.patch("/projects", payload)

function* updateProject({payload}) {
    try {
        const req = yield call(updateProjectAPICall, payload);
        if (req.data.status) {
            yield put({ type: UPDATE_PROJECT_SUCCESS, projects: { id: payload.id } });
        } else {
            yield put({type: UPDATE_PROJECT_ERROR, projects: { error: req.data.message } })
        }
    } catch (error) {
        localStorage.removeItem('@token');
		localStorage.removeItem('authUser');
        yield put({type: UPDATE_PROJECT_ERROR, projects: { error: error.message } })
    }
}

function* mySaga() {
    yield takeEvery(LOGIN_USER, loginUser);
    yield takeEvery(REGISTER_USER, registerUser);
    yield takeEvery(ADD_PROJECT, addProject);
    yield takeEvery(GET_PROJECTS, getProjects);
    yield takeEvery(UPDATE_PROJECT, updateProject);
    yield takeEvery(RESET_PROJECT_STATES, resetProjectStates);
    yield takeEvery(RESET_USER_STATES, resetUserStates);
    yield takeEvery(GET_STATS, getStats);
}

export default mySaga;