const DomNodeCollection = require('./dom_node_collection.js');
const _documentIsReady = false;
const _documentReadyFunctions = new Array();

function $l(argument) {
  if(typeof(argument) === 'string') {
    const elementList = document.querySelectorAll(argument);
    const nodes = Array.from(elementList);
    return new DomNodeCollection(nodes);
  } else if(typeof(argument) === 'function') {
    if(!_documentIsReady){
      _documentReadyFunctions.push(argument);
    } else {
      argument();
    }
  }
}

$l.ajax = function(options) {
  const request = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };
  options = $l.extend(defaults, options);
  options.method = options.method.toUpperCase();

  if (options.method === "GET"){
    let result = "";
    for(let prop in options.data){
      if (options.data.hasOwnProperty(prop)){
        result += prop + "=" + options.data[prop] + "&";
      }
    }
    options.url += "?" + result.substring(0, result.length - 1);
  }

  request.open(options.method, options.url, true);
  request.onload = e => {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
};

document.addEventListener('DOMContentLoaded', () => {
  _documentIsReady = true;
  _documentReadyFunctions.forEach( func => func() );
});

window.$l = $l;
