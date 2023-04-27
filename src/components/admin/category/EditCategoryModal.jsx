import React,{Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import EditCategoryCmp from './EditCategoryCmp'

export default function EditCategoryModal(props) {
    const cancelButtonRef = useRef(null)

    return (
      <Transition.Root show={props.show} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={props.hide}>
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
            <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="flex justify-between bg-gray-50 px-4 py-3 sm:px-6">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                          Edit Category
                    </Dialog.Title>
                    <button type='button' onClick={()=>{props.hide()}}><XMarkIcon  className="block h-8 w-8" aria-hidden="true"/> </button>
                </div>
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                        <div className="mt-2">
                            <EditCategoryCmp toedit={props.toedit}/>
                        </div>
          
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    )
}
