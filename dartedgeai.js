// dartedgeai.js
define(function(require, exports, module) {
  "use strict";

  var oop = require("ace/lib/oop");
  var TextMode = require("ace/mode/text").Mode;

  var DartEdgeAIMode = function() {
    this.HighlightRules = DartEdgeAIHighlightRules;
  };
  oop.inherits(DartEdgeAIMode, TextMode);

  exports.Mode = DartEdgeAIMode;
});

var DartEdgeAIHighlightRules = function() {
  this.$rules = {
    start: [
      // Rule 1: Denoting characters for Memory Allocation
      { token: "keyword", regex: "''[A-Za-z]+" },
      // Rule 2: Accessing memory
      { token: "keyword", regex: "::" },
      // Rule 3: Combining DATA
      { token: "keyword", regex: "\\|" },
      // Rule 4: Peripheral access
      { token: "keyword", regex: "\\|::\\|" },
      // Rule 5: Function Begin
      { token: "keyword", regex: "\\(\\w+\\):-:" },
      // Rule 6: Language pattern "Is the same as / and, or, comparison"
      { token: "keyword", regex: "==" },
      // Rule 7: Language pattern "is not the same as"
      { token: "keyword", regex: "-=" },
      // Rule 8: Combine strings with numbers or objects
      { token: "keyword", regex: "\\+=" },
      // Rule 9: Function End
      { token: "keyword", regex: "}" },
      // Rule 10: Comment out commands
      { token: "comment", regex: "//.*" },
      { token: "comment", regex: "\\/\\*[\\s\\S]*?\\*\\/" },
      // Rule 11: Define variables
      { token: "keyword", regex: "var\\s*\\(\\w+\\)" },
      // Rule 12: Write the code to a text file
      { token: "keyword", regex: "\\(file\\)::" },
      //
         // Rule 13: Compile Code Language Patterns into an Executable Application
         { token: "keyword", regex: "}:::" },
         // Rule 14: Variables must be declared immediately after the open curly brace
         { token: "keyword", regex: "\\{\\s*var\\s*\\(\\w+\\)" },
         // Rule 15: Variable assignment with the language pattern "var ()==()"
         { token: "keyword", regex: "var\\s*\\(\\w+\\)\\s*==\\s*\\(.*\\)" },
         // Rule 16: Variable assignment with the language pattern "var ()-=()"
         { token: "keyword", regex: "var\\s*\\(\\w+\\)\\s*-=\\s*\\(.*\\)" },
         // Rule 17: Explicit Character Patterns using the language pattern "with"
         { token: "keyword", regex: "with" },
         // Rule 18: Explicit Character Patterns using the language pattern "place"
         { token: "keyword", regex: "place" },
         // Rule 19: Explicit Character Patterns using the language pattern "placeto ()"
         { token: "keyword", regex: "placeto\\s*\\(.*\\)" },
         // Rule 20: Explicit Character Patterns using the language pattern "andwith" or "&"
         { token: "keyword", regex: "andwith|&" },
         // Rule 21: Explicit Character Patterns using the language pattern "thenplace"
         { token: "keyword", regex: "thenplace" },
         // Rule 22: Explicit Character Patterns using the language pattern "when"
         { token: "keyword", regex: "when" },
         // Rule 23: Explicit Character Patterns using the language pattern "irin"
         { token: "keyword", regex: "irin" },
         // Rule 24: Explicit Character Patterns using the language pattern "irout"
         { token: "keyword", regex: "irout" },
         // Rule 25: Grouping functions using the language pattern "|;|"
         { token: "keyword", regex: "\\|;\\|" },
         // Rule 26: Custom dartedgeai syntax pattern observation
         { token: "keyword", regex: "\\|-';\\|\\+" },
               // Rule 27: End of code
          { token: "keyword", regex: "\\|\\|" }
        ]
      };
    };
