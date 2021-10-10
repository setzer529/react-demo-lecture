import {requestMemos, createMemo, deleteMemo} from '../Services/memos.js'


//ACTIONS
const GET_MEMOS_REQUEST = 'memos/MEMOS/GET_MEMOS_REQUEST';
const GET_MEMOS_SUCCESS = 'memos/MEMOS/GET_MEMOS_SUCCESS';
const GET_MEMOS_FAILURE = 'memos/MEMOS/GET_MEMOS_FAILURE';

const LOGOUT = 'memos/user/LOGOUT';

//REDUCER
const initialState = {
    getMemosPending: false,
    getMemosFailure: false,
    memos: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_MEMOS_REQUEST:
            return {
                ...state,
                getMemosPending: true
            }

        case GET_MEMOS_SUCCESS:
            return {
                ...state,
                getMemosPending: false,
                getMemosFailure: false,
                memos: action.memos
            }

        case GET_MEMOS_FAILURE:
            return {
                ...state,
                getMemosPending: false,
                getMemosFailure: true
            }
        default:
            return state;
    }
}

//ACTION CREATORS
export function getMemosRequest() {
    return {type: GET_MEMOS_REQUEST}
}

export function getMemosSuccess(memos) {
    return {
        type: GET_MEMOS_SUCCESS,
        memos: memos
    }
}

export function getMemosFailure() {
    return {type: GET_MEMOS_FAILURE}
}

export function logout() {
    return {type: LOGOUT}
}

// //SIDE EFFECTS
export function initiateGetMemos() {
    return function getMemos(dispatch, getState) {
        dispatch(getMemosRequest())
        requestMemos(getState().user.token).then(response => {
            console.log(response);
            if (!response.ok) {
                dispatch(getMemosFailure())
                return
            }

            response.json().then(json => {
                if (!json.memo_list) {
                    console.log('getMemosFailure')
                    dispatch(getMemosFailure())
                }

                dispatch(getMemosSuccess(json.memo_list))
            })
        })
    }
}
