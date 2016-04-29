/**
 * @author sarkiroka
 */
var rabcs=require('./lib/reverse-array-by-control-stream');
var data=['a','b','c','d','e','f','g'];
var control=[0,0,0,0,0,1,1];

var result=rabcs(control,data);

console.log(result);
