import React, { useEffect, useRef, useState } from "react";
import type {
    UseFormRegister,
    UseFormSetValue,
    FieldValues,
    Path,
    PathValue,
} from "react-hook-form";

type Option = { label: string; value: string };

type Props<T extends FieldValues, Name extends Path<T>> = {
    name: Name;
    label?: string;
    options: Option[];
    register: UseFormRegister<T>;
    setValue: UseFormSetValue<T>;
    watch: (name: Name) => PathValue<T, Name>;
    errors?: Partial<Record<string, any>>;
    placeholder?: string;
};

function UpstreamSelect<T extends FieldValues, Name extends Path<T>>({
    name,
    label = "انتخاب",
    options,
    register,
    setValue,
    watch,
    errors,
    placeholder = "انتخاب کنید",
}: Props<T, Name>) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);

    // مقدار انتخاب شده را می‌گیریم. چون ممکن است PathValue<T, Name> رشته نباشد،
    // برای نمایش در UI آن را به رشته cast می‌کنیم (اگر مطمئنی فیلد string است)
    const selectedValue = watch(name) as unknown as string | undefined;

    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!wrapperRef.current) return;
            if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("click", onDocClick);
        return () => document.removeEventListener("click", onDocClick);
    }, []);

    const onSelect = (value: string) => {
        // اینجا مقدار را به PathValue<T, Name> cast می‌کنیم تا با تایپ setValue سازگار شود.
        // این cast امن است وقتی که بدانیم فیلد فرمِ مربوطه از نوع string است.
        setValue(name, value as PathValue<T, Name>, {
            shouldValidate: true,
            shouldDirty: true,
        });
        setOpen(false);
    };

    return (
        <div className="pt-[26px] w-1/2 max-md:w-full px-[8px]">
            <label className="text-neutral-800 mb-[16px] text-xs block">{label}</label>

            <div ref={wrapperRef} className="relative">
                <input type="hidden" {...register(name as any, { required: true })} />

                <button
                    type="button"
                    onClick={() => setOpen((s) => !s)}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    className={`relative flex items-center w-full h-[2.75rem] text-xs pl-[44px] pr-[12px] rounded-[12px] border transition ${open ? "border-primary-1000 shadow-md" : "border-neutral-300"
                        }`}
                >
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" aria-hidden>
                            <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <div className="w-full text-right truncate" dir="rtl">
                        {options.find((o) => o.value === selectedValue)?.label || placeholder}
                    </div>
                </button>

                {open && (
                    <ul
                        role="listbox"
                        aria-label={label}
                        className="absolute z-40 mt-2 w-full bg-white rounded-[12px] border border-neutral-200 shadow-lg overflow-hidden max-h-48"
                    >
                        {options.map((opt) => (
                            <li
                                key={opt.value}
                                role="option"
                                aria-selected={opt.value === selectedValue}
                                onClick={() => onSelect(opt.value)}
                                className={`cursor-pointer px-[16px] py-[10px] text-xs text-right hover:bg-neutral-100 transition ${opt.value === selectedValue ? "font-medium bg-neutral-50" : ""
                                    }`}
                                dir="rtl"
                            >
                                {opt.label}
                            </li>
                        ))}
                    </ul>
                )}

                {errors && (errors as any)[name] && (
                    <p className="text-xs text-red-500 mt-1">لطفاً یک حوزه انتخاب کنید.</p>
                )}
            </div>
        </div>
    );
}

export default UpstreamSelect;
