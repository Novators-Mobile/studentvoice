import React from "react";

type Props = {
  icon: JSX.Element;
  onClick?: (event: React.MouseEvent) => void;
  isOpen?: boolean;
  disable?: boolean;
};

function ToolsBtn({ icon, onClick, isOpen = false, disable }: Props) {
  return (
    <button
      className={`round-btn ${isOpen && "open"} ${disable && "disable"}`}
      onClick={onClick}
      disabled={disable}
    >
      {icon}
    </button>
  );
}

export default React.memo(ToolsBtn);
