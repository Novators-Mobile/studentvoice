import React, { useEffect, useRef, useState } from "react";
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
};

function Tools({ isEditing, editBtn, editBtnHandler, saveBtnHandler }: Props) {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const modalRef = useRef<HTMLFormElement | null>(null);

  const toggleFilterModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setFilterModalOpen(!isFilterModalOpen);
  };

  const handleEscPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setFilterModalOpen(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setFilterModalOpen(false);
    }
  };

  useEffect(() => {
    if (isFilterModalOpen) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleEscPress);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscPress);
    };
  }, [isFilterModalOpen]);

  return (
    <div className="tools">
      <ToolsBtn icon={<DoubleArrowBtn />} onClick={toggleFilterModal} />

      {isFilterModalOpen && (
        <FilterModal
          modalRef={modalRef}
          setFilterModalOpen={setFilterModalOpen}
        />
      )}

      <Search />

      {editBtn && !isEditing && (
        <Button text="Редактировать" onClick={editBtnHandler} />
      )}

      {(isEditing || !editBtn) && <ToolsBtn icon={<PlusIcon />} />}

      {isEditing && <Button text="Сохранить" onClick={saveBtnHandler} />}

      <Button text="Excel" type="excel" />
    </div>
  );
}

export default React.memo(Tools);
