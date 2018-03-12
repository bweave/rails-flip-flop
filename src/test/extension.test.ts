import * as fs from "fs"
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised'
import * as sinon from "sinon"
import * as sinonChai from "sinon-chai"
import * as utils from "../utils"
import Bootstrap from "../bootstrap"
import FlipFlop from "../flip-flop"

chai.use(chaiAsPromised)
chai.use(sinonChai)
chai.should()
const assert = chai.assert
const expect = chai.expect
const sandbox = sinon.createSandbox()

// Defines a Mocha test suite to group tests of similar kind together
describe("Extension", function() {
  describe("Bootstrap", function() {
    beforeEach(function() {
      this.fileName = "/path/to/project/app/something/foo.rb"
      this.relatedFilePath = "/path/to/project/spec/something/foo_spec.rb"
      this.editor = { document: { fileName: this.fileName } }
    })

    it.skip("opens the related file when it exists", function() {
    })

    it.skip("prompts to create the test file when it doesn't exist", function() {
    })

    it.skip("prompts to create a test dir if none exists", function() {
    })
  }) // describe Bootstrap

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
