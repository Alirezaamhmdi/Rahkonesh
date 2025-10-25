import { NavLink} from 'react-router-dom'
import React, { useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie' ;

function WorkSpaceLink({ID , name  } : {ID : string , name : string }) {
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`https://teamyer-backend.liara.run/user/wokspaceRole/${ID}` , { headers : {
    //                 'Authorization' : `Bearer ${Cookies.get(import.meta.env.VITE_COOKIE_AUTH_TOKEN_PATH)}`
    //             }});
    //             console.log('Workspace data:', response.data);
    //         } catch (error) {
    //             console.error('Error fetching workspace data:', error);
    //         }
    //     };
    //     fetchData();

    // }, [ID]);
    return (
        <NavLink key={ID} to={`${ID}`} className={({ isActive , isPending }) => (isActive ?  ' h-[2.5rem] flex items-center justify-center bg-primary-100  snap-start transition-all duration-[300ms] min-w-max px-[0.5rem] whitespace-nowrap rounded-full text-primary-1000 line-clamp-1 cursor-pointer text-center' : isPending ? 'loader-primary-1000' : 'text-center px-2 flex items-center justify-center whitespace-nowrap text-primary-700 transition-all duration-[300ms] min-w-max rounded-full line-clamp-1 snap-start cursor-pointer')}>
            <span className='font-medium w-full h-[1.25rem] flex items-center justify-center min-w-[2.5rem] '>{name}</span>
        </NavLink>
    )
}

export default React.memo(WorkSpaceLink) ; 

