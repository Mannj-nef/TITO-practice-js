import { TOAST } from "../../constants/type";

function Toast(type = "error", message = "TypeError: Failed to fetch") {
  const icons = {
    [TOAST.SUCCESS]: "ti-check",
    [TOAST.ERROR]: "ti-close",
  };
  const icon = icons[type];

  return `
    <div class="toast-item toast-${type}">
        <div class="toast-icon">
        <i class="${icon}"></i>
        </div>
        <p class="toast-desc">${message}</p>
      </div>
    `;
}
export default Toast;
