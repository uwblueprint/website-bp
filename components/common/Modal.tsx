import { FC, ReactNode, useEffect, useRef } from "react";

type Props = {
  readonly titleId: string;
  readonly onDismiss?: () => void;
  readonly children: ReactNode;
};

const Modal: FC<Props> = ({ titleId, onDismiss, children }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dialogRef.current?.focus();
    if (!onDismiss) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onDismiss]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onDismiss} />
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-w-md w-full bg-charcoal-0 rounded-md shadow-xl px-6 py-8 text-center focus:outline-none"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
