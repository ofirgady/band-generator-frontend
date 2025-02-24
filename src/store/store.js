import { combineReducers, compose, applyMiddleware, legacy_createStore as createStore } from 'redux'
import { bandReducer } from './band.reducer'

// Combine reducers
const rootReducer = combineReducers({
	bandModule: bandReducer,
})

// Enable Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Create store
export const store = createStore(rootReducer, composeEnhancers())
