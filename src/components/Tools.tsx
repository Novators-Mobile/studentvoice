import React, { useState } from "react";
import FilterModal from "./FilterModal";
import ToolsBtn from "./ToolsBtn";
import DoubleArrowBtn from "../Icons/DoubleArrowBtn";
import PlusIcon from "../Icons/PlusIcon";
import Search from "./Search";
import Button from "./Button";
import ArrowIcon from "../Icons/ArrowIcon";

type Props = {
  onPlusClick?: () => void;
  onSortClick?: () => void;
  isList?: boolean;
  onSearch?: (query: string) => void;
  debounceDelay?: number;
  isSortReversed?: boolean;
};

function Tools({ onPlusClick, isList = false, onSearch, debounceDelay, onSortClick, isSortReversed }: Props) {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

  const toggleFilterModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setFilterModalOpen(!isFilterModalOpen);
  };

  return (
    <div className="tools">
      {!isList && <ToolsBtn icon={<ArrowIcon />} onClick={onSortClick} isOpen={isSortReversed} />}

      <ToolsBtn icon={<DoubleArrowBtn />} onClick={toggleFilterModal} />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setFilterModalOpen(false)}
      />

      <Search onSearch={onSearch} debounceDelay={debounceDelay} />

      <ToolsBtn icon={<PlusIcon />} onClick={onPlusClick} />

      <Button text="Excel" type="excel" />
    </div>
  );
}

export default React.memo(Tools);
