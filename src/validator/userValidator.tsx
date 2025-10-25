import * as yup from 'yup';
import { type InferType } from 'yup';

export const UserValidator = yup
    .object({
        name: yup
            .string()
            .trim()
            .required('نام الزامی است')
            .max(50, 'حداکثر ۳۰ کاراکتر'),

        lastname: yup
            .string()
            .trim()
            .required('نام خانوادگی الزامی است')
            .max(50, 'حداکثر ۳۰ کاراکتر'),

        username: yup
            .string()
            .trim()
            .required('نام کاربری الزامی است')
            .matches(/^[a-zA-Z0-9._-]+$/, 'نام کاربری فقط می‌تواند حروف انگلیسی، اعداد، نقطه، زیرخط یا خط‌منفی داشته باشد')
            .min(6, 'حداقل 6 کاراکتر')
            .max(30, 'حداکثر ۳۰ کاراکتر'),

        password: yup
            .string()
            .required('رمز عبور الزامی است')
            .min(8, 'حداقل ۸ کاراکتر')
            .max(50, 'حداکثر 50 کاراکتر'),

        email: yup
            .string().email('باید ایمیل باشد')
            .trim()
            .optional()
            .nullable()
            .default(null)
            .max(100, 'حداکثر 100 کاراکتر'),

        phone: yup
            .string()
            .trim()
            .optional()
            .nullable()
            .default(null)
            .max(11, 'حداکثر 11 کاراکتر')
            .matches(/^\d{0,11}$/, "باید شماره تلفن باشد"),

        personal_code: yup
            .string()
            .trim()
            .optional()
            .nullable()
            .default(null)
            .max(10, 'حداکثر 10 کاراکتر'),


    })
    .required();

export type UserFormData = InferType<typeof UserValidator>;


export default UserValidator;