import React from "react";
import ReactDOM from "react-dom";
import "./confirmModal.css";

type Props = {
  open: boolean;
  title: string;
  message: string;
  warning?: string;
  btnSaveLabel: string;
  btnDiscardLabel: string;
  btnCancelLabel: string;
  onSave: () => void;
  onDiscard: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title,
  message,
  warning,
  btnSaveLabel,
  btnDiscardLabel,
  btnCancelLabel,
  onSave,
  onDiscard,
  onCancel,
}: Props) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>

        <div className="confirm-header">
          <span className="confirm-header-text">{title}</span>
        </div>

        <div className="confirm-body">
          <p className="confirm-message">{message}</p>
          {warning && <p className="confirm-warning">{warning}</p>}
        </div>

        <div className="confirm-actions">
          <button className="confirm-action-btn" onClick={onSave}>
            {btnSaveLabel}
          </button>
          <button className="confirm-action-btn" onClick={onDiscard}>
            {btnDiscardLabel}
          </button>
          <button className="confirm-action-btn" onClick={onCancel}>
            {btnCancelLabel}
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}
