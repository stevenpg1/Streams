import _ from 'lodash';

import { CREATE_STREAM, EDIT_STREAM,
    FETCH_STREAMS, FETCH_STREAM,
    DELETE_STREAM } from "../actions/types";

export default (state = {}, action) => {
    switch(action.type){
        case FETCH_STREAMS:
            return {...state,  ..._.mapKeys(action.payload,'id')};
        case FETCH_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case CREATE_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case EDIT_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case DELETE_STREAM:
            //in the case of delete the payload IS the id only
            return _.omit(state, action.payload);
        default:
            return state;
    };
};