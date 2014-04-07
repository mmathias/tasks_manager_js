Todo.Pages.Home = (function(){
  function Home(container){
    this.container = container;

    // The transition expects the loading element
    // and the page elemen. The transition is performed
    // on the 'App.fn.init' method.
    this.transition = new Todo.PageTransition(
        this.container.find(".loading")
      , this.container.find(".page")
    );

    // Instantiate the Todo.EnterInput component,
    // which will intercept the 'enter' event.
    this.enterInput = new Todo.EnterInput(
      this.container.find(".task-input")
    );

    // Define the tasks repository; this object is going to
    // hold all loaded and/or created tasks. It will also
    // syncronize removed and/or updated tasks.
    this.tasksRepo = new Todo.TasksRepository();
  }

  Home.fn = Home.prototype;

  Home.fn.run = function(){
    //Load all tasks from server.
    this.taskRepo.sync();

    // Perform the page transition.
    this.transition.run();

    // Set up the enterInput element.
    this.enterInput.init();
    this.enterInput.on("enter", $.proxy(this, "addNewTask"));
  };

  Home.fn.addNewTask = function(event, title) {
    this.tasksRepo.add({title: title});
  };

  return Home;
})();


