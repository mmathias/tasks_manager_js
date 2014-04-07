//Initialize the applications namespace
var Todo = {};
Todo.Pages = {};

$(function(){
  // Initialize an application instance.
  // I must receive the body element as the container.
  var app = new Todo.Application(
      location.pathname
    , document.body
  );

  // Just start the application.
  app.init();
});

// Normalmente se usa Todo.Application que dentro dele vc implementa tudo
// aconselhando a usar dispatcher como se fosse um controller

// var Todo = {};
// Todo.Application = function(){

//};
