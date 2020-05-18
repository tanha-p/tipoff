import axios from 'axios';

class Auth {
    constructor(){
        this.authenticated = false;
        this.user = null;
        this.token_name = 'tipoff_token';
        this.tipoff_user_label = 'tipoff-user';
        //Check if token exists in local storage. 
        const token = localStorage.getItem(this.token_name);
        if(token && token.length){
            //Token found so set the authenticated to true & set axios header
            this._setAxiosDefaultAuthHeader(token);
            this.authenticated = true;
            this.user = localStorage.getItem(this.tipoff_user_label)
        }

        
    }

    login(token, user, callback) {
        this.authenticated = true;
        this.user = user.name;
        /** 
         * set Authorization header for axios for all 
         * subsequent requests
         */
        this._setAxiosDefaultAuthHeader(token);
        /**
         * Set the token in localstorage to avoid loggin in again
         * everytime the page is refreshed before the token expires
         */
        localStorage.setItem(this.token_name,token);
        localStorage.setItem(this.tipoff_user_label,user.name);
        callback();
    }

    logout(callback) {
        this.authenticated = false;
        this.user = null;
        localStorage.removeItem(this.token_name,null);
        localStorage.removeItem(this.tipoff_user_label,null);
        this._setAxiosDefaultAuthHeader(null);
        callback();
    }

    isAuthenticated() {
        return this.authenticated;
    }

    getUser() {
        return this.user;
    }

    _setAxiosDefaultAuthHeader(token){
        axios
            .defaults
            .headers
            .common['Authorization'] = token && token.length? 'Bearer '+token : null;
    }
}

export default new Auth();