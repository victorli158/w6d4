class DomNodeCollection {
  constructor(htmlElements) {
    this.elements = htmlElements;
  }

  empty () {
    this.elements.forEach((el) => {
      while(el.firstChild)
        el.removeChild(el.firstChild);
    });
  }

  remove() {
    this.elements.forEach((el) => {
      el.parentElement.removeChild(el);
    });
  }

  attr(atr, val) {
    this.elements.forEach((el) => {
      el.setAttribute(atr, val);
    });
  }

  addClass(cls) {
    this.elements.forEach((el) => {
      el.classList.add(cls);
    });
  }

  removeClass(cls) {
    this.elements.forEach((el) => {
      el.classList.remove(cls);
    });
  }

  html(text) {
    if(typeof(text) === 'string') {
      this.elements.forEach((el) => {
        el.innerHTML = text;
      });
    }
    else {
      return this.elements[0].innerHTML;
    }
  }

  append(children) {
    if (this.elements.length === 0)
      return;

    if (typeof children === 'object' &&
        !(children instanceof DomNodeCollection)) {
      children = new DomNodeCollection(children);
    }

    if (typeof children === "string") {
      this.each(el => {el.innerHTML += children;});
    } else if (children instanceof DomNodeCollection) {
      this.each(el => {
        children.each(childNode => {
          el.appendChild(childNode.cloneNode(true));
        });
      });
    }
  }

  find(selector) {
    let foundNodes = [];
    this.each(el => {
      const elList = el.querySelectorAll(selector);
      foundNodes = foundNodes.concat(Array.from(elList));
    });
    return new DomNodeCollection(foundNodes);
  }

  children() {
    let childNodes = [];
    this.each(node => {
      const childNodeList = node.children;
      childNodes = childNodes.concat(Array.from(childNodeList));
    });
    return new DomNodeCollection(childNodes);
  }

  parent() {
    const parentNodes = [];

    this.each( (el) => {
      if(el.visited)
        parentNodes.push(el);
      else
        el.visited = true;
    });

    parentNodes.forEach((node) => {node.visited = false; });
    return new DomNodeCollection(parentNodes);
  }

  each(callback) {
    this.elements.forEach(callback);
  }

}

module.exports = DomNodeCollection;
