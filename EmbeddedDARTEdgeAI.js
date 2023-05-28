import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DARTLexer {
    public List<String> lex(String code) {
        List<String> tokens = new ArrayList<>();

        // Rule 1: Denoting characters for Memory Allocation
        applyRule(code, "''.*", "DENOTION BLOCK", tokens);

        // Rule 2: Accessing memory
        applyRule(code, "::.*", "ACCESS BLOCK", tokens);

        // Rule 3: Combining DATA
        applyRule(code, "\\|.*", "COMBINING BLOCK", tokens);

        // Rule 4: Peripheral access
        applyRule(code, "\\|::\\|.*", "PERIPHERAL BLOCK", tokens);

        // Rule 5: Function Begin
        applyRule(code, "\\(.*\\):-: \\{.*", "FUNCTION BEGIN BLOCK", tokens);

        // Rule 6: Language pattern "Is the same as / and, or, comparison"
        applyRule(code, "==.*", "COMPARISON BLOCK", tokens);

        // Rule 7: Language pattern "is not the same as"
        applyRule(code, "-=.*", "NOT BLOCK", tokens);

        // Rule 8: Combine strings with numbers or objects
        applyRule(code, "\\+=.*", "STRINGS OR OBJECTS BLOCK", tokens);

        // Rule 9: Function End
        applyRule(code, "}.*", "FUNCTION END BLOCK", tokens);

        // Rule 10: Comment out commands
        applyRule(code, "//.*", "COMMENT BLOCK 1", tokens);
        applyRule(code, "/\\*.*\\*/", "COMMENT BLOCK 2", tokens);

        // Rule 11: Define variables
        applyRule(code, "var \\(.*\\).*", "VARIABLE BLOCK", tokens);

        // Rule 12: Write code to text file
        applyRule(code, "\\(file\\)::.*", "WRITE TO FILE BLOCK", tokens);

        // Rule 13: Compile Code Language Patterns
        applyRule(code, "}:::.*", "FINISH CODE FOR BUILD AND EXECUTE BLOCK", tokens);
        
        // Rule 14: Variables must be declared immediately after the open curly brace
        applyRule(code, "\\{.*var \\(.*\\).*", "VARIABLE DECLARATION BLOCK", tokens);

        // Rule 15: Variable assignment
        applyRule(code, "\\(\\).*==\\(\\).*", "VARIABLE ASSIGNMENT BLOCK", tokens);

        // Rule 16: Variables can be set not equal to one another
        applyRule(code, "\\(\\).*-=\\(\\).*", "VARIABLE SET TO NOT BLOCK", tokens);

        // Rule 17: Explicit Character Patterns - 'with'
        applyRule(code, "with.*", "WITH BLOCK", tokens);

        // Rule 18: Explicit Character Patterns - 'place'
        applyRule(code, "place.*", "PLACE BLOCK", tokens);

        // Rule 19: Explicit Character Patterns - 'andwith'
        applyRule(code, "andwith.*", "COMBINE STATEMENTS BLOCK 1", tokens);

        // Rule 20: Explicit Character Patterns - 'thenplace'
        applyRule(code, "thenplace.*", "ADD TO STATEMENT BLOCK", tokens);

        // Rule 21: Explicit Character Patterns - 'when'
        applyRule(code, "when.*", "STATEMENT OPERATION CONTEXT BLOCK", tokens);

        // Rule 22: 'irin' takes the user input from console or editor
        applyRule(code, "irin.*", "TAKE USER INPUT BLOCK", tokens);

        // Rule 23: 'irout' prints the function or statement result to console or editor
        applyRule(code, "irout.*", "DISPLAY OUTPUT BLOCK", tokens);

        // Rule 24: Grouping functions
        applyRule(code, "\\|';'\\|.*", "GROUP FUNCTION BLOCK", tokens);

        // Rule 25: Binding as interpreter function or troubleshooter
        applyRule(code, "\\|'-';\\|.*", "INTERPRETER SYNTAX ACCESS BLOCK 1", tokens);

        return tokens;
    }

    private void applyRule(String code, String regex, String tokenType, List<String> tokens) {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(code);

        while (matcher.find()) {
            String token = matcher.group().trim();
            tokens.add(token + " (" + tokenType + ")");
        }
    }
}
