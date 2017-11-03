//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from "assert"
import FlipFlop from "../flip-flop"
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import * as myExtension from "../extension";

// Defines a Mocha test suite to group tests of similar kind together
describe("Extension", function() {

  describe("FlipFlop", function() {
    describe("RSpec", function() {
      it("flips from test to code", function() {
        let specType = "spec"
        let testCases = [
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

        testCases.forEach(testCase => {
          let flipFlop = new FlipFlop(testCase[0], specType)
          let actual = flipFlop.getRelatedFilePath()

          assert.equal(testCase[1], actual)
        })
      })

      it.skip("flops from code to test", function() {
        // TODO
      })
    }) // describe RSpec

    describe("Minitest", function() {
      it("flips from test to code", function() {
        let specType = "test"
        let testCases = [
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

        testCases.forEach(testCase => {
          let flipFlop = new FlipFlop(testCase[0], specType)
          let actual = flipFlop.getRelatedFilePath()

          assert.equal(testCase[1], actual)
        })
      })

      it.skip("flops from code to test", function() {
        // TODO
      })
    }) // describe Minitest
  }) // describe FlipFlop
})
