import React, { useState } from "react";
import FilterModal from "./FilterModal";
import ToolsBtn from "./ToolsBtn";
import DoubleArrowBtn from "./Icons/DoubleArrowBtn";
import PlusIcon from "./Icons/PlusIcon";
import Search from "./Search";
import Button from "./Button";
import ArrowIcon from "./Icons/ArrowIcon";

type Props = {
  isEditing?: boolean;
  editBtnHandler?: () => void;
  saveBtnHandler?: () => void;
  onPlusClick?: () => void;
  isList?: boolean;
};

function Tools({ isEditing, editBtnHandler, saveBtnHandler, onPlusClick, isList = false }: Props) {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

  const toggleFilterModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setFilterModalOpen(!isFilterModalOpen);
  };

  return (
    <div className="tools">
      {!isList && <ToolsBtn icon={<ArrowIcon />} />}
      
      <ToolsBtn icon={<DoubleArrowBtn />} onClick={toggleFilterModal} />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setFilterModalOpen(false)}
      />

      <Search />

      {!isEditing && (
        <Button text="Редактировать" onClick={editBtnHandler} />
      )}

      {isEditing && <ToolsBtn icon={<PlusIcon />} onClick={onPlusClick} />}

      {isEditing && <Button text="Сохранить" onClick={saveBtnHandler} />}

      <Button text="Excel" type="excel" />
    </div>
  );
}

export default React.memo(Tools);
