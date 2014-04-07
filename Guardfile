interactor :off
notification :off

guard :shell do
  watch(%r[assets/]) {|m| `grunt dev` }
  watch(%r[Gruntfile.js]) {|m| `grunt dev` }
  watch(%r[assets/javascripts/todo/]) {|m| `grunt jasmine` }
  watch(%r[spec/]) {|m| `grunt jasmine` }
end
