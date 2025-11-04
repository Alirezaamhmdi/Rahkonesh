import * as yup from 'yup';
import { type InferType } from 'yup';

export const ProgramValidator = yup
    .object({
        name: yup
            .string()
            .trim()
            .required('نام الزامی است')
            .max(50, 'حداکثر ۳۰ کاراکتر'),

        manager: yup
            .string()
            .required('مدیر حوزه الزامی است'),

        parent: yup
            .string()
            .nullable()
            .required('لطفاً یک حوزه بالا‌دستی انتخاب کنید')
            .trim()


    })
    .required();

export type ProgramFormData = InferType<typeof ProgramValidator>;


export default ProgramValidator;