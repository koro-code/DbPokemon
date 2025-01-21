"use client";

import {
  redirect,
  RedirectType,
  usePathname,
  useSearchParams,
} from "next/navigation";

import { FC, Fragment, useCallback, useMemo, useState } from "react";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { TagIcon, XMarkIcon } from "@heroicons/react/24/outline";

const FilterBar: FC<{
  title: string;
}> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const queryparams = useSearchParams();

  const { sizes, weights } = useMemo(() => {
    const filter = queryparams.get("filter");

    if (filter) {
      const { sizes, weights } = JSON.parse(filter);

      return {
        sizes: new Set<string>(sizes),
        weights: new Set<string>(weights),
      };
    } else {
      return {
        sizes: new Set<string>(),
        weights: new Set<string>(),
      };
    }
  }, [queryparams]);

  const [selectedSize, setSelectedSize] = useState<Set<string>>(sizes);
  const [selectedWeight, setSelectedWeight] = useState<Set<string>>(weights);

  const toggleSize = useCallback((size: string) => {
    setSelectedSize((old) => {
      if (old.has(size)) {
        old.delete(size);
      } else {
        old.add(size);
      }

      return new Set(old);
    });
  }, []);

  const toggleWeight = useCallback((weight: string) => {
    setSelectedWeight((old) => {
      if (old.has(weight)) {
        old.delete(weight);
      } else {
        old.add(weight);
      }

      return new Set(old);
    });
  }, []);

  const pathname = usePathname();

  const handleApplyFilters = useCallback(
    (sizes: Set<string>, weights: Set<string>) => {
      setIsOpen(false);

      const query = new URLSearchParams();

      query.set(
        "filter",
        JSON.stringify({
          sizes: Array.from(sizes),
          weights: Array.from(weights),
        }),
      );

      redirect(`${pathname}?${query.toString()}`, RedirectType.replace);
    },
    [pathname],
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-lg hover:border-sky-200 text-slate-700"
      >
        <TagIcon className="w-5 h-5" />
        <span>{title}</span>
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
                      {title}
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
                            type="checkbox"
                            checked={selectedSize.has("<1m")}
                            onChange={() => {
                              toggleSize("<1m");
                            }}
                          />
                          <span>&lt;1m</span>
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={selectedSize.has("1m-2m")}
                            onChange={() => {
                              toggleSize("1m-2m");
                            }}
                          />
                          <span>1m-2m</span>
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={selectedSize.has(">2m")}
                            onChange={() => {
                              toggleSize(">2m");
                            }}
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
                            type="checkbox"
                            checked={selectedWeight.has("<10kg")}
                            onChange={() => {
                              toggleWeight("<10kg");
                            }}
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
                        handleApplyFilters(selectedSize, selectedWeight);
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
