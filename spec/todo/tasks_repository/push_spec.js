describe("Todo.TasksRepository#push", function() {
  var repo, callback, task;

  beforeEach(function() {
    callback = jasmine.createSpy("callback");
    repo = new Todo.TasksRepository();
    task = new Todo.Task();
  });

  it("triggers task.push event", function() {
    repo.on("task.push", callback);
    repo.push(task);

    expect(callback).toHaveBeenCalledWith(
        jasmine.any($.Event)
      , task
    );
  });

  it("triggers task.push event just once", function() {
    repo.on("task.push", callback);
    repo.push(task);
    repo.push(task);

    expect(callback.calls.count()).toEqual(1);
  });

  it("stores task", function() {
    repo.push(task);
    expect(repo.contains(task)).toBeTruthy();
  });

  it("listens to the task's update event", function() {
    repo.push(task);
    repo.on("task.update", callback);

    task._emitter.trigger("update", task);

    expect(callback).toHaveBeenCalledWith(
        jasmine.any($.Event)
      , task
    );
  });
});
