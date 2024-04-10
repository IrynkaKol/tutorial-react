import { createStore } from "redux";

let initialState = {
    title: 'Title',
    count: 0,
}

const reducer = ((state = initialState, action) => {
switch(action.type) {
    case 'SET_TITLE': {
        let count = state.count + 1;
        let title = `Title ${count}`;
        return {...state, title, count};
    }
        

    default: return state;
} 
})
const store = createStore(reducer);
export const setTitle = () => ({type: 'SET_TITLE'});

export default store;
