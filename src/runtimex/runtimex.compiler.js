/*
 *
 * Runtimex.JS
 * Embed power in your programs.
 * Made by martia_f
 * Licensed under the MIT license.
 *
 */

const RuntimeCompiler = {};
// Declare all tools and variables we need for later use.
RuntimeCompiler.threads = {};
RuntimeCompiler.tools = {};
RuntimeCompiler.tools.checkConditions = function (line) {
  return (
    line.startsWith("IF") ||
    line.startsWith("CLASS") ||
    line.startsWith("WHILE") ||
    line.startsWith("FOR") ||
    line.startsWith("FOREACH") ||
    line.startsWith(":")
  );
};

RuntimeCompiler.craftThread = function (name, data) {
  var ThreadID = Math.floor(Math.random() * 99999);
  // Using a curly function just for its beauty.
  return () => {
    return {
      name: name,
      description: "Subthread #" + ThreadID,
      data: data,
      children: [],
      id: ThreadID
    };
  };
};

// This is the function that handles most of the compilation and interpretation, etc.
RuntimeCompiler.compile = function (obj, nested) {
  if (typeof obj === "string") {
    // Declare a random number to not to break nests. ThreadID makes sure that no variables and shit gets messed up in the middle of the job.
    var ID = Math.floor(Math.random() * 10000);
    RuntimeCompiler.threads[ID] = {};
    // Declare the result data and craft a main thread for the current ThreadID to store the tokens inside.
    RuntimeCompiler.threads[ID].result = {
      name: "main",
      description: "The main thread for RuntimeTokens",
      children: []
    };
    // Split the input into an array of lines.
    RuntimeCompiler.threads[ID].input = obj.split("\n");

    // Check if the compiler is ran as nested, and if it is, return a thread.
    if (
      RuntimeCompiler.tools.checkConditions(
        RuntimeCompiler.threads[ID].input[0]
      ) &&
      nested
    ) {
      var toReturn = RuntimeCompiler.craftThread("nested-thread", {});
    } else {
      // Loop over the lines
      RuntimeCompiler.threads[ID].input.forEach((line, index, array) => {
        // Ignore line if it's a comment.
        if (line.startsWith("#")) {
          return;
        }
        // Check if the line contains any loops/conditions/etc and return them in a recursive function. We also need to check if it's the first line, because we may create an infinite loop.
        if (index > 0 && RuntimeCompiler.tools.checkConditions(line)) {
          RuntimeCompiler.threads[ID].result.children.push(
            RuntimeCompiler.compile(obj, true)
          );
        }
      });
    }
  } else {
    console.log("Error: given object is not a string.");
  }
};

RuntimeCompiler.verify = function () {
  // console.log("RuntimeCompiler is loaded correctly.");
  return "correct";
};

function devStartup() {
  RuntimeCompiler.compile(`:MAIN
ECHO "RuntimeX test"
:MAIN END

:RUNTIME
ECHO "Every-second run!"
:RUNTIME END`);
}

devStartup();

module.exports = RuntimeCompiler;
