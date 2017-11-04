import * as assert from "assert"
import FlipFlop from "../flip-flop"

// import * as vscode from "vscode";
// import * as myExtension from "../extension";

// Defines a Mocha test suite to group tests of similar kind together
describe("Extension", function() {

  describe("FlipFlop", function() {
    describe("RSpec", function() {
      beforeEach(function() {
        this.specType = "spec"
        this.testCases = [
          ["/spec/something/foo_spec.rb", "/app/something/foo.rb"],
          ["/spec/lib/something/foo_spec.rb", "/lib/something/foo.rb"],
          [
            "/spec/views/namespace/users/_something.html.erb_spec.rb",
            "/app/views/namespace/users/_something.html.erb"
          ],
          [
            "/spec/views/namespace/users/something.html.haml_spec.rb",
            "/app/views/namespace/users/something.html.haml"
          ],
        ]
      })

      it("flips from spec to code", function() {
        this.testCases.forEach(testCase => {
          let flipFlop = new FlipFlop(testCase[0], this.specType)
          let actual = flipFlop.getRelatedFilePath()

          assert.equal(testCase[1], actual)
        })
      })

      it("flops from code to spec", function() {
        this.testCases.forEach(testCase => {
          const flipFlop = new FlipFlop(testCase[1], this.specType)
          const actual = flipFlop.getRelatedFilePath()

          assert.equal(testCase[0], actual)
        })
      })
    }) // describe RSpec

    describe("Minitest", function() {
      beforeEach(function() {
        this.specType = "test"
        this.testCases = [
          ["/test/something/foo_test.rb", "/app/something/foo.rb"],
          ["/test/lib/something/foo_test.rb", "/lib/something/foo.rb"],
          [
            "/test/views/namespace/users/_something.html.erb_test.rb",
            "/app/views/namespace/users/_something.html.erb"
          ],
          [
            "/test/views/namespace/users/something.html.haml_test.rb",
            "/app/views/namespace/users/something.html.haml"
          ],
        ]
      })

      it("flips from test to code", function() {
        this.testCases.forEach(testCase => {
          let flipFlop = new FlipFlop(testCase[0], this.specType)
          let actual = flipFlop.getRelatedFilePath()

          assert.equal(testCase[1], actual)
        })
      })

      it("flops from code to test", function() {
        this.testCases.forEach(testCase => {
          let flipFlop = new FlipFlop(testCase[1], this.specType)
          let actual = flipFlop.getRelatedFilePath()

          assert.equal(testCase[0], actual)
        })
      })
    }) // describe Minitest
  }) // describe FlipFlop
})
