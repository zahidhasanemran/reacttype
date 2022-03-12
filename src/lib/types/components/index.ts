export type SubmitBtnType = {
  type?: "button" | "submit" | "reset" | undefined;
  isLoading?: boolean;
  isDasabled?: boolean;
  action?: () => void | Function;
  text?: string;
};
