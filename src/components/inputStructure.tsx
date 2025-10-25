import type { FieldErrors, UseFormRegister } from "react-hook-form";

const InputStructure: React.FC<{
    register: UseFormRegister<any>,
    name: string,
    type: string,
    placeholder: string,
    Ref: any,
    index: number,
    className: string,
    errors: FieldErrors<any>,
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
}> = ({ register, name, type, placeholder, Ref, index, errors, className, onSubmit }) => {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const nextInput = Ref.current[index + 1];
            if (nextInput) {
                nextInput.focus();
            } else {
                onSubmit();
            }
        }
    };

    return (<>
        <input
            placeholder={placeholder}
            type={type}
            {...register(name)}
            ref={(el) => {
                register(name).ref(el);
                Ref.current[index] = el!;
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
            // aria-invalid={!!errors.password}
            // aria-describedby={errors.password ? "password-error" : undefined}
            className={className}
        />
        {errors[name] && (
            <p className="mt-1 text-sm text-red-600">
                {errors[name]?.message?.toString()}
            </p>
        )}
    </>)
}
export default InputStructure;