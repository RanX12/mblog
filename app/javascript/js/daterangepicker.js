import "daterangepicker";

$.fn.daterangepicker.defaultOptions = {
  dateFormat: "YYYY-MM-DD HH:mm",
  locale: {
    format: "YYYY-MM-DD HH:mm",
    cancelLabel: "取消",
    applyLabel: "确定",
    daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
    monthNames: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ],
  },
  timePicker24Hour: true,
};
