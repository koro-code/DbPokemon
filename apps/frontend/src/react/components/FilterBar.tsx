"use client";

import { redirect, RedirectType, useSearchParams } from "next/navigation";

import { FC, Fragment, useCallback, useEffect, useMemo, useState } from "react";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { TagIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { SearchFilter } from "../../app/(ui)/search/_private/api/sparql";

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

  const handleFilter = useCallback(async () => {
    const filter: SearchFilter = {
      ...filterValue,
      size: selectedSize,
      weight: selectedWeight,
    };

    redirect(`/search?filter=${JSON.stringify(filter)}`, RedirectType.push);
  }, [selectedSize, selectedWeight]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-lg hover:border-sky-200 text-slate-700 transition-colors duration-200"
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
                <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all">
                  <div className="flex justify-between items-center mb-8">
                    <DialogTitle
                      as="h3"
                      className="text-xl font-semibold text-slate-900"
                    >
                      {props.title}
                    </DialogTitle>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 mb-4">
                        Taille
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {[
                          { value: "100.0M", label: "< 100.0M" },
                          { value: "80.0M", label: "< 80.0M" },
                          { value: "60.0M", label: "< 60.0M" },
                          { value: "40.0M", label: "< 40.0M" },
                          { value: "20.0M", label: "< 20.0M" },
                          { value: "10.0M", label: "< 10.0M" },
                          { value: "5.0M", label: "< 5.0M" },
                          { value: "2.0M", label: "< 2.0M" },
                          { value: "1.0M", label: "< 1.0M" },
                          { value: "0.5M", label: "< 0.5M" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="relative flex items-center group"
                          >
                            <input
                              type="radio"
                              name="size"
                              value={option.value}
                              checked={selectedSize === option.value}
                              onChange={(e) => setSelectedSize(e.target.value)}
                              className="absolute w-full h-full opacity-0 cursor-pointer"
                            />
                            <span
                              className={`
                              px-4 py-2 rounded-lg border text-sm font-medium
                              transition-colors duration-200 cursor-pointer
                              ${
                                selectedSize === option.value
                                  ? "border-sky-600 bg-sky-50 text-sky-600"
                                  : "border-slate-200 text-slate-600 hover:border-sky-200 hover:bg-sky-50/50"
                              }
                            `}
                            >
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-slate-700 mb-4">
                        Poids
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {[
                          { value: "100.0KG", label: "< 100.0KG" },
                          { value: "80.0KG", label: "< 80.0KG" },
                          { value: "60.0KG", label: "< 60.0KG" },
                          { value: "40.0KG", label: "< 40.0KG" },
                          { value: "20.0KG", label: "< 20.0KG" },
                          { value: "10.0KG", label: "< 10.0KG" },
                          { value: "5.0KG", label: "< 5.0KG" },
                          { value: "2.0KG", label: "< 2.0KG" },
                          { value: "1.0KG", label: "< 1.0KG" },
                          { value: "0.5KG", label: "< 0.5KG" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="relative flex items-center group"
                          >
                            <input
                              type="radio"
                              name="weight"
                              value={option.value}
                              checked={selectedWeight === option.value}
                              onChange={(e) =>
                                setSelectedWeight(e.target.value)
                              }
                              className="absolute w-full h-full opacity-0 cursor-pointer"
                            />
                            <span
                              className={`
                              px-4 py-2 rounded-lg border text-sm font-medium
                              transition-colors duration-200 cursor-pointer
                              ${
                                selectedWeight === option.value
                                  ? "border-sky-600 bg-sky-50 text-sky-600"
                                  : "border-slate-200 text-slate-600 hover:border-sky-200 hover:bg-sky-50/50"
                              }
                            `}
                            >
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end gap-3">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => {
                        handleFilter();
                        setIsOpen(false);
                      }}
                      className="px-5 py-2.5 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-500 transition-colors duration-200"
                    >
                      Appliquer les filtres
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
