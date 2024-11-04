import React, { useState } from "react";
import FilterModal from "./FilterModal";
import ToolsBtn from "./ToolsBtn";
import DoubleArrowBtn from "./Icons/DoubleArrowBtn";
import PlusIcon from "./Icons/PlusIcon";
import Search from "./Search";
import Button from "./Button";

type Props = {
  isEditing?: boolean;
  editBtn?: boolean;
  editBtnHandler?: () => void;
  saveBtnHandler?: () => void;
  onPlusClick?: () => void;
};

function Tools({ isEditing, editBtn, editBtnHandler, saveBtnHandler, onPlusClick }: Props) {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

  const toggleFilterModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setFilterModalOpen(!isFilterModalOpen);
  };

  return (
    <div className="tools">
      <ToolsBtn icon={<DoubleArrowBtn />} onClick={toggleFilterModal} />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setFilterModalOpen(false)}
      />

      <Search />

      {editBtn && !isEditing && (
        <Button text="Редактировать" onClick={editBtnHandler} />
      )}

      {(isEditing || !editBtn) && <ToolsBtn icon={<PlusIcon />} onClick={onPlusClick} />}

      {isEditing && <Button text="Сохранить" onClick={saveBtnHandler} />}

      <Button text="Excel" type="excel" />
    </div>
  );
}

export default React.memo(Tools);
