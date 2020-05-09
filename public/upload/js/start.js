'use strict';

//var vConsole = new VConsole();

const base_url = 'http://localhost:10080';

var vue_options = {
    el: "#top",
    data: {
        progress_title: '', // for progress-dialog

        base_url: base_url,
        param_value: "param_1",
        submit_value: "送信",
        response: {},
    },
    computed: {
        formatted_response: function() {
            return JSON.stringify(this.response, null, '\t');
        }
    },
    methods: {
        do_upload: function(){
            var param = {
                upfile: this.file,
                param: this.param_value,
                submit: this.submit_value,
            };
            do_post_formdata(this.base_url + "/upload", param)
            .then(json =>{
                this.response = json;
            });
        },
        do_change: function(e){
            if (e.target.files.length > 0) {
                this.file = e.target.files[0];
            }
        },
    },
    created: function(){
    },
    mounted: function(){
        proc_load();
    }
};
vue_add_methods(vue_options, methods_bootstrap);
vue_add_components(vue_options, components_bootstrap);
var vue = new Vue( vue_options );

function do_post_formdata(url, params) {
    var body = Object.entries(params).reduce((l, [k, v]) => {
      l.append(k, v);
      return l;
    }, new FormData());
  
    return fetch(new URL(url).toString(), {
//        headers: { "Content-Type" : "multipart/form-data; charset=utf-8;" },
        method: 'POST',
        body: body,
      })
      .then((response) => {
        if (!response.ok)
          throw 'status is not 200';
        return response.json();
      });
}