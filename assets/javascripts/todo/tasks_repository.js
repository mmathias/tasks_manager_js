Todo.TasksRepository = (function(){
  function TasksRepository(){

  }

  TasksRepository.fn = TasksRepository.prototype;

  TasksRepository.fn.add = function(attrs) {
    var task = new Todo.Task(attrs);
    task.save();
    // console.log("Received task attrs:", attrs);
  };

  TasksRepository.fn.sync = function() {
    console.log("Syncing classes");
  };

  return TasksRepository;
})();
