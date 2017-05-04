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
      el.parent.removeChild(el);
    });
  }

  attr(atr) {
    this.elements.forEach((el) => {
      el.getAttribute(atr);
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

  }

  parent() {

  }

  each(callback) {
    this.elements.forEach(callback);
  }

}

module.exports = DomNodeCollection;
