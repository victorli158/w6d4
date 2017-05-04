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
    const wholeWord = new RegExp("\\b" + cls + "\\b");
    this.elements.forEach((el) => {
      if(!wholeWord.test(el.className)) {
        el.className += " " + cls;
      }
    });
  }

  removeClass(cls) {
    const wholeWord = new RegExp("\\b" + cls + "\\b");
    this.elements.forEach((el) => {
      // const matches = wholeWord.match(el.className);
      // for(let i=0;i<matches.length;i++) {
      //   el.className = ;
      // }
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


}

module.exports = DomNodeCollection;
