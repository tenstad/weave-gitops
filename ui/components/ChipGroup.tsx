import { Chip } from "@mui/core";
import _ from "lodash";
import * as React from "react";
import styled from "styled-components";
import { filterSeparator } from "./FilterDialog";
import Flex from "./Flex";

export interface Props {
  className?: string;
  /** currently checked filter options. Part of a `useState` with `setActiveChips` */
  chips: string[];
  /** the setState function for `activeChips` */
  onChipRemove: (chip: string[]) => void;
  onClearAll: () => void;
}

function ChipGroup({ className, chips = [], onChipRemove, onClearAll }: Props) {
  return (
    <Flex className={className} wide align start>
      {_.map(chips, (chip, index) => {
        const hasSeparator = chip.search(filterSeparator);
        const isUndefined =
          hasSeparator !== -1 &&
          //javascript search finds first occurence of substring, returning index
          hasSeparator ===
            //if first occurence of filterSeparator is the end of the chip string, it's an undefined value
            chip.length - filterSeparator.length;
        return (
          <Flex key={index}>
            <Chip
              label={isUndefined ? chip + "null" : chip}
              onDelete={() => onChipRemove([chip])}
            />
          </Flex>
        );
      })}
      {chips.length > 0 && <Chip label="Clear All" onDelete={onClearAll} />}
    </Flex>
  );
}

export default styled(ChipGroup).attrs({ className: ChipGroup.name })`
  .MuiChip-root {
    color: ${(props) => props.theme.colors.neutral40};
    margin-right: ${(props) => props.theme.spacing.xxs};
    background-color: ${(props) => props.theme.colors.neutralGray};
    transition: none;
  }
  height: 40px;
  padding: 4px 0px;
  flex-wrap: nowrap;
  overflow-x: auto;
`;
