import React from "react";
import Modal from "react-modal";
import { Modal as ModalUtil } from "../../../utils/modal";
import { Icon } from "../Icon/Icon";

export interface ModalProps {
  component?: React.FC<any>;
  height?: number;
  props?: { [key: string]: unknown };
  backdrop?: boolean;
  containerStyle?: { [key: string]: number | string };
  wrapperStyle?: { [key: string]: number | string };
  whiteHeader?: boolean;
  isVisible?: boolean;
  fullScreen?: boolean;
  closable?: boolean;
  onClose?: Function;
  closeModal?: Function;
  closeIcon?: boolean;
  whiteIcon?: boolean;
  modalOffset?: { [key: string]: number | string }; // content position top bottom
  modalSize?: "xs" | "sm" | "md" | "lg";
}

export const ModalSheet = React.forwardRef((propsValue: ModalProps, ref) => {
  const {
    component: RenderInner,
    height = null,
    props,
    closable = true,
    onClose = () => {},
    closeModal = () => {},
    backdrop = true,
    whiteIcon = false,
    // whiteHeader = true,
    containerStyle: contStyle,
    wrapperStyle: wrapStyle,
    isVisible,
    fullScreen = false,
    modalOffset,
    closeIcon = true,
    modalSize = "md",
  } = propsValue;

  const getContainerMaxWidth = () => {
    if (modalSize === "xs") {
      return 350;
    } else if (modalSize === "sm") {
      return 500;
    } else if (modalSize === "md") {
      return 750;
    } else if (modalSize === "lg") {
      return "90%";
    } else {
      return "auto";
    }
  };

  const containerStyle: any = {
    content: {
      display: "flex",
      position: "relative",
      left: "unset",
      right: "unset",
      top: "unset",
      bottom: "unset",
      height: "auto",
      border: "none",
      background: "none",
      // height: fullScreen ? "fit-content" : height,
      // padding: ".5rem 1rem",
      // margin: '40px 0',
      padding: "20px 0",
      // transform: "translateY(-50%)",
      width: "fit-content",
      maxHeight: "100vh",
      maxWidth: getContainerMaxWidth(),
      ...modalOffset,
      ...contStyle,
    },
    overlay: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 99999,
      background: "rgba(88, 88, 88,0.7 )",
    },
  };

  const onModalClose = (isClose: any) => {
    if (!closable) return;
    if (isClose) {
      closeModal();
      onClose();
    }
    ModalUtil.close();
  };

  return (
    <Modal
      isOpen={isVisible || false}
      ariaHideApp={false}
      onRequestClose={onModalClose}
      shouldCloseOnOverlayClick={backdrop}
      shouldCloseOnEsc={backdrop}
      style={containerStyle}
    >
      <div
        className="flex flex-1 relative rounded overflow-auto bg-base-100"
        style={{ ...wrapStyle }}
      >
        {RenderInner && <RenderInner inModal={true} {...props} />}
      </div>
      {closeIcon ? (
        <Icon
          source="clear"
          size={24}
          className="absolute cursor-pointer text-base-content"
          onClick={onModalClose}
          style={{
            top: 38,
            right: 18,
          }}
        />
      ) : null}
    </Modal>
  );
});
