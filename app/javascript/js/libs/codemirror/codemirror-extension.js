import CodeMirror from "codemirror/lib/codemirror";

CodeMirror.prototype.setModeWithType = function (mode, type = null) {
  this._languageType = type;
  this.setOption("mode", mode);
};

CodeMirror.prototype.getLanguageType = function () {
  return this._languageType;
};
