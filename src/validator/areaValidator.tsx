import * as yup from 'yup';
import { type InferType } from 'yup';

export const AreaValidator = yup
    .object({
        name: yup
            .string()
            .trim()
            .required('نام الزامی است')
            .max(50, 'حداکثر ۳۰ کاراکتر'),

        manager: yup
            .string()
            .required('مدیر حوزه الزامی است')

    })
    .required();

export type AreaFormData = InferType<typeof AreaValidator>;


export default AreaValidator;