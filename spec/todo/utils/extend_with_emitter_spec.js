describe("Todo.Utils.extendWithEmitter", function() {
  var target;

  beforeEach(function() {
    target = {};
    Todo.Utils.extendWithEmitter(target);
  });

  it("sets _emitter", function() {
    expect(target._emitter).toBeDefined();
  });

  it("binds on method", function() {
    expect(target.on.constructor).toEqual(Function);
  });

});

