import { ReactNode } from "react";
import styles from "./modal.module.css";
import { useModalStore } from "../../../store/modal/modal-store";
import { RiCloseLine } from "@remixicon/react";
interface ModalProps {
  children: ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const { isOpen, toggleModal } = useModalStore();
  return (
    <div
      className={`${isOpen ? styles.show : styles.notShow} ${styles.container}`}
    >
      {children}

      <div onClick={() => toggleModal()} className={styles.closeButton}>
        <RiCloseLine size={40} color="white" />
      </div>
    </div>
  );
}
