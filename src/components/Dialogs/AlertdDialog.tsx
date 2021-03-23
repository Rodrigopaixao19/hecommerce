import React from "react";
import Button from "../Button/Button";
import DialogWrapper from "./DialogWrapper";

interface IAlertDialog {
  header: string;
  message: string;
  onOpenDialog?: (open: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  loading?: boolean;
  error?: string;
}

const AlertDialog: React.FC<IAlertDialog> = ({
  header,
  message,
  onConfirm,
  onCancel,
  onOpenDialog,
  error,
  loading,
}) => {
  return (
    <DialogWrapper
      header={header}
      onClose={onCancel && !loading ? onOpenDialog : undefined}
    >
      <div className="dialog--body">
        <div className="alert-message">{message}</div>
        <div className="alert-action">
          {onCancel && (
            <Button
              className="btn--cancel"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          )}
          {onConfirm && (
            <Button
              className="btn--confirm"
              loading={loading}
              disabled={loading}
              onClick={() => onConfirm()}
            >
              Confirm
            </Button>
          )}
        </div>

        {error && <p className="paragraph paragraph-error">{error}</p>}
      </div>
    </DialogWrapper>
  );
};

export default AlertDialog;
