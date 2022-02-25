import { CSSProperties } from "react";

export const s = (styles: CSSProperties) => {
  return (el: HTMLElement) => {
    Object.keys(styles).forEach((key) => {
      el.style[key] = styles[key];
    });
    return el;
  };
};

type spacingStyle = "12px" | "16px" | "24px";
type Direction = "left" | "right" | "up" | "down";
const directionMapping = {
  left: "marginLeft",
  right: "marginRight",
  top: "marginTop",
  bottom: "marginBottom",
};
const space = (el: HTMLElement, direction: Direction, sp: spacingStyle) => {
  el.style[directionMapping[direction]] = sp;
  return el;
};

const tabButtonStyle = {
  width: "50%",
};

const empthStyle = {
  fontWeight: 600,
  color: "cyan",
};
const headerStyle: CSSProperties = {
  fontSize: "14px",
  fontFamily: "monospace",
  textAlign: "center",
  ...empthStyle,
};

export const styles = {
  tabButton: s(tabButtonStyle),
  header: s(headerStyle),
  emph: s(empthStyle),
  space,
};
