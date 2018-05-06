import { SELECT_TAB } from '../actions/actionConstants';

export const activeTab = (state = 0, action) => {
    switch (action.type) {
        case SELECT_TAB: 
            return action.payload;
        default:
            return state;
    }
}
