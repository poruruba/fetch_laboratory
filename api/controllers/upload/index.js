'use strict';

const HELPER_BASE = process.env.HELPER_BASE || '../../helpers/';
const Response = require(HELPER_BASE + 'response');
const BinResponse = require(HELPER_BASE + 'binresponse');

// Lambda＋API Gatewayの場合に必要
//const { URLSearchParams } = require('url');
//const multipart_parser = require('lambda-multipart-parser');
//const Multipart = require(HELPER_BASE + 'multipart');

exports.handler = async (event, context, callback) => {
  if( event.path == '/upload' ){
    // Lambda＋API Gatewayの場合はこちら
    //var body = await Multipart.parse(multipart_parser, event);
    // swagger_nodeの場合はこちら
    var body = JSON.parse(event.body);
    
    console.log('body', body);
    console.log('files', event.files);

    var response = {
      path : event.path,
      param: {
        param: body.param,
        submit: body.submit,
        upfile: event.files['upfile'][0].originalname,
      }
    };
    return new Response(response);
  }else
  if( event.path == '/download' ){
    var binary = [];
    for( var i = 0 ; i < 256 ; i++ )
      binary[i] = i;
    var response = new BinResponse("application/octet-stream", Buffer.from(binary));
    response.set_filename("output.bin");
    return response;
  }
};