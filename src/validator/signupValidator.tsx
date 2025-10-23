import * as yup from 'yup';
import { type InferType } from 'yup';

export const SignupValidator = yup
.object({
name: yup
.string()
.trim()
.required('نام الزامی است')
.min(2, 'حداقل ۲ کاراکتر')
.max(50, 'حداکثر ۵۰ کاراکتر'),


lastName: yup
.string()
.trim()
.required('نام خانوادگی الزامی است')
.min(2, 'حداقل ۲ کاراکتر')
.max(50, 'حداکثر ۵۰ کاراکتر'),


username: yup
.string()
.trim()
.required('نام کاربری الزامی است')
.matches(/^[a-zA-Z0-9._-]+$/, 'نام کاربری فقط می‌تواند حروف انگلیسی، اعداد، نقطه، _ یا - داشته باشد')
.min(3, 'حداقل ۳ کاراکتر')
.max(30, 'حداکثر ۳۰ کاراکتر'),


password: yup
.string()
.required('رمز عبور الزامی است')
.min(8, 'حداقل ۸ کاراکتر')
.max(50, 'حداکثر ۵۰ کاراکتر')
})
.required();


export type SignupFormData = InferType<typeof SignupValidator>;


export default SignupValidator;