import CodeMirror from "codemirror/lib/codemirror";

import "codemirror/mode/markdown/markdown";

import "codemirror/keymap/vim";
import "codemirror/keymap/emacs";
import "codemirror/theme/monokai.css";
import "codemirror/addon/display/autorefresh";
import "codemirror/addon/display/placeholder";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/hint/css-hint";
import "codemirror/addon/hint/html-hint";
import "codemirror/addon/selection/mark-selection";

import "./codemirror-extension";

export default CodeMirror;
