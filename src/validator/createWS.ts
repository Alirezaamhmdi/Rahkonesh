import {mixed, object  , Schema, string, type InferType } from 'yup'
export const  BG  = { 
     Default : "default" , 
     Prefered : "prefered" , 
     Uploaded : "uploaded" , 
     Colored : "colored" , 
} as const 
const AllowdImage = ['jpeg' , 'png' ]  as const 
const AllowdImageType = ['image/jpeg' , 'image/png' ] as const
export const createWorkSpaceValidator = (workspaceIDs: string[]) => {
    return object({
        Title: string()
            .required('پر کردن این بخش الزامی می‌باشد')
            .min(5 , 'حداقل از  کلمه تشکیل شده باشد')
            .max(100, 'حداکثر 100 حرف می‌تواند داشته باشد'), 
        Description: string()
            .default('')
            .max(250, 'حداکثر از ۲۵۰ کاراکتر تشکیل می‌شود'), 
        WorkSpaceID: string()
            .required('پروژه حتما باید زیرمجموعه یک فضای کاری باشد')
            .oneOf(workspaceIDs, 'فضای کاری انتخاب شده معتبر نیست')
            .defined('پروژه حتما باید زیرمجموعه یک فضای کاری باشد'),
        BGType: string()
            .required('انتخاب نوع تصویر پس‌زمینه الزامی می‌باشد')
            .oneOf(['default', 'prefered', 'uploaded', 'colored'] as const), 
        BG: string().when('BGType' , {
            is : BG.Default , 
            then : (schema) => schema.nullable().optional().default('') , 
            otherwise : (schema) => schema.when('BGType' , {
                is : BG.Uploaded , 
                then : (schema) => schema.nullable().optional().default('') , 
                otherwise : (schema) => schema.required('انتخاب پس‌زمینه الزامی می‌باشد')
            .defined() ,
            })
            

        }) , 
        File : mixed().when('BGType' , {
            is : 'uploaded' , 
            then : (schema) => schema
                                .required('لطفا عکس خود را اپلود کنید')
                                .test('fileType' , `فقط عکس از نوع ${ AllowdImage.join(' و ')} بارگذاری شود`  , (value) => {
                                    if (!value) return false;
  
                                    let file: File | null = null;

                                    if (value instanceof FileList && value.length > 0) {
                                      file = value[0];
                                    } else if (value instanceof File) {
                                      file = value;
                                    }

                                    if (!file ) return false
                                    try {
                                        const valid =  AllowdImageType.includes(file.type as typeof AllowdImageType[number])
                                        return valid
                                    }catch{
                                        return false
                                    }
                                                                  })
                                    .test('fileSize' , 'حداکثر حجم مجاز 5 مگابایت می‌باشد' , (value  ) => {
                                        
                                        if (!value || !(value instanceof FileList) || (value.length == 0) ) return false
                                        const file = value[0]
                                        return file.size <= 5 * 1024 * 1024 
                                    }) , 
                                    otherwise : (schema) => schema.nullable().notRequired().optional()
        })

    })
}

export type WorkSpaceFormData = InferType<ReturnType<typeof createWorkSpaceValidator>>;
export default createWorkSpaceValidator
