"use client";

import {
  redirect,
  RedirectType,
  usePathname,
  useSearchParams,
} from "next/navigation";

import { FC, Fragment, useCallback, useEffect, useMemo, useState } from "react";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { TagIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { SearchFilter } from "../api/sparql";

const FilterBar: FC<{
  title: string;
}> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const searchParams = useSearchParams();

  const filterValue: SearchFilter = useMemo(() => {
    const filterParam = searchParams.get("filter");

    if (filterParam) {
      return JSON.parse(filterParam);
    }

    return {};
  }, [searchParams]);

  const [selectedSize, setSelectedSize] = useState(filterValue.size);
  const [selectedWeight, setSelectedWeight] = useState(filterValue.weight);

  useEffect(() => {
    setSelectedSize(filterValue.size);
    setSelectedWeight(filterValue.weight);
  }, [filterValue.size, filterValue.weight]);

  const pathname = usePathname();

  const handleFilter = useCallback(async () => {
    const filter: SearchFilter = {
      ...filterValue,
      size: selectedSize,
      weight: selectedWeight,
    };

    redirect(
      `${pathname}?filter=${JSON.stringify(filter)}`,
      RedirectType.replace,
    );
  }, [selectedSize, selectedWeight, pathname]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-lg hover:border-sky-200 text-slate-700"
      >
        <TagIcon className="w-5 h-5" />
        <span>{props.title}</span>
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
                      {props.title}
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
                        <label>
                          <input
                            type="radio"
                            name="size"
                            value="<1m"
                            checked={selectedSize === "<1m"}
                            onChange={(e) => setSelectedSize(e.target.value)}
                          />
                          <span>&lt;1m</span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="size"
                            value="1m-2m"
                            checked={selectedSize === "1m-2m"}
                            onChange={(e) => setSelectedSize(e.target.value)}
                          />
                          <span>1m-2m</span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="size"
                            value=">2m"
                            checked={selectedSize === ">2m"}
                            onChange={(e) => setSelectedSize(e.target.value)}
                          />
                          <span>&gt;2m</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-slate-700 mb-3">
                        Poids
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <label>
                          <input
                            type="radio"
                            name="weight"
                            value="<10kg"
                            checked={selectedWeight === "<10kg"}
                            onChange={(e) => setSelectedWeight(e.target.value)}
                          />
                          <span>&lt;10kg</span>
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
                      onClick={() => {
                        handleFilter();
                      }}
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
