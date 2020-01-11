'use strict';

const HELPER_BASE = process.env.HELPER_BASE || '../../helpers/';
const Response = require(HELPER_BASE + 'response');
const Redirect = require(HELPER_BASE + 'redirect');

const FormData = require('form-data');
const fetch = require('node-fetch');
const { URL, URLSearchParams } = require('url');
const Headers = fetch.Headers;

const baseurl = 'http://localhost:10080';

exports.handler = async (event, context, callback) => {
  if( event.path == '/node'){
    console.log(event.body);

    var body = JSON.parse(event.body);
    if( body.type == "post-json"){
      var params = {
        param1: body.param1,
        param2: body.param2,
      };
      return do_post(baseurl + '/post-json', params)
        .then(json => {
          console.log(json);
          return new Response({ type: body.type, resposne: json });
        })
        .catch(error => {
          console.log(error);
          return new Response(error);
        });
    }else
    if( body.type == "post-urlencoded"){
      var params = {
        param1: body.param1,
        param2: body.param2,
      };
      return do_post_urlencoded(baseurl + '/post-urlencoded', params)
        .then(json => {
          console.log(json);
          return new Response({ type: body.type, resposne: json });
        })
        .catch(error => {
          console.log(error);
          return new Response(error);
        });
    }else
    if( body.type == "post-formdata"){
      var params = {
        param1: body.param1,
        param2: body.param2,
      };
      return do_post_formdata(baseurl + '/post-formdata', params)
        .then(json => {
          console.log(json);
          return new Response({ type: body.type, resposne: json });
        })
        .catch(error => {
          console.log(error);
          return new Response(error);
        });
    }else
    if( body.type == 'get-qs'){
      var qs = {
        param1: body.param1,
        param2: body.param2,
      }
      return do_get(baseurl + '/get-qs', qs)
        .then(json => {
          console.log(json);
          return new Response({ type: body.type, resposne: json });
        })
        .catch(error => {
          console.log(error);
          return new Response(error);
        });
    }

    var response = {
      type : body.type,
      param: {
        param1: body.param1,
        param2: body.param2,
      }
    };
    return new Response(response);
  }
};


function do_post(url, body) {
  const headers = new Headers({ "Content-Type": "application/json; charset=utf-8" });

  return fetch(new URL(url).toString(), {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers
    })
    .then((response) => {
      if (!response.ok)
        throw 'status is not 200';
      return response.json();
    });
}

function do_get(url, qs) {
  var params = new URLSearchParams(qs);
  var url2 = new URL(url);
  url2.search = params;

  return fetch(url2.toString(), {
      method: 'GET',
    })
    .then((response) => {
      if (!response.ok)
        throw 'status is not 200';
      return response.json();
    });
}

function do_post_urlencoded(url, params) {
  const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  var body = new URLSearchParams(params);

  return fetch(new URL(url).toString(), {
      method: 'POST',
      body: body,
      headers: headers
    })
    .then((response) => {
      if (!response.ok)
        throw 'status is not 200';
      return response.json();
    })
}

function do_post_formdata(url, params) {
  var body = Object.entries(params).reduce((l, [k, v]) => {
    l.append(k, v);
    return l;
  }, new FormData());

  return fetch(new URL(url).toString(), {
      method: 'POST',
      body: body,
    })
    .then((response) => {
      if (!response.ok)
        throw 'status is not 200';
      return response.json();
    });
}