Todo.Application = (function(){
  function App(path, container){
    this.path = path;
    this.container = $(container);

    this.routes = {
        "/": Todo.Pages.Home
      , "/contact": Todo.Pages.Contact
    };
  }

  App.fn = App.prototype;

  App.fn.init = function() {
    var Controller = this.routes[this.path];

    if(Controller){
      var controller = new Controller(this.container);
      if (controller.run){
        controller.run();
      }

      return;
    }

    //No route has been mapped!
    console.log("Route not mapped:", this.path);
  };

  return App;
})();
