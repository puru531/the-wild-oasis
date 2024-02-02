import {
  cloneElement,
  createContext,
  useContext,
  // useEffect,
  // useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  // return createElement(children.type, {
  //   ...children.props,
  //   onClick: () => open(opensWindowName),
  // });
  return cloneElement(children, { onClick: () => open(opensWindowName) });
  // return renderButton(() => open(opensWindowName));
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  // const ref = useRef();

  //converted into custom hook

  // useEffect(function () {
  //   function handleClick(e) {
  //     if (ref.current && !ref.current.contains(e.target)) {
  //       // console.log("Clicked outside, closing modal.", e.target, ref.current);
  //       close();
  //     }
  //   }
  //   document.addEventListener("click", handleClick, true); //do not listen to the event in bubbling phase but in capturing phase, as the event moves down the dom tree, not up the dom tree

  //   return () => document.removeEventListener("click", handleClick, true);
  // }, []);

  if (name !== openName) return null;

  //This will bring the component out of the normal DOM, still keep the component tree intact
  //Takes two args, element and position
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>
          {/* {createElement(children.type, {
            ...children.props,
            onCloseModal: () => close,
          })} */}

          {cloneElement(children, { onCloseModal: close })}

          {/* {children} === to pass the props from here, we need to clone it */}
        </div>
      </StyledModal>
    </Overlay>,
    document.body
    // document.querySelector()
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
