// eslint-disable-next-line
import { CircularProgress, PropTypes } from "@mui/core";
import MaterialButton, { ButtonProps } from "@mui/core/Button/Button";
import * as React from "react";
import styled, { useTheme } from "styled-components";

/** Button Properties */
export interface Props extends ButtonProps {
  /** Changes the Buttons `startIcon` prop to Mui's `<CircularProgress />` and sets `disabled` to `true`. */
  loading?: boolean;
  /** `<Icon />` Element to come after `<Button />` content. */
  startIcon?: React.ReactNode;
  /** CSS MUI Overrides or other styling. */
  className?: string;
}

const defaultProps = {
  variant: "outlined" as "text" | "outlined" | "contained",
  color: "primary" as PropTypes.Color,
};

/** Form Button */
function UnstyledButton({ loading, ...props }: Props) {
  const theme = useTheme();
  return (
    <MaterialButton
      disabled={loading}
      startIcon={
        loading ? (
          <CircularProgress size={theme.fontSizes.medium} />
        ) : (
          props.startIcon
        )
      }
      disableElevation={true}
      {...defaultProps}
      {...props}
      innerRef={props.innerRef}
    />
  );
}

const Button = styled(UnstyledButton)`
  &.MuiButton-root {
    height: 32px;
    font-size: 12px;
    letter-spacing: 1px;
    line-height: 1;
    border-radius: ${(props) => props.theme.borderRadius.soft};
    font-weight: 600;
  }
  &.MuiButton-outlined {
    padding: 8px 12px;
  }
`;

export const IconButton = styled(UnstyledButton)`
  &.MuiButton-root {
    border-radius: 50%;
    min-width: 38px;
    height: 38px;
    padding: 0;
  }
  &.MuiButton-text {
    padding: 0;
  }
`;

export default Button;
