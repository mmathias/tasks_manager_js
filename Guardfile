interactor :off
notification :off

guard :shell do
  watch(%r[assets/]) {|m| `grunt` }
  watch(%r[assets/javascripts/todo/]) {|m| `grunt jasmine` }
  watch(%r[spec/]) {|m| `grunt jasmine` }
  watch(%r[Gruntfile.js]) {|m| `grunt` }
end
