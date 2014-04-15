Todo.TasksRepository = (function(){
  function TasksRepository(){
    this._list = {};
    Todo.Utils.extendWithEmitter(this);
  }

  TasksRepository.fn = TasksRepository.prototype;

  TasksRepository.fn.create = function(attrs) {
    var task = new Todo.Task(attrs);
    var result = task.save();
    result.done($.proxy(this,"whenTaskSavingSucceeds"));
    result.fail($.proxy(this,"whenTaskSavingFails"));
  };

  TasksRepository.fn.remove = function(id) {
    var task = this.find(id);
    var result;

    if(task){
      result = task.remove();
      result.done($.proxy(this,"whenTaskRemovalSucceeds"));
      result.fail($.proxy(this,"whenTaskRemovalFails"));
    }

    return result;
  };

  TasksRepository.fn.find = function(id) {
    return this._list[id];
  };

  TasksRepository.fn.push = function(task) {
    if(this.contains(task)){
      return;
    }
    this._list[task.id] = task;
    task.on("update", $.proxy(this, "whenTaskUpdateSucceeds"));
    this._emitter.trigger("task.push", task);
  };

  TasksRepository.fn.contains = function(task) {
    return !!this._list[task.id];
  };

  TasksRepository.fn.sync = function() {
    var response = $.ajax({
        url: "/tasks"
      , dataType: "json"
    });

    response.done($.proxy(this, "whenLoadingTasksSucceeds"));
  };

  TasksRepository.fn.whenTaskSavingSucceeds = function(task) {
    this.push(task);
    this._emitter.trigger("task.create", task);
  };

  TasksRepository.fn.whenTaskSavingFails = function(task) {
    console.log("Failed to save:", task);
  };

  TasksRepository.fn.whenTaskRemovalSucceeds = function(task) {
    delete this._list[task.id];
    this._emitter.trigger("task.remove", task);
  };

  TasksRepository.fn.whenTaskRemovalFails = function(task) {
    console.log("Failed to remove:", task);
  };

  TasksRepository.fn.whenTaskUpdateSucceeds = function(event, task) {
    this._emitter.trigger("task.update", task);
  };

  TasksRepository.fn.each = function(callback) {
    for (var id in this._list) {
      callback(this._list[id]);
    }
  };

  TasksRepository.fn.stats = function() {
    var result = {total: 0, pending: 0, done: 0};

    this.each(function(task){
      result.total += 1;
      result[task.status] += 1;
    });

    return result;
  };

  TasksRepository.fn.whenLoadingTasksSucceeds = function(tasks) {
    tasks
      .map(function(attrs){ return new Todo.Task(attrs); })
      .forEach($.proxy(this, "push"))
    ;
  };

  return TasksRepository;
})();
