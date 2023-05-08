import { combineReducers } from "redux";
import posts from "./posts"
import auth from "./auth"
import short from "./short"
export default combineReducers({
    posts,auth,short
})