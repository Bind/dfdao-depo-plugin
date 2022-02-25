import { CSSProperties } from "react";
import { s } from "src/styles";

export const Stepper = (
  onChange: ((this: GlobalEventHandlers, ev: Event) => any) | null,
  min = "0",
  max = "9"
) => {
  let stepperLabel = document.createElement("label");
  stepperLabel.style.display = "block";
  let stepper = document.createElement("input");
  stepper.type = "range";
  stepper.min = min;
  stepper.max = max;
  stepper.step = "1";
  stepper.value = "2";
  stepper.style.width = "50%";
  stepper.style.height = "24px";
  let stepperValue = document.createElement("span");
  stepperValue.innerText = `${stepper.value}`;
  stepperValue.style.float = "right";
  stepper.onchange = (evt: Event) => {
    // @ts-ignore
    stepperValue.innerText = `${evt.target.value}`;
    // @ts-ignore
    onChange(evt.target.value);
  };
  return stepper;
};

export const Button = (
  innerHTML: string,
  onClick?: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null
) => {
  let button = document.createElement("button");
  button.style.marginBottom = "10px";
  button.innerHTML = innerHTML;
  if (onClick) button.onclick = onClick;
  return button;
};

export const Text = (
  innerHTML: string,
  textAlign: "center" | "left" = "left"
) => {
  let text = document.createElement("p");
  text.innerHTML = innerHTML;
  text.style.textAlign = textAlign;
  return text;
};
export const LineBreak = () => document.createElement("br");

export const Select = (
  options: { value: string; label: string }[],
  onChange: ((this: GlobalEventHandlers, ev: Event) => any) | null
) => {
  var div = document.createElement("div");
  var x = document.createElement("SELECT");
  x.id = "myselect";
  div.appendChild(x);

  options.forEach((o) => {
    var z = document.createElement("option");
    z.value = o.value;
    var t = document.createTextNode(o.label);
    z.appendChild(t);
    x.appendChild(z);
  });

  x.onchange = (evt: Event) => {
    // @ts-ignore
    onChange(evt.target.value);
  };
  return div;
};

export const Box = (text: string, style?: CSSProperties) => {
  const box = document.createElement("div");
  box.innerText = text;
  if (style) s(style)(box);
  return box;
};

export const Row = () => {
  return Box("", { display: "flex", justifyContent: "space-between" });
};

export const wipe = (el: HTMLElement) => {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};
