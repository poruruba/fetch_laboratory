'use strict';

//var vConsole = new VConsole();

const baseurl = 'http://localhost:10080';

var vue_options = {
  el: "#top",
  data: {
    progress_title: '',

    param1: null,
    param2: null,
    response: {},
    type: 'post-json'
  },
  computed: {
    formatted_response: function() {
      return JSON.stringify(this.response, null, '\t');
    }
  },
  methods: {
    do_node: function() {
      var params = {
        type: this.type,
        param1: this.param1,
        param2: this.param2,
      };
      return do_post(baseurl + '/node', params)
        .then(json => {
          this.response = json;
        })
        .catch(error => {
          console.log(error);
          alert(error);
        });
    },

    do_post_json: function() {
      var params = {
        param1: this.param1,
        param2: this.param2,
      };
      return do_post(baseurl + '/post-json', params)
        .then(json => {
          this.response = json;
        })
        .catch(error => {
          console.log(error);
          alert(error);
        });
    },

    do_post_urlencoded: function() {
      var params = {
        param1: this.param1,
        param2: this.param2,
      };
      return do_post_urlencoded(baseurl + '/post-urlencoded', params)
        .then(json => {
          this.response = json;
        })
        .catch(error => {
          console.log(error);
        });
    },

    do_post_formdata: function() {
      var params = {
        param1: this.param1,
        param2: this.param2,
      };
      return do_post_formdata(baseurl + '/post-formdata', params)
        .then(json => {
          this.response = json;
        })
        .catch(error => {
          console.log(error);
        });
    },

    do_get_qs: function() {
      var qs = {
        param1: this.param1,
        param2: this.param2,
      }
      return do_get(baseurl + '/get-qs', qs)
        .then(json => {
          this.response = json;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  created: function() {},
  mounted: function() {
    proc_load();

    // ブラウザの戻る対策
    setTimeout(() => {
      this.param1 = "";
      this.param2 = "";
    }, 0);
  }
};
vue_add_methods(vue_options, methods_utils);
var vue = new Vue(vue_options);


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