import type { FieldErrors, UseFormRegister } from "react-hook-form";
import React from "react";

interface InputStructureProps {
  register: UseFormRegister<any>;
  name: string;
  type: string;
  placeholder?: string;
  className?: string;
  errors?: FieldErrors<any>;

  /** optional – only for enter navigation */
  Ref?: React.MutableRefObject<HTMLInputElement[]>;
  index?: number;
  onSubmit?: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

const InputStructure: React.FC<InputStructureProps> = ({
  register,
  name,
  type,
  placeholder,
  Ref,
  index,
  errors,
  className,
  onSubmit,
}) => {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    // ✅ if Ref logic exists → focus next
    if (Ref && typeof index === "number") {
      const nextInput = Ref.current[index + 1];
      if (nextInput) {
        nextInput.focus();
        return;
      }
    }

    // ✅ otherwise fallback to submit
    onSubmit?.();
  };

  return (
    <>
      <input
        placeholder={placeholder}
        type={type}
        {...register(name)}
        ref={(el) => {
          register(name).ref(el);
          if (Ref && typeof index === "number" && el) {
            Ref.current[index] = el;
          }
        }}
        onKeyDown={handleKeyDown}
        className={className}
      />

      {errors?.[name] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </>
  );
};

export default InputStructure;
