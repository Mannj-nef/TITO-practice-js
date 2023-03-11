import Toast from "../views/components/toast";
import { TOAST as TOAST_TYPE } from "../constants/type";

const TOAST = {
  SUCCESS: (message) => Toast((type = TOAST_TYPE.SUCCESS), message),

  ERROR: (message) => Toast((type = TOAST_TYPE.ERROR), message),
};

export default TOAST;
