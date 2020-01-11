'use strict';

/* 関数を以下に追加する */
const func_table = {
//  "test-func" : require('./test_func').handler,
//  "test-dialogflow" : require('./test_dialogflow').fulfillment,
"request" : require('./request').handler,
"node" : require('./node').handler,
};
const alexa_table = {
//  "test-alexa" : require('./test_alexa').handler,
//  "test-clova": require('./test-clova').handler,
};
const lambda_table = {
//  "test-lambda" : require('./test-lambda').handler,
//  "forward_lambda" : require('./forward_lambda').handler,
};
const express_table = {
//  "test-express": require('./test-express').handler,
};
/* ここまで */

/* 必要に応じて、バイナリレスポンスのContent-Typeを以下に追加する */
const binary_table = [
//  'application/octet-stream',
];

module.exports = { func_table, alexa_table, lambda_table, express_table, binary_table };
