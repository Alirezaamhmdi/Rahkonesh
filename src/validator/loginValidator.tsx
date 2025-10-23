import * as yup from 'yup';
import { type InferType } from 'yup';

export const LoginValidator = yup
.object({
username: yup
.string()
.trim()
.required('نام کاربری الزامی است')
.matches(/^[a-zA-Z0-9._-]+$/, 'نام کاربری فقط می‌تواند حروف انگلیسی، اعداد، نقطه، زیرخط یا خط‌منفی داشته باشد')
.min(3, 'حداقل ۳ کاراکتر')
.max(30, 'حداکثر ۳۰ کاراکتر'),


password: yup
.string()
.required('رمز عبور الزامی است')
.min(8, 'حداقل ۸ کاراکتر')
.max(128, 'حداکثر ۱۲۸ کاراکتر'),
})
.required();


export type LoginFormData = InferType<typeof LoginValidator>;


export default LoginValidator;