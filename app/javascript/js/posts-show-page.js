import marked from "js/libs/marked_hightlight";

$(document).on("turbolinks:load", function () {
  var component = $(".posts-show-page");
  if (component.length <= 0) return;

  let el = component.find(".post-content");
  el.html(marked(el.data("content")));
});
