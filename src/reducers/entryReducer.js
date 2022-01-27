import { ENTRY_CREATE_FAIL, ENTRY_CREATE_REQUEST, ENTRY_CREATE_SUCCESS, ENTRY_GET_FAIL, ENTRY_GET_REQUEST, ENTRY_GET_SUCCESS } from "../constants/entryConstants";

export const createEntryReducer = (state = { loading: false }, action) => {
    switch (action.type) {
        case ENTRY_CREATE_REQUEST:
            return { loading: true }
        case ENTRY_CREATE_SUCCESS:
            return { loading: false, entry: action.payload }
        case ENTRY_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const listEntriesReducer = (state = { loading: false }, action) => {
    switch (action.type) {
        case ENTRY_GET_REQUEST:
            return { loading: true }
        case ENTRY_GET_SUCCESS:
            return { loading: false, entries: action.payload }
        case ENTRY_GET_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}