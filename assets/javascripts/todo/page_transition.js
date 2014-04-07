Todo.PageTransition = (function(){

  // Perform the transition between the loading element
  // and the page container.
  function PageTransition(loading, page){
    this.loading = loading;
    this.page = page;
  }

  PageTransition.fn = PageTransition.prototype;

  PageTransition.fn.init = function(){
  };

  PageTransition.fn.run = function(){
    this.hideLoadingElement();
  };

  PageTransition.fn.hideLoadingElement = function(){
    this.loading.fadeOut("slow", $.proxy(this, "showPageElement"));
  };

  PageTransition.fn.showPageElement = function(){
    this.page.fadeIn("slow", $.proxy(this, "setElementsClasses"));
  };

  PageTransition.fn.setElementsClasses = function(){
    this.loading.addClass("hidden");
    this.page.removeClass("hidden");
  };

  return PageTransition;

})();
