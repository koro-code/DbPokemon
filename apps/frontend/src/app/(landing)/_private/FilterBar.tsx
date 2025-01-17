"use client";

import { FC, Fragment, useState } from "react";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { TagIcon, XMarkIcon } from "@heroicons/react/24/outline";

const FilterBar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-2 px-4 h-11 bg-white border border-slate-200 rounded-lg hover:border-sky-200 text-slate-700"
      >
        <TagIcon className="w-5 h-5" />
        Recherche par caractéristiques
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                  <div className="flex justify-between items-center mb-6">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-medium text-slate-900"
                    >
                      Recherche par caractéristiques
                    </DialogTitle>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 mb-3">
                        Taille
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <label className="inline-flex items-center border border-slate-200 bg-white rounded-lg px-4 py-2 text-sm hover:border-sky-200 cursor-pointer group">
                          <input
                            type="checkbox"
                            className="w-4 h-4 mr-2 text-sky-600 border-slate-300 rounded focus:ring-sky-500"
                          />
                          <span className="text-slate-600 group-hover:text-sky-600">
                            &lt;1m
                          </span>
                        </label>
                        <label className="inline-flex items-center border border-slate-200 bg-white rounded-lg px-4 py-2 text-sm hover:border-sky-200 cursor-pointer group">
                          <input
                            type="checkbox"
                            className="w-4 h-4 mr-2 text-sky-600 border-slate-300 rounded focus:ring-sky-500"
                          />
                          <span className="text-slate-600 group-hover:text-sky-600">
                            1m-2m
                          </span>
                        </label>
                        <label className="inline-flex items-center border border-slate-200 bg-white rounded-lg px-4 py-2 text-sm hover:border-sky-200 cursor-pointer group">
                          <input
                            type="checkbox"
                            className="w-4 h-4 mr-2 text-sky-600 border-slate-300 rounded focus:ring-sky-500"
                          />
                          <span className="text-slate-600 group-hover:text-sky-600">
                            &gt;2m
                          </span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-slate-700 mb-3">
                        Poids
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <label className="inline-flex items-center border border-slate-200 bg-white rounded-lg px-4 py-2 text-sm hover:border-sky-200 cursor-pointer group">
                          <input
                            type="checkbox"
                            className="w-4 h-4 mr-2 text-sky-600 border-slate-300 rounded focus:ring-sky-500"
                          />
                          <span className="text-slate-600 group-hover:text-sky-600">
                            &lt;10kg
                          </span>
                        </label>
                        {/* Add more weight options */}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-slate-700 mb-3">
                        Type
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {/* Add type options */}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end gap-3">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-5 py-2.5 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-500 transition-colors"
                    >
                      Rechercher
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default FilterBar;
