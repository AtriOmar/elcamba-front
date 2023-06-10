import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal({
  show,
  hide,
  afterEnter = () => {},
  afterLeave = () => {},
  initialFocusRef,
  dialogClassName = "w-full scr600:max-w-[500px] py-20 px-6 scr600:rounded-[50px]",
  children,
}) {
  return (
    <Transition.Root show={show} as={Fragment} afterEnter={afterEnter} afterLeave={afterLeave}>
      <Dialog as="div" className="relative z-20" initialFocus={initialFocusRef} onClose={hide}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex scr600:items-center justify-center min-h-full scr600:p-4 text-center cursor-pointer">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 scr600:translate-y-0 scr600:scale-95"
              enterTo="opacity-100 translate-y-0 scr600:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scr600:scale-100"
              leaveTo="opacity-0 translate-y-4 scr600:translate-y-0 scr600:scale-95"
            >
              <Dialog.Panel className={`${dialogClassName} relative bg-white text-left transform overflow-hidden shadow-xl transition-all cursor-auto`}>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
