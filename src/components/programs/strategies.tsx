import { useEffect, useRef, useState } from "react";
import Close from "../../assets/icons/iconixto/linear/close.svg?react";
import InputStructure from "../inputStructure";
import instance from "../../server/instance";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { AreaValidator, type AreaFormData } from "../../validator/areaValidator";
import { usePrograms } from "../../context/programContext"; // <-- new

const Strategies: React.FC = () => {
  const navigate = useNavigate();
  const { addProgram } = usePrograms(); // <-- usePrograms
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [strategies, setStrategies] = useState<string[]>(["راهبرد 1", "راهبرد 2"]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<AreaFormData>({
    resolver: yupResolver(AreaValidator),
  });

  const getInputIndexForStrategy = (strategyIdx: number) => strategyIdx + 1;

  useEffect(() => {
    if (editingIndex === null) return;
    const idx = getInputIndexForStrategy(editingIndex);
    const el = inputsRef.current[idx];
    if (el) {
      setTimeout(() => el.focus(), 0);
      setTimeout(() => {
        try {
          const len = el.value.length;
          el.setSelectionRange(len, len);
        } catch { }
      }, 10);
    }
  }, [editingIndex]);

  const handleEditClick = (idx: number) => {
    setValue(`strategies.${idx}` as any, strategies[idx]);
    setEditingIndex(idx);
  };

  const addStrategy = () => {
    if (editingIndex !== null) {
      const pos = getInputIndexForStrategy(editingIndex);
      const el = inputsRef.current[pos];
      const currentVal = el ? el.value.trim() : strategies[editingIndex];
      if (currentVal === "") {
        setStrategies(prev => prev.filter((_, i) => i !== editingIndex));
        inputsRef.current = inputsRef.current.filter((_, i) => i !== pos);
        setEditingIndex(null);
      } else {
        setStrategies(prev => {
          const copy = [...prev];
          copy[editingIndex] = currentVal;
          copy.forEach((s, i) => setValue(`strategies.${i}` as any, s));
          return copy;
        });
        setEditingIndex(null);
      }
    }

    const newIndex = strategies.length;
    setStrategies(prev => {
      const next = [...prev, ""];
      try { setValue(`strategies.${next.length - 1}` as any, ""); } catch { }
      return next;
    });
    setEditingIndex(newIndex);
  };

  const removeStrategy = (index: number) => {
    setStrategies(prev => {
      const next = prev.filter((_, i) => i !== index);
      try { next.forEach((s, i) => setValue(`strategies.${i}` as any, s)); } catch { }
      return next;
    });

    setEditingIndex(prev => {
      if (prev === null) return null;
      if (prev === index) return null;
      if (prev > index) return prev - 1;
      return prev;
    });

    const posToRemove = getInputIndexForStrategy(index);
    inputsRef.current = inputsRef.current.filter((_, i) => i !== posToRemove);
  };

  const handleFinishEdit = async () => {
    if (editingIndex === null) return;
    try {
      const pos = getInputIndexForStrategy(editingIndex);
      const el = inputsRef.current[pos];
      const newVal = el ? el.value.trim() : strategies[editingIndex];
      if (newVal === "") {
        setStrategies(prev => prev.filter((_, i) => i !== editingIndex));
        inputsRef.current = inputsRef.current.filter((_, i) => i !== pos);
        try {
          setTimeout(() => {
            strategies.filter((_, i) => i !== editingIndex).forEach((s, i) => setValue(`strategies.${i}` as any, s));
          }, 0);
        } catch { }
      } else {
        setStrategies(prev => {
          const copy = [...prev];
          copy[editingIndex] = newVal;
          try { copy.forEach((s, i) => setValue(`strategies.${i}` as any, s)); } catch { }
          return copy;
        });
      }
    } finally {
      setEditingIndex(null);
    }
  };

  async function handleClick(formValues: AreaFormData) {
    setLoading(true);
    try {
      const payload = {
        ...formValues,
        strategies,
      };

      // change endpoint to program
      const response = await instance.post(`/program/create`, payload);
      addProgram(response.data);
      navigate(-1);
    } catch (err: any) {
      console.log("create program error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mt-4">
        <label className="text-neutral-600 text-xs mb-[8px] inline-block">
          لیست راهبردها
        </label>

        <div className="space-y-2">
          {strategies.length === 0 ? (
            <div className="text-neutral-500 text-sm">هیچ راهبردی وجود ندارد.</div>
          ) : (
            strategies.map((val, idx) => {
              const inputIndex = getInputIndexForStrategy(idx);
              return (
                <div key={idx} className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    {editingIndex === idx ? (
                      <InputStructure
                        className="px-[20px] text-xs border border-neutral-300 rounded-[12px] h-[2.75rem] w-full focus-visible:border-primary-1000 transition"
                        register={register}
                        name={`strategies.${idx}` as any}
                        type={"text"}
                        placeholder={"راهبرد نمونه"}
                        Ref={inputsRef}
                        index={inputIndex}
                        errors={errors}
                        onSubmit={async () => {
                          await handleFinishEdit();
                        }}
                      />
                    ) : (
                      <div className="text-sm text-neutral-800 cursor-text" onClick={() => handleEditClick(idx)}>
                        {idx + 1}. {val}
                      </div>
                    )}
                  </div>

                  <button type="button" onClick={() => removeStrategy(idx)} className="p-2 rounded-full hover:bg-neutral-100 transition" aria-label={`حذف راهبرد ${idx + 1}`}>
                    <Close className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-3">
          <button type="button" onClick={addStrategy} className="p-[10px] hover:opacity-80 transition text-primary-1000 text-sm rounded-[12px] border border-primary-1000">
            افزودن راهبرد
          </button>
        </div>
      </div>

      <div className="flex justify-content-between gap-[48px] pt-[1rem]">
        <button onClick={handleSubmit(handleClick)} disabled={loading} className="p-[12px] relative hover:opacity-70 transition bg-primary-1000 text-white text-sm rounded-[12px] border border-primary-1000 flex-1">
          افزودن اعضا
          {loading && <div className="loader w-[30px] border-[4px] border-primary-500 absolute top-[8px] left-[10px]"></div>}
        </button>
        <button onClick={() => navigate(-1)} className="p-[12px] hover:opacity-70 transition text-neutral-500 text-sm rounded-[12px] border border-neutral-500 flex-1">
          انصراف
        </button>
      </div>
    </div>
  );
};

export default Strategies;
