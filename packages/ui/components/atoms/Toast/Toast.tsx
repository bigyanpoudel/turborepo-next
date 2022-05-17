import cogoToast from "cogo-toast";
type TOAST_TYPE = "success" | "error" | "info" | "warning";

function Ellipsis({ text, length = 30 }: { text: any; length?: number }) {
  if (typeof text == "string") {
    return text.length > length - 2
      ? text.substring(0, length - 2) + "..."
      : text;
  } else {
    return text;
  }
}

const toastTemplate = ({ message }: any) => {
  return (
    <div className="custom-toast ">
      <div className={`toast-content max-h-10  min-w-[200px]`}>
        <span>{Ellipsis({ text: message, length: 100 })}</span>
      </div>
    </div>
  );
};

export const Toast = ({
  type,
  hideAfter = 2,
  position = "top-right",
  description = "",
  message = "",
}: {
  type: TOAST_TYPE;
  hideAfter?: number;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  description?: string;
  message?: string;
}) => {
  switch (type) {
    case "success":
      const { hide: successHide }: any = cogoToast.success(
        toastTemplate({
          message: description,
        }),
        {
          heading: message,
          hideAfter: hideAfter,
          position: position,
          bar: { size: "0px" },
          onClick: () => {
            successHide();
          },
        }
      );
      break;
    case "error":
      const { hide: errorHide }: any = cogoToast.error(
        toastTemplate({
          message: description,
        }),
        {
          heading: message,
          hideAfter: hideAfter,
          position: position,
          bar: { size: "0px" },
          onClick: () => {
            errorHide();
          },
        }
      );
      break;
    case "info":
      const { hide }: any = cogoToast.info(
        toastTemplate({
          message: description,
        }),
        {
          heading: message,
          hideAfter: hideAfter,
          position: position,
          bar: { size: "0px" },
          onClick: () => {
            hide();
          },
        }
      );
      break;
    case "warning":
      const { hide: warnHide }: any = cogoToast.warn(
        toastTemplate({
          message: description,
        }),
        {
          heading: message,
          hideAfter: hideAfter,
          position: position,
          bar: { size: "0px" },
          onClick: () => {
            warnHide();
          },
        }
      );
      break;
    default:
      break;
  }
};
