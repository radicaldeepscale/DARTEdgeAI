function lex(code) {
  let tokens = [];

  for (let i = 0; i < code.length; i++) {
    let currentChar = code.charAt(i);

    // Rule 1: Denoting characters for Memory Allocation
    if (currentChar === "'") {
      let denotionBlock = "";
      while (i < code.length && code.charAt(i) !== "'") {
        denotionBlock += code.charAt(i);
        i++;
      }
      tokens.push({ type: "DENOTION BLOCK", value: denotionBlock });
      continue;
    }

    // Rule 2: Accessing memory
    if (currentChar === ":" && code.charAt(i + 1) === ":") {
      let accessBlock = "";
      i += 2;
      while (i < code.length && code.charAt(i) !== "::") {
        accessBlock += code.charAt(i);
        i++;
      }
      tokens.push({ type: "ACCESS BLOCK", value: accessBlock });
      continue;
    }

    // Rule 3: Combining DATA
    if (currentChar === "|") {
      let combiningBlock = "";
      while (i < code.length && code.charAt(i) !== "|") {
        combiningBlock += code.charAt(i);
        i++;
      }
      tokens.push({ type: "COMBINING BLOCK", value: combiningBlock });
      continue;
    }

    // Rule 4: Peripheral access
    if (currentChar === "|" && code.charAt(i + 1) === ":" && code.charAt(i + 2) === "|") {
      let peripheralBlock = "";
      i += 3;
      while (i < code.length && code.charAt(i) !== "|") {
        peripheralBlock += code.charAt(i);
        i++;
      }
      tokens.push({ type: "PERIPHERAL BLOCK", value: peripheralBlock });
      continue;
    }

    // Rule 5: Function Begin
    if (currentChar === "(" && code.charAt(i + 1) === ":" && code.charAt(i + 2) === "-" && code.charAt(i + 3) === ":" && code.charAt(i + 4) === " ") {
      let functionBeginBlock = "";
      i += 5;
      while (i < code.length && code.charAt(i) !== "{") {
        functionBeginBlock += code.charAt(i);
        i++;
      }
      tokens.push({ type: "FUNCTION BEGIN BLOCK", value: functionBeginBlock });
      continue;
    }

    // Rule 6: Language pattern "Is the same as / and, or, comparison"
    if (currentChar === "=" && code.charAt(i + 1) === "=") {
      let comparisonBlock = "";
      i += 2;
      while (i < code.length && code.charAt(i) !== "=") {
        comparisonBlock += code.charAt(i);
        i++;
      }
      tokens.push({ type: "COMPARISON BLOCK", value: comparisonBlock });
      continue;
    }

    // Rule 7: Language pattern "is not the same as"
    if (currentChar === "-" && code.charAt(i + 1) === "=") {
      let notBlock = "";
      i += 2;
      while (i < code.length && code.charAt(i) !== "=") {
        notBlock += code.charAt(i);
        i++;
      }
      tokens.push({ type: "NOT BLOCK", value: notBlock });
      continue;
    }

    // Rule 8: Combine strings with numbers or objects
        if (currentChar === "+" && code.charAt(i + 1) === "=") {
      let stringsOrObjectsBlock = "";
      i += 2;
      while (i < code.length && code.charAt(i) !== "=") {
        stringsOrObjectsBlock += code.charAt(i);
        i++;
      }
      tokens.push({ type: "STRINGS OR OBJECTS BLOCK", value: stringsOrObjectsBlock });
      continue;
    }

    // Rule 9: Function End
    if (currentChar === "}") {
      tokens.push({ type: "FUNCTION END BLOCK" });
      continue;
    }

    // Rule 10: Comment out commands
    if (currentChar === "/" && code.charAt(i + 1) === "/") {
      let commentBlock = "";
      i += 2;
      while (i < code.length && code.charAt(i) !== "\n") {
        commentBlock += code.charAt(i);
        i++;
      }
      tokens.push({ type: "COMMENT BLOCK 1", value: commentBlock });
      continue;
    }

    if (currentChar === "/" && code.charAt(i + 1) === "*" && code.charAt(i + 2) === "*") {
      let commentBlock = "";
      i += 3;
      while (i < code.length && code.charAt(i) !== "*" && code.charAt(i + 1) !== "/") {
        commentBlock += code.charAt(i);
        i++;
      }
      tokens.push({ type: "COMMENT BLOCK 2", value: commentBlock });
      continue;
    }

    // Rule 11: Define variables
    if (currentChar === "v" && code.substr(i, 4) === "var (") {
      let variableBlock = "";
      i += 4;
      while (i < code.length && code.charAt(i) !== ")") {
        variableBlock += code.charAt(i);
        i++;
      }
      tokens.push({ type: "VARIABLE BLOCK", value: variableBlock });
      continue;
    }

    // Rule 12: Write code to text file
    if (currentChar === "(" && code.substr(i, 7) === "(file)::") {
      let writeFileBlock = "";
      i += 7;
      while (i < code.length && code.charAt(i) !== ")") {
        writeFileBlock += code.charAt(i);
        i++;
      }
      tokens.push({ type: "WRITE TO FILE BLOCK", value: writeFileBlock });
      continue;
    }

    // Rule 13: Compile Code Language Patterns
    if (currentChar === "}" && code.substr(i, 4) === "}:::") {
      let finishCodeBlock = "";
      i += 4;
      while (i < code.length) {
        finishCodeBlock += code.charAt(i);
        i++;
      }
      tokens.push({ type: "FINISH CODE FOR BUILD AND EXECUTE BLOCK", value: finishCodeBlock });
      continue;
    }

    // Rule 14: Variables must be declared immediately after the open curly brace
    if (currentChar === "{" && code.substr(i + 1, 4) === "var (") {
      let variableDeclarationBlock = "";
      i += 5;
      while (i < code.length && code.charAt(i) !== ")") {
        variableDeclarationBlock += code.charAt(i);
        i++;
      }
      tokens.push({ type: "VARIABLE DECLARATION BLOCK", value: variableDeclarationBlock });
      continue;
    }

    // Rule 15: Variable assignment
              if (currentChar === "(" && code.charAt(i + 1) === ")" && code.charAt(i + 2) === "=" && code.charAt(i + 3) === "(" && code.charAt(i + 4) === ")") {
      let variableAssignmentBlock = "";
      i += 5;
      while (i < code.length && code.charAt(i) !== "=") {
        variableAssignmentBlock += code.charAt(i);
        i++;
      }
      tokens.push({ type: "VARIABLE ASSIGNMENT BLOCK", value: variableAssignmentBlock });
      continue;
    }

    // Rule 16: Variables can be set not equal to one another
    if (currentChar === "(" && code.charAt(i + 1) === ")" && code.charAt(i + 2) === "-" && code.charAt(i + 3) === "=" && code.charAt(i + 4) === "(" && code.charAt(i + 5) === ")") {
      let variableSetToNotBlock = "";
      i += 6;
      while (i < code.length && code.charAt(i) !== "=") {
        variableSetToNotBlock += code.charAt(i);
        i++;
      }
      tokens.push({ type: "VARIABLE SET TO NOT BLOCK", value: variableSetToNotBlock });
      continue;
    }

    // Rule 17: Explicit Character Patterns - 'with'
    if (currentChar === "w" && code.substr(i, 4) === "with") {
      let withBlock = "";
      i += 4;
      while (i < code.length && code.charAt(i) !== " ") {
        withBlock += code.charAt(i);
        i++;
      }
      tokens.push({ type: "WITH BLOCK", value: withBlock });
      continue;
    }

    // Rule 18: Explicit Character Patterns - 'place'
    if (currentChar === "p" && code.substr(i, 5) === "place") {
      let placeBlock = "";
      i += 5;
      while (i < code.length && code.charAt(i) !== " ") {
        placeBlock += code.charAt(i);
        i++;
      }
      tokens.push({ type: "PLACE BLOCK", value: placeBlock });
      continue;
    }

    // Rule 19: Explicit Character Patterns - 'andwith'
    if (currentChar === "a" && code.substr(i, 7) === "andwith") {
      let combineStatementsBlock1 = "";
      i += 7;
      while (i < code.length && code.charAt(i) !== " ") {
        combineStatementsBlock1 += code.charAt(i);
        i++;
      }
      tokens.push({ type: "COMBINE STATEMENTS BLOCK 1", value: combineStatementsBlock1 });
      continue;
    }

    // Rule 20: Explicit Character Patterns - 'thenplace'
    if (currentChar === "t" && code.substr(i, 10) === "thenplace") {
      let addToStatementBlock = "";
      i += 10;
      while (i < code.length && code.charAt(i) !== " ") {
        addToStatementBlock += code.charAt(i);
        i++;
      }
      tokens.push({ type: "ADD TO STATEMENT BLOCK", value: addToStatementBlock });
      continue;
    }

    // Rule 21: Explicit Character Patterns - 'when'
    if (currentChar === "w" && code.substr(i, 4) === "when") {
      let statementOperationContextBlock = "";
      i += 4;
      while (i < code.length && code.charAt(i) !== " ") {
        statementOperationContextBlock += code.charAt(i);
        i++;
      }
      tokens.push


    // Rule 22: 'irin' takes the user input from console or editor
    if (currentChar === "i" && code.substr(i, 4) === "irin") {
      let takeUserInputBlock = "";
      i += 4;
      while (i < code.length && code.charAt(i) !== " ") {
        takeUserInputBlock += code.charAt(i);
        i++;
      }
      tokens.push({ type: "TAKE USER INPUT BLOCK", value: takeUserInputBlock });
      continue;
    }

    // Rule 23: 'irout' prints the function or statement result to console or editor
    if (currentChar === "i" && code.substr(i, 5) === "irout") {
      let displayOutputBlock = "";
      i += 5;
      while (i < code.length && code.charAt(i) !== " ") {
        displayOutputBlock += code.charAt(i);
        i++;
      }
      tokens.push({ type: "DISPLAY OUTPUT BLOCK", value: displayOutputBlock });
      continue;
    }

    // Rule 24: Grouping functions
    if (currentChar === "|" && code.charAt(i + 1) === "'" && code.charAt(i + 2) === ";" && code.charAt(i + 3) === "'" && code.charAt(i + 4) === "|") {
      let groupFunctionBlock = "";
      i += 5;
      while (i < code.length && code.charAt(i) !== "|") {
        groupFunctionBlock += code.charAt(i);
        i++;
      }
      tokens.push({ type: "GROUP FUNCTION BLOCK", value: groupFunctionBlock });
      continue;
    }

    // Rule 25: Binding as interpreter function or troubleshooter
    if (currentChar === "|" && code.charAt(i + 1) === "'" && code.charAt(i + 2) === "-" && code.charAt(i + 3) === "'" && code.charAt(i + 4) === ";" && code.charAt(i + 5) === "'" && code.charAt(i + 6) === "|") {
      let interpreterSyntaxAccessBlock1 = "";
      i += 7;
      while (i < code.length && code.charAt(i) !== "|") {
        interpreterSyntaxAccessBlock1 += code.charAt(i);
        i++;
      }
      tokens.push({ type: "INTERPRETER SYNTAX ACCESS BLOCK 1", value: interpreterSyntaxAccessBlock1 });
      continue;
    }
  }

  return tokens;
}

