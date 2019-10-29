import {createStore} from 'redux';
import { userReducer } from './reducers/userreducer';
import {combineReducers} from 'redux';
import { projectReducer } from './reducers/projectreducer';
import { bugReducer } from './reducers/bugreducer';
export const store = createStore(combineReducers({projectReducer:projectReducer,userReducer:userReducer,bugReducer:bugReducer}));
store.subscribe(()=>{
console.log('Subscribe..... ',store.getState());
});