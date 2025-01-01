import * as React from "react";
import styled from "styled-components";
import { IconButton } from "./Button";
import Flex from "./Flex";
import Icon, { IconType } from "./Icon";
import Input from "./Input";

type Props = {
  className?: string;
  onSubmit: (val: string) => void;
};

const Expander = styled(
  ({
    expanded,
    className,
    children,
  }: {
    expanded: boolean;
    className?: string;
    children?: any;
  }) => (
    <div className={`${className} ${expanded ? "expanded" : ""}`}>
      {children}
    </div>
  )
)`
  width: 0px;
  transition: width 0.3s ease-in-out;
  margin-left: 4px;
  &.expanded {
    width: 200px;
  }
`;

function SearchField({ className, onSubmit }: Props) {
  const inputRef = React.createRef<HTMLInputElement>();
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleExpand = (ev) => {
    ev.preventDefault();

    if (!expanded) {
      inputRef.current.focus();
    } else {
      inputRef.current.blur();
    }
    setValue("");
    setExpanded(!expanded);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue("");
    onSubmit(value);
  };

  return (
    <Flex align className={className}>
      <IconButton
        onClick={handleExpand}
        className={className}
        variant="text"
        color="inherit"
        size="large"
      >
        <Icon
          type={IconType.ExploreIcon}
          size="medium"
          color={expanded ? "primary" : "neutral30"}
        />
      </IconButton>
      <Expander expanded={expanded}>
        <form onSubmit={handleSubmit}>
          <Input
            id="table-search"
            placeholder="Search"
            inputRef={inputRef}
            value={value}
            onChange={(ev) => setValue(ev.target.value)}
          />
        </form>
      </Expander>
    </Flex>
  );
}

export default styled(SearchField).attrs({ className: SearchField.name })``;
