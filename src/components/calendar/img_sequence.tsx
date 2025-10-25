import React from 'react' 
import {type Users } from '../../redux/main_store/reducers/users'
import MiniPicture from '../picture/minipicture'
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/main_store/main_store'

function isUser(param: string | Users): param is Users {
  return (param as Users).ID !== undefined && 
         (param as Users).fullName !== undefined;
}

export const ProfileImage : React.FC<{users : string[] | Users[] , max ?: number , border_color : string , onClick ?: ()=>void}> = ({users , max = 5 , onClick = ()=>{}} ) =>  { //users : just id of users 
    const total_circle_to_show = Math.min(max , users.length) // 0.875rem
    const hidden_image = Math.max(users.length - total_circle_to_show ,0)
    const usersList = useSelector((state : RootState)=>{return state.usersList})
    return (
        <div className='flex relative items-center select-none h-[1.5rem]' style={{width:total_circle_to_show+0.6+"rem"}}> 
            {users.length > 1 && 
                users.map((value, index) => { 
                    const value_ = isUser(value) ? (value?.ID as string) : value
                    if (index < total_circle_to_show ){
                    return (
                        
                        <div key={index} // Always add a key!
                            className="absolute  delay-200 z-1 hover:z-2 transition-all size-[1.5rem]"
                            style={{
                                // zIndex: index,
                                left: `${index * 14}px`
                            }}
                        >
                            <MiniPicture url={ usersList.get(value_) !== undefined ? usersList.get(value_)?.url as string : "https://avatars.githubusercontent.com/u/810438?s=64&v=4" } rounded='full' shouldLoad={true } classname='w-full h-full outline outline-1 outline-white' />
                        </div>
                );}
            })
            }
            {hidden_image !== 0 && users.length !== 1 && 

                <div className='rounded-full size-[1.5rem] absolute text-xs bg-neutral-800 text-white text-center flex justify-center items-center cursor-pointer outline outline-1 outline-white'
                        style={{
                                left: `${total_circle_to_show * 14}px`
                            }}
                            onClick={onClick}>
                    +{hidden_image}
                    </div>
            }
            {
                users.length ===1 &&
                <div className='line-clamp-1 flex gap-[0.25rem]' dir={'rtl'}>
                    <div 
                            key={isUser(users[0]) ? (users[0]?.ID as string )+`:${-1}`: users[0] as string} // Always add a key!
                            className="   z-[100] transition-all size-[1.5rem]"
                        >
                            <MiniPicture url={ usersList.get( isUser(users[0]) ? (users[0]?.ID as string ): users[0] ) !== undefined ? usersList.get(isUser(users[0]) ? (users[0]?.ID as string ): users[0])?.url as string : "https://avatars.githubusercontent.com/u/810438?s=64&v=4" } rounded='full' shouldLoad={true } classname='w-full h-full outline outline-1 outline-white' />
                        </div>
                    {usersList.get( isUser(users[0]) ? (users[0]?.ID as string ): users[0] ) !== undefined ? usersList.get( isUser(users[0]) ? (users[0]?.ID as string ): users[0] )?.fullName : "..."}
                </div>
            }

        </div>
    )
}
export const ProfileImageWithMemo = React.memo(ProfileImage)

