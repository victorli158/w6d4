const DomNodeCollection = require('./dom_node_collection.js');

function $l(selector) {
  if(typeof(selector) === 'string') {
    const elementList = document.querySelectorAll(selector);
    const nodes = Array.from(elementList);
    return new DomNodeCollection(nodes);
  }
}

window.$l = $l;
