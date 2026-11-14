import * as yup from 'yup';
import { type InferType } from 'yup';

export const ProgramValidator = yup
    .object({
        name: yup
            .string()
            .trim()
            .required('نام الزامی است')
            .max(50, 'حداکثر 50 کاراکتر'),

        manager_id: yup
            .string()
            .required('مدیر برنامه الزامی است'),
        area_id: yup
            .number()
            .required('حوزه بالا دستی الزامی است'),
        head_steering_council_id: yup
            .string()
        ,
        secretary_steering_council_id: yup
            .string()
        ,

        strategies: yup
            .array()
            .of(
                yup.object({
                    title: yup.string()
                })
            )
        ,


    })


// export type ProgramFormData = InferType<typeof ProgramValidator>;
export type ProgramFormData = {
    name: string;
    manager_id: string;
    area_id: string;
    head_steering_council_id: string | undefined;    // توجه: بدون ?
    secretary_steering_council_id: string | undefined;
    strategies: { title: string }[] | undefined;
};




export default ProgramValidator;