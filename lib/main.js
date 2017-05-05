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

document.addEventListener('DOMContentLoaded', () => {
  _documentIsReady = true;
  _documentReadyFunctions.forEach( func => func() );
});

window.$l = $l;
