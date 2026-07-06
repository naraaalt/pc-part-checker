import React from "react";
import ReactDOM from "react-dom";
import "./confirmModal.css";

type Props = {
  open: boolean;
  warning?: string;
  onSaveAndReturn: () => void;
  onReturnWithoutSaving: () => void;
  onStay: () => void;
};

export default function ConfirmModal({
  open,
  warning,
  onSaveAndReturn,
  onReturnWithoutSaving,
  onStay,
}: Props) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="confirm-overlay" onClick={onStay}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>

        <div className="confirm-header">
          <span className="confirm-header-text">RETURN HOME</span>
        </div>

        <div className="confirm-body">
          <p className="confirm-message">Unsaved changes detected.</p>
          {warning && <p className="confirm-warning">{warning}</p>}
        </div>

        <div className="confirm-actions">
          <button className="confirm-action-btn" onClick={onSaveAndReturn}>
            save &amp; return
          </button>
          <button className="confirm-action-btn" onClick={onReturnWithoutSaving}>
            return without saving
          </button>
          <button className="confirm-action-btn" onClick={onStay}>
            stay
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}
