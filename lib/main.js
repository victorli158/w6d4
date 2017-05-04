const DomNodeCollection = require('dom_node_collection'); 

function $l(selector) {
  if(typeof(selector) === 'string') {
    const elementList = document.querySelectorAll(selector);
    const nodes = Array.from(elementList);
  }
}


window.$l = $l;
