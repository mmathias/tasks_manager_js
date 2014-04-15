Todo.TaskListView = (function(){
  function TaskListView(repo, container){
    this.repo = repo;
    this.container = container;
  }

  TaskListView.fn = TaskListView.prototype;

  TaskListView.fn.init = function() {
    this.repo.on("task.push", $.proxy(this, "addTask"));
    this.repo.on("task.remove", $.proxy(this, "removeTask"));
    this.repo.on("task.update", $.proxy(this, "updateTask"));

    this.container
      .on("click", ".remove", $.proxy(this, "removeButtonClicked"))
      .on("change", ":checkbox", $.proxy(this, "checkboxHasChanged"))
      .on("dblclick", ".task-title", $.proxy(this, "activateInlineEditing"))
    ;
  };

  TaskListView.fn.addTask = function(event, task) {
    var html = Todo.templates.task(task);
    this.addToContainer(task, html);
  };

  TaskListView.fn.removeTask = function(event, task) {
    this.container.find("[data-id=" + task.id + "]").fadeOutAndRemove(5);
  };

  TaskListView.fn.removeButtonClicked = function(event) {
    var id = this.findIdForElement(event.target);

    if(confirm("Are you sure you want to remove?")){
      this.repo.remove(id);
    }
  };

  TaskListView.fn.updateTask = function(event, task) {
    var html = Todo.templates.task(task);

    this.container.find("[data-id=" + task.id + "]").remove();
    this.addToContainer(task, html);
  };

  TaskListView.fn.checkboxHasChanged = function(event) {
    //retrieve task
    var task = this.findTaskForElement(event.target);

    //update status
    task.setDone(event.target.checked);

    //save task
    task.save();
  };

  TaskListView.fn.findTaskForElement = function(element) {
    return this.repo.find(this.findIdForElement(element));
  };

  TaskListView.fn.findIdForElement = function(element) {
    return $(element).closest(".task").data("id");
  };

  TaskListView.fn.addToContainer = function(task, html) {
    if (task.isDone()){
      this.container.append(html);
    }else{
      this.container.prepend(html);
    }
  };

  TaskListView.fn.activateInlineEditing = function(event) {
    var title = $(event.target);
    var inlineEditing = title.data("_inlineEditing");

    if(!inlineEditing){
      inlineEditing = new Todo.InlineEditing($(event.target));
      inlineEditing.init();
      title.data("_inlineEditing", inlineEditing);
    }

    inlineEditing.activate();
    inlineEditing.on("commit", $.proxy(this, "whenCommitingInlineEditing"));
  };

  TaskListView.fn.whenCommitingInlineEditing = function(event, element, title) {
    var task = this.findTaskForElement(element);
    task.title = title;
    console.log(arguments);
    task.save();

  };

  return TaskListView;
})();
