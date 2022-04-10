import DOMPurify from "dompurify";
import marked from "marked";
import katex from "katex";
import h from "highlight.js";
import "highlight.js/scss/github-gist.scss";

const escapeHTML = function (text) {
  return text.replace(/[&<>"]/g, (ch) => {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
    }[ch];
  });
};

const oldRenderer = new marked.Renderer();
const renderer = new marked.Renderer();

const tokenizer = {
  codespan(src) {
    const cap = this.rules.inline.code.exec(src);
    if (cap) {
      let text = cap[2].replace(/\n/g, " ");
      const hasNonSpaceChars = /[^ ]/.test(text);
      const hasSpaceCharsOnBothEnds =
        text.startsWith(" ") && text.endsWith(" ");
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text = text.substring(1, text.length - 1);
      }

      // 支持 Latex 数学表达式，故将 &<>" 字符的转义从词法分析阶段推迟到语法分析阶段
      // text = escape(text, true);

      return {
        type: "codespan",
        raw: cap[0],
        text,
      };
    }
  },
};

marked.use({ tokenizer });

// 支持 Latex 数学表达式，格式如下 `$ $` 或者 `$$ $$`
function mathsExpression(expr) {
  let message = "";

  if (expr.match(/^\$\$[\s\S]*\$\$$/)) {
    expr = expr.substr(2, expr.length - 4);
    try {
      return katex.renderToString(expr, { displayMode: true });
    } catch (err) {
      message = err.message;
    }
  } else if (expr.match(/^\$[\s\S]*\$$/)) {
    expr = expr.substr(1, expr.length - 2);
    try {
      return katex.renderToString(expr, { displayMode: false });
    } catch (err) {
      message = err.message;
    }
  } else {
    return "";
  }

  if (message.indexOf("Undefined control sequence")) {
    message +=
      "<a href='https://katex.org/docs/support_table.html'>点击查看支持列表</a>";
  }
  return message;
}
renderer.code = function (code, lang, escaped) {
  if (!lang) {
    const math = mathsExpression(code);
    if (math) {
      return math;
    }
  }
  return oldRenderer.code(code, lang, escaped);
};
renderer.codespan = function (text) {
  const math = mathsExpression(text);
  if (math) {
    return math;
  }

  text = escapeHTML(text);
  return oldRenderer.codespan(text);
};

// security: 移除 HTML 标签支持
renderer.html = function (html) {
  // markdown comment
  if (/^<!--(.|\n)*?-->(\n)*?$/.test(html)) {
    return html;
  }

  if (/[&<>"]/.test(html)) {
    return escapeHTML(html);
  }

  return html;
};

//
marked.setOptions({
  renderer: renderer,
  highlight: function (code, language) {
    const validLanguage = h.getLanguage(language) ? language : "plaintext";
    return h.highlight(validLanguage, code).value;
  },
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
  headerIds: false,
  katex: katex,
});

//
DOMPurify.addHook("afterSanitizeAttributes", function (node) {
  // set all elements owning target to target=_blank
  if ("target" in node) {
    node.setAttribute("target", "_blank");
  }

  // set non-HTML/MathML links to xlink:show=new
  if (
    !node.hasAttribute("target") &&
    (node.hasAttribute("xlink:href") || node.hasAttribute("href"))
  ) {
    node.setAttribute("xlink:show", "new");
  }
});

function _marked(text, options = {}) {
  let dirty = marked(text.toString());
  let clean = DOMPurify.sanitize(dirty);
  if (options.process_img) {
    clean.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, function (match, url) {
      clean = clean.replace(
        new RegExp(`src="${url}"`, "g"),
        `src="" data-url=${url}`
      );
    });
  }
  return clean;
}

export default _marked;
