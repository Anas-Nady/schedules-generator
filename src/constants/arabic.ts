export const DAYS = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء"];

export const SUCCESS_MESSAGES = {
  SUBJECT_UPDATED: "تم تحديث المادة بنجاح",
  SUBJECT_ADDED: "تمت إضافة المادة بنجاح",
  SUBJECTS_UPLOADED: "تم تحميل المواد بنجاح",
};

export const ERROR_MESSAGES = {
  SUBJECT_EXISTS: "مادة بنفس الرمز والمجموعة موجودة بالفعل.",
  NO_SUBJECTS:
    "لا توجد مواد مضافة حالياً. قم بأختيار المادة ثم اضغط علي زر اضافة المادة",
  NO_SCHEDULES: "لم يتم العثور على جداول. قم بتوليد الجداول أولاً.",
  GENERATE_ERROR: "حدث خطأ أثناء توليد الجداول. يرجى المحاولة مرة أخرى.",
  NO_VALID_SCHEDULES:
    "لم يتم العثور على جداول صالحة. يرجى التحقق من تفاصيل المواد وإعادة المحاولة.",
  INVALID_FILE_FORMAT: "تنسيق الملف غير صالح. يرجى تحميل ملف subjects.js صحيح.",
  FILE_PARSE_ERROR:
    "حدث خطأ أثناء قراءة الملف. يرجى التحقق من المحتوى وإعادة المحاولة.",
};

export const UI_TEXTS = {
  SCHEDULE_GENERATOR: "مولد الجداول الدراسية",
  SUBJECTS: "المواد:",
  GENERATED_SCHEDULES: "الجداول المولدة:",
  TOTAL_UNITS: "إجمالي الوحدات:",
  TABLE: "الجدول",
  OF: "من",
  PREVIOUS: "السابق",
  NEXT: "التالي",
  EDIT: "تعديل",
  DELETE: "حذف",
  GENERATE_SCHEDULES: "توليد الجداول",
  GENERATING: "جاري التوليد...",
  ADD_SUBJECT: "إضافة مادة",
  RESET_FORM: "إعادة تعيين النموذج",
  CONFIRM: "تأكيد",
  CANCEL: "إلغاء",
  DOWNLOAD_SUBJECTS: "تنزيل المواد",
  UPLOAD_SUBJECTS: "رفع المواد",
};

export const FORM_LABELS = {
  SUBJECT_NAME: "اسم المادة",
  SUBJECT_CODE: "كود المادة",
  GROUP: "المجموعة",
  LECTURE_DAY: "يوم المحاضرة",
  LECTURE_START: "بداية فترة المحاضرة",
  LECTURE_END: "نهاية فترة المحاضرة",
  SECTION_DAY: "يوم السكشن (اختياري)",
  SECTION_START: "بداية فترة السكشن (اختياري)",
  SECTION_END: "نهاية فترة السكشن (اختياري)",
  UNITS: "عدد الوحدات",
};
