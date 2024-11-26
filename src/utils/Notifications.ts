import { Flip, toast, ToastOptions } from "react-toastify";

const settings: ToastOptions = {
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  icon: false,
  transition: Flip,
  closeButton: true,
};

export function Alert(
  type: "error" | "success" | "info" = "info",
  text?: string,
  timeout: number = 3000
) {
  if (!text) {
    switch (type) {
      case "error":
        text = "Произошла ошибка!";
        break;
      case "success":
        text = "Выполнено успешно!";
        break;
      default:
        text = "Что-то произошло!";
        break;
    }
  }

  toast[type](text, { ...settings, autoClose: timeout });
}

export function AlertLoading(text: string = "Загрузка...") {
  const toastId = toast.loading(text, {
    draggable: false,
    transition: Flip,
    className: "custom-loading-toast",
  });

  return toastId;
}

export function AlertUpdate(
  toastId: string | number,
  type: "error" | "success" | "info" = "info",
  text?: string,
  timeout: number = 3000
) {
  if (!text) {
    switch (type) {
      case "error":
        text = "Произошла ошибка!";
        break;
      case "success":
        text = "Выполнено успешно!";
        break;
      default:
        text = "Что-то произошло!";
        break;
    }
  }

  toast.update(toastId, {
    ...settings,
    autoClose: timeout,
    render: text,
    type: type,
    isLoading: false,
  });
}
