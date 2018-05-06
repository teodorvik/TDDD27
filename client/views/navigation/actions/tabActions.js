import { SELECT_TAB } from './actionConstants';

export const selectTabAction = id => ({
    type: SELECT_TAB,
    payload: id
});