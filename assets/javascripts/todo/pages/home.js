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

    // Define the list view.
    // This object is going to listen to the repo's events
    // and update the markup accordinly
    this.listView = new Todo.TaskListView(
        this.tasksRepo
      , this.container.find(".tasks")
    );

    // Define the stats panel.
    // This panel is going to listen to all
    // tasks repository events.
    this.statsPanel = new Todo.StatsPanel(
        this.tasksRepo
      , this.container.find(".summary")
    );

  }

  Home.fn = Home.prototype;

  Home.fn.run = function(){

    // Perform the page transition.
    this.transition.run();

    // Set up the enterInput element.
    this.enterInput.init();
    this.enterInput.on("enter", $.proxy(this, "addNewTask"));

    // Initialize the list view
    this.listView.init();

    // Initialize the stats panel.
    this.statsPanel.init();

    //Load all tasks from server.
    this.tasksRepo.sync();
  };

  Home.fn.addNewTask = function(event, title) {
    this.tasksRepo.create({title: title, status: "pending"});
  };

  return Home;
})();


