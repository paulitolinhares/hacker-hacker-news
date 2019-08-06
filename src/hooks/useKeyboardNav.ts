import { useEffect } from "react";

export type KeyNavigationOptions =
  | "top"
  | "left"
  | "right"
  | "down"
  | "toggle"
  | "nextPage"
  | "prevPage";

const keyMap: { [key: string]: KeyNavigationOptions } = {
  w: "top",
  a: "left",
  s: "down",
  d: "right",
  Enter: "toggle",
  ArrowRight: "nextPage",
  ArrowLeft: "prevPage"
};

export default function useKeyboardNav(callback: (key: string) => void) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (keyMap.hasOwnProperty(event.key)) {
        event.preventDefault();
        callback(keyMap[event.key]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [callback]);
}
