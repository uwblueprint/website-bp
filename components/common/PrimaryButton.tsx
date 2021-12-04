import React from "react";

function PrimaryButton({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <button className="py-3 px-8 rounded-full shadow-md text-white text-2xl bg-blue hover:opacity-70">
      {children}
    </button>
  );
}

export default PrimaryButton;
