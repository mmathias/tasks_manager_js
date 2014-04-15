Todo.Task = (function(){
  var PENDING = "pending";
  var DONE = "done";

  function Task(attrs){
    Todo.Utils.extendWithEmitter(this);

    this.assign(attrs);
  }

  Task.fn = Task.prototype;

  Task.fn.attributes = function() {
    return {
        title: this.title
      , status: this.status
    };
  };

  Task.fn.assign = function(attrs) {
    for(var name in attrs){
      this[name] = attrs[name];
    }
  };

  Task.fn.save = function(){
    if(!this.id){
      // without an id, creates the task
      return this._create();
    }else{
      // with an id, update the task
      return this._update();
    }

  };

  Task.fn.remove = function(){
    var deferred = $.Deferred();
    var response = $.ajax({
        url: "/tasks/" + this.id
      , type: "delete"
      , dataType: "json"
    });

    response.done(function(){
      deferred.resolve(this);
      this._emitter.trigger("remove", this);
    }.bind(this));

    return deferred.promise();
  };

  Task.fn.isDone = function() {
    return this.status === DONE;
  };

  Task.fn.setDone = function(done) {
    this.status = (done? DONE : PENDING);
  };

  Task.fn._create = function() {
    var deferred = $.Deferred();
    var response = $.ajax({
        url: "/tasks"
      , type: "post"
      , data: {task: this.attributes()}
      , dataType: "json"
    });

    response.done(function(data){
      this.assign(data);
      deferred.resolve(this);
      this._emitter.trigger("create", this);
    }.bind(this));

    return deferred.promise();
  };

  Task.fn._update = function() {
    var deferred = $.Deferred();

    var response = $.ajax({
        url: "/tasks/" + this.id
      , type: "patch"
      , data: {task: this.attributes()}
      ,dataType: "json"
    });

    response.done(function(data){
      this.assign(data);
      deferred.resolve(this);
      this._emitter.trigger("update", this);
    }.bind(this));

    return deferred.promise();
  };

  Task.fn.whenSavingTaskSucceeds = function(data) {
    console.log(arguments);
    console.log(data);
  };

  return Task;
})();
