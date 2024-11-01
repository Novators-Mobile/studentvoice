import React from "react";

type Props = {
  icon: JSX.Element;
  onClick?: (event: React.MouseEvent) => void;
  isOpen?: boolean;  
}

function ToolsBtn({ icon, onClick, isOpen = false }: Props) {
  return (
    <button className={`round-btn ${isOpen && "open"}`} onClick={onClick}>
      {icon}
    </button>
  );
}

export default React.memo(ToolsBtn);
