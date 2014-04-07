Todo.Task = (function(){
  function Task(attrs){
    this.assign(attrs);
  }

  Task.fn = Task.prototype;

  Task.fn.assign = function(attrs) {
    for(var name in attrs){
      this[name] = attrs[name];
    }
  };

  Task.fn.save = function(){
    console.log("Saving task.");
  };

  return Task;
})();
