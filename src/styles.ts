import { CSSProperties } from "react";

export const s = (styles: CSSProperties) => {
  return (el: HTMLElement) => {
    Object.keys(styles).forEach((key) => {
      el.style[key] = styles[key];
    });
    return el;
  };
};

const tabButtonStyle = {
  width: "50%",
};
const headerStyle: CSSProperties = {
  textAlign: "center",
  fontFamily: "monospace",
  fontWeight: 600,
  fontSize: "14px",
  color: "cyan",
};

export const styles = {
  tabButton: s(tabButtonStyle),
  header: s(headerStyle),
};
