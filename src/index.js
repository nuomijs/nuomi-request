import axios from 'axios';
import jsonp from 'jsonp';
import mock from './mock';

function request() {

};

const defaultOptions = {};

const types = {
    
};

request.add = function(type, callback){
    types[type] = callback;
}

request.create = function(requests, mocks) {
    
};

request.config = function(options) {

};

axios.jsonp = function() {
    
}

request.axios = axios;

export default request;