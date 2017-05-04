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

  html(text = "") {
    if(text.length > 0) {
      this.elements.forEach((el) => {
        el.innerHTML = text;
      });
    }
    else {
      return this.elements[0].innerHTML;
    }
  }

  append() {

  }

  find() {

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
