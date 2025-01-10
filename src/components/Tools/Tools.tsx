import React, { useState } from "react";
import FilterModal from "./FilterModal";
import ToolsBtn from "../Tools/ToolsBtn";
import DoubleArrowBtn from "../../Icons/DoubleArrowBtn";
import PlusIcon from "../../Icons/PlusIcon";
import Search from "../Search";
import Button from "../Button";
import ArrowIcon from "../../Icons/ArrowIcon";

type Props = {
  onPlusClick?: () => void;
  onSortClick?: () => void;
  isList?: boolean;
  onSearch?: (query: string) => void;
  debounceDelay?: number;
  isSortReversed?: boolean;
  disablePlusBtn?: boolean;
  disableExcelBtn?: boolean;
  onExcelClick?: () => Promise<Blob>;
};

function Tools({
  onPlusClick,
  isList = false,
  onSearch,
  debounceDelay,
  onSortClick,
  isSortReversed,
  disablePlusBtn,
  disableExcelBtn,
  onExcelClick,
}: Props) {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

  const toggleFilterModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setFilterModalOpen(!isFilterModalOpen);
  };

  const excelClickHandle = async () => {
    try {
      const fileBlob = await onExcelClick!();
      const fileURL = URL.createObjectURL(fileBlob);

      const a = document.createElement("a");
      a.href = fileURL;
      a.download = `report.xlsx`;
      a.click();

      URL.revokeObjectURL(fileURL);
    } catch (error) {
      console.error("Ошибка при скачивании файла:", error);
    }
  };

  return (
    <div className="tools">
      {!isList && (
        <ToolsBtn
          icon={<ArrowIcon />}
          onClick={onSortClick}
          isOpen={isSortReversed}
        />
      )}

      <ToolsBtn icon={<DoubleArrowBtn />} onClick={toggleFilterModal} />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setFilterModalOpen(false)}
      />

      <Search onSearch={onSearch} debounceDelay={debounceDelay} />

      <ToolsBtn
        icon={<PlusIcon />}
        onClick={onPlusClick}
        disable={disablePlusBtn}
      />

      <Button
        text="Excel"
        type="excel"
        disabled={disableExcelBtn}
        onClick={excelClickHandle}
      />
    </div>
  );
}

export default React.memo(Tools);
