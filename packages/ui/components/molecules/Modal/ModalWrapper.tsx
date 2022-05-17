import React, { Component } from "react";
import { ModalSheet, ModalProps } from "./Modal";

export interface ModalOpenParams extends ModalProps {
  component?: React.FC<any>; // React FC as component
  ref?: any; // @todo specify ref object
  id?: number;
}

export class ModalWrapper extends Component<{}, { modals: ModalOpenParams[] }> {
  state: any = {
    modals: [], // Array maintained for opening multiple modals at the same time
  };

  totalIndex: number = 0;

  open = ({ ...args }: ModalOpenParams) => {
    const sheet = { ...args };

    let { modals } = this.state;

    // isVisible controls the visibility of bottomsheet
    this.totalIndex++;

    // if (sheet.fullScreen) {
    //     sheet.containerStyle = { borderTopLeftRadius: 0, borderTopRightRadius: 0 }
    //     sheet.height = Height;
    //     sheet.whiteHeader = false;
    // }

    (sheet as any).isVisible = true;
    (sheet as any).id = this.totalIndex;

    // ref controls the bottomsheet behaviour, like closing the sheet our update the modal
    if (!sheet.ref) {
      sheet.ref = React.createRef();
    }

    modals.push({ ...sheet });
    this.setState({ modals });
  };

  close = (index: number = this.state.modals.length - 1) => {
    let { modals } = this.state;
    setTimeout(() => {
      modals.splice(index, 1);
      this.setState({ modals });
    }, 200);

    // in order to retain close effect
    if (modals[index]) {
      modals[index].isVisible = false;
      this.setState({ modals });
    }
  };

  updateProps = (
    { ...props }: { [key: string]: any },
    index: number = this.state.modals.length - 1
  ) => {
    const { modals } = this.state;

    const modalRef = modals[index]?.ref;
    if (modalRef) {
      modalRef.current?.updateProps(props);
    }
  };

  renderModal() {
    const { modals } = this.state;
    const modalsElement = modals.map((sheet: any, index: number) => {
      return (
        <ModalSheet
          key={sheet.id + "" + index}
          closeModal={this.close}
          {...sheet}
        />
      );
    });
    return modalsElement;
  }

  render() {
    return <div>{this.renderModal()}</div>;
  }
}
