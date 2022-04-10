import "select2";
import "select2/dist/css/select2.css";
import "@ttskch/select2-bootstrap4-theme/dist/select2-bootstrap4.css";
import CodeMirror from "js/libs/codemirror/codemirror";
import marked from "js/libs/marked_hightlight";

$(document).on("turbolinks:load", function () {
  var component = $(".admin-posts-edit-page");
  if (component.length <= 0) return;

  $("select#post_label_ids").select2({
    theme: "bootstrap4",
    multiple: true,
    tags: false,
  });

  var datetimepicker = component.find(".datetimepicker");
  datetimepicker.daterangepicker({
    maxDate: new Date(),
    autoApply: true,
    singleDatePicker: true,
    timePicker: true,
    autoUpdateInput: false,
  });

  let cm = CodeMirror.fromTextArea(component.find("#content-input")[0], {
    mode: "markdown",
    tabSize: 2,
    indentUnit: 2,
    matchBrackets: true,
    smartIndent: false,
    lineNumbers: false,
    lineWrapping: true,
  });

  component.find("#preview-link").on("click", function () {
    component.find("#preview").html(marked(cm.getValue()));
  });
});
