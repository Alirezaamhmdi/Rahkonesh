import { useEffect, useRef, useState } from "react";
import instance from "../../server/instance";

import type {
    UseFormRegister,
    UseFormSetValue,
    UseFormGetValues,
    FieldValues,
    Path,
    PathValue,
} from "react-hook-form";

type Option = { label: string; value: string | number };

type Props<T extends FieldValues, Name extends Path<T>> = {
    name: Name;
    label?: string;
    options?: Option[]; 
    register: UseFormRegister<T>;
    setValue: UseFormSetValue<T>;
    getValues: UseFormGetValues<T>;
    watch: (name: Name) => PathValue<T, Name>;
    errors?: Partial<Record<string, any>>;
    placeholder?: string;
};

const UpstreamSelect = <T extends FieldValues, Name extends Path<T>>({
    name,
    label = "انتخاب",
    options = [],
    register,
    setValue,
    getValues,
    watch,
    errors,
    placeholder = "انتخاب کنید",
}: Props<T, Name>) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    // Logic Fix: Initialize data with passed options, so it's useful if API isn't needed
    const [data, setData] = useState<Option[]>(options); 
    const selectedValue = watch(name) as unknown as string | number | undefined;

    // Close on click outside
    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!wrapperRef.current) return;
            if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("click", onDocClick);
        return () => document.removeEventListener("click", onDocClick);
    }, []);

    // Logic Fix: Only fetch if no options were passed manually
    useEffect(() => {
        if (options.length === 0 && !loading) {
            setLoading(true);
            const query = "";
            instance
                .get(`/area/all?${query}&skip=${0}&take=${20}`)
                .then((res) => {
                    const items = res.data.data || [];
                    // Logic Fix: Map based on "Area" structure (title), fall back to name if needed
                    const mappedOptions = items.map((u: any) => ({
                        label: u.title || u.name || "بدون عنوان", 
                        value: u.id, // Keep the ID as is (number or string)
                    }));
                    setData(mappedOptions);
                })
                .catch((err: any) => {
                    console.error("Error fetching areas:", err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [options.length]); // Depend on options length

    const onSelect = (value: string | number) => {
        // Logic Fix: Explicitly cast value to match PathValue type for RHF
        setValue(name, value as PathValue<T, Name>, {
            shouldValidate: true,
            shouldDirty: true,
        });
        setOpen(false);
    };

    // Helper to find the selected label safely
    const selectedLabel = data.find((o) => String(o.value) === String(selectedValue))?.label;

    return (
        <div className="pt-[26px] w-1/2 max-md:w-full px-[8px]">
            <label className="text-neutral-800 mb-[16px] text-xs block">{label}</label>

            <div ref={wrapperRef} className="relative">
                {/* Logic Fix: Register properly to ensure 'required' validation works */}
                <input type="hidden" {...register(name, { required: true })} />

                <button
                    type="button"
                    onClick={() => setOpen((s) => !s)}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    className={`relative flex items-center w-full h-[2.75rem] text-xs pl-[44px] pr-[12px] rounded-[12px] border transition ${
                        open ? "border-primary-1000 shadow-md" : "border-neutral-300"
                    }`}
                >
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" aria-hidden>
                            <path
                                d="M6 8l4 4 4-4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <div className="w-full text-right truncate" dir="rtl">
                        {selectedLabel || placeholder}
                    </div>
                </button>

                {open && (
                    <ul
                        role="listbox"
                        aria-label={label}
                        className="absolute z-40 mt-2 w-full bg-white rounded-[12px] border border-neutral-200 shadow-lg overflow-hidden max-h-48 overflow-y-auto"
                    >
                        {loading ? (
                            <li className="px-[16px] py-[10px] text-xs text-neutral-500 text-right">
                                در حال بارگذاری...
                            </li>
                        ) : data.length > 0 ? (
                            data.map((opt) => (
                                <li
                                    key={opt.value}
                                    role="option"
                                    aria-selected={opt.value === selectedValue}
                                    onClick={() => onSelect(opt.value)}
                                    className={`cursor-pointer px-[16px] py-[10px] text-xs text-right hover:bg-neutral-100 transition ${
                                        opt.value === selectedValue ? "font-medium bg-neutral-50" : ""
                                    }`}
                                    dir="rtl"
                                >
                                    {opt.label}
                                </li>
                            ))
                        ) : (
                            <li className="px-[16px] py-[10px] text-xs text-neutral-500 text-right">
                                موردی یافت نشد.
                            </li>
                        )}
                    </ul>
                )}

                {errors && (errors as any)[name] && (
                    <p className="text-xs text-red-500 mt-1">
                        لطفاً یک گزینه انتخاب کنید.
                    </p>
                )}
            </div>
        </div>
    );
};

export default UpstreamSelect;
