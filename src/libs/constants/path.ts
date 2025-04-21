export const PATH = {
  HOME: "/",
  CUOC_THI: "/cuoc-thi",
  TO_CHUC_DOAN: "/gioi-thieu-to-chuc-doan",
  THONG_TIN: "/thong-tin-ca-nhan/:id",
  THE_LE: "/the-le/:id",
  THI_TRAC_NGHIEM: "/thi-trac-nghiem/:id",
  KET_QUA_THI: "/ket-qua-thi",
  TIM_KIEM: "/tim-kiem",
};

export const ADMIN_PATHS = {
  DASHBOARD: "/admin",
  THI_CU: "/admin/thi-cu",
  BAI_VIET: "/admin/bai-viet",
  BAO_CAO_THONG_KE: "/admin/bao-cao-thong-ke",
  BAO_CAO_THONG_KE_DETAIL: "/admin/bao-cao-thong-ke/chi-tiet",
  BAO_CAO_THONG_KE_HISTORY: "/admin/bao-cao-thong-ke/lich-su/:id",
  CHUNG_CHI: "/admin/chung-chi",
  TAI_KHOAN: "/admin/tai-khoan",
  POST_CREATE: "/admin/thi-cu/tao-moi",
  PREVIEW_CREATE_EXAM:
    "/admin/thi-cu/chinh-sua/:idExam/quizId/:quizId/tabs/:tab",
  PREVIEW_SETTING_EXAM:
    "/admin/thi-cu/chinh-sua/:idExam/quizId/:quizId/tabs/:tab",
  PREVIEW_EXAM_TABS2:
    "/admin/thi-cu/chinh-sua/:idExam/quizId/:quizId/tabs/:tab",
  CAI_DAT_BO_LOC: "/admin/cai-dat-bo-loc",
  CAI_DAT_BO_LOC_LEVEL: "/admin/cai-dat-bo-loc/cap/:level",
  CREATE_FILTER: "/admin/cai-dat-bo-loc/them-bo-loc",
  EDIT_FILTER: "/admin/cai-dat-bo-loc/sua-bo-loc/:filterId",
  CAI_DAT_WEB: "/admin/cai-dat-web",
  CREATE_CHUNG_CHI: "/admin/chung-chi/tao-moi",
  EDIT_CHUNG_CHI: "/admin/chung-chi/chinh-sua/:id",
};
