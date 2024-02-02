import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          // console.log("Clicked outside, closing modal.", e.target, ref.current);
          handler();
        }
      }
      document.addEventListener("click", handleClick, listenCapturing); //do not listen to the event in bubbling phase but in capturing phase, as the event moves down the dom tree, not up the dom tree

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
