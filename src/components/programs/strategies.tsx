import { useEffect, useRef, useState } from "react";
import Close from "../../assets/icons/iconixto/linear/close.svg?react";
import InputStructure from "../inputStructure";
import type {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { ProgramFormData } from "../../validator/programValidator";

/* ✅ CLEAN PROPS */
interface StrategiesProps {
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  errors: any;
  loading: boolean;
  handleClick: (formValues: ProgramFormData) => Promise<void>;
}

const Strategies: React.FC<StrategiesProps> = ({
  register,
  setValue,
  watch,
  errors,
  loading,
  handleSubmit,
  handleClick,
}) => {
  const navigate = useNavigate();
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const [strategies, setStrategies] = useState<string[]>([
    "راهبرد 1",
    "راهبرد 2",
  ]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const getInputIndexForStrategy = (strategyIdx: number) => strategyIdx + 1;

  useEffect(() => {
    if (editingIndex === null) return;
    const idx = getInputIndexForStrategy(editingIndex);
    const el = inputsRef.current[idx];
    if (el) {
      setTimeout(() => el.focus(), 0);
      try {
        const len = el.value.length;
        el.setSelectionRange(len, len);
      } catch {}
    }
  }, [editingIndex]);

  const handleEditClick = (idx: number) => {
    setValue(`strategies.${idx}.title` as any, strategies[idx]);
    setEditingIndex(idx);
  };

  const addStrategy = () => {
    if (editingIndex !== null) {
      const pos = getInputIndexForStrategy(editingIndex);
      const el = inputsRef.current[pos];
      const currentVal = el ? el.value.trim() : strategies[editingIndex];

      if (currentVal === "") {
        setStrategies((prev) => prev.filter((_, i) => i !== editingIndex));
      } else {
        setStrategies((prev) => {
          const copy = [...prev];
          copy[editingIndex] = currentVal;
          return copy;
        });
      }

      setEditingIndex(null);
    }

    setStrategies((prev) => [...prev, ""]);
    setEditingIndex(strategies.length);
    setValue(`strategies.${strategies.length}.title` as any, "");
  };

  const removeStrategy = (index: number) => {
    setStrategies((prev) => prev.filter((_, i) => i !== index));
    setEditingIndex(null);
    inputsRef.current = inputsRef.current.filter(
      (_, i) => i !== getInputIndexForStrategy(index)
    );
  };

  const handleFinishEdit = async () => {
    if (editingIndex === null) return;

    const pos = getInputIndexForStrategy(editingIndex);
    const el = inputsRef.current[pos];
    const newVal = el ? el.value.trim() : "";

    if (newVal === "") {
      setStrategies((prev) => prev.filter((_, i) => i !== editingIndex));
    } else {
      setStrategies((prev) => {
        const copy = [...prev];
        copy[editingIndex] = newVal;
        return copy;
      });
    }

    setEditingIndex(null);
  };

  return (
    <div>
      <div className="mt-4">
        <label className="text-neutral-600 text-lg mb-[8px] inline-block">
          راهبردهای مصوب
        </label>

        <div className="space-y-2">
          {strategies.length === 0 ? (
            <div className="text-neutral-500 text-sm">
              هیچ راهبردی وجود ندارد.
            </div>
          ) : (
            strategies.map((val, idx) => {
              const inputIndex = getInputIndexForStrategy(idx);
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex-1">
                    {editingIndex === idx ? (
                      <InputStructure
                        className="px-[20px] text-xs border border-neutral-300 rounded-[12px] h-[2.75rem] w-full focus-visible:border-primary-1000 transition"
                        register={register}
                        name={`strategies.${idx}.title` as any}
                        type="text"
                        placeholder="راهبرد نمونه"
                        Ref={inputsRef}
                        index={inputIndex}
                        errors={errors}
                        onSubmit={handleFinishEdit}
                      />
                    ) : (
                      <div
                        className="text-sm text-neutral-800 cursor-text"
                        onClick={() => handleEditClick(idx)}
                      >
                        {idx + 1}. {val}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeStrategy(idx)}
                    className="p-2 rounded-full hover:bg-neutral-100 transition"
                  >
                    <Close className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-3">
          <button
            type="button"
            onClick={addStrategy}
            className="p-[10px] hover:opacity-80 transition text-primary-1000 text-sm rounded-[12px] border border-primary-1000"
          >
            افزودن راهبرد
          </button>
        </div>
      </div>
    </div>
  );
};

export default Strategies;
