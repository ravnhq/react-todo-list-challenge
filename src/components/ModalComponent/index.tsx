import ReactDOM from "react-dom";
import "./index.scss";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function ModalComponent({
  isOpen,
  onClose,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
