import { useEffect, useState, type FC, useRef } from 'react'
import Category from '../../assets/icons/Iconex/Light/Category.svg?react'
import { NavLink, useLocation } from 'react-router-dom'
import Folder from '../../assets/icons/Iconex/Light/Folder.svg?react'
import Case from '../../assets/icons/Iconex/Light/Case.svg?react'
import Users from '../../assets/icons/Iconex/Light/Users.svg?react'
import Statistic from '../../assets/icons/Iconex/Light/Chart 1.svg?react'
const FilledCategory = <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
    <rect x="0.799927" y="1" width="7" height="7" rx="2.5" fill="#9429C5" stroke="#9429C5" stroke-width="1.5" />
    <rect x="0.799927" y="11" width="7" height="7" rx="2.5" fill="#9429C5" stroke="#9429C5" stroke-width="1.5" />
    <rect x="10.7999" y="1" width="7" height="7" rx="2.5" fill="#9429C5" stroke="#9429C5" stroke-width="1.5" />
    <rect x="10.7999" y="11" width="7" height="7" rx="2.5" fill="#9429C5" stroke="#9429C5" stroke-width="1.5" />
</svg>
const primary_1000 = '#9429C5'
const neutral_800 = '#39475B'
const FootBar: FC = () => {
    const navLinksRef = useRef<Array<HTMLAnchorElement | null>>([])
    const location = useLocation()
    const [width, setWidth] = useState(window.innerWidth)

    const doJob = () => {
        const activeIndex = navLinksRef.current.findIndex(link =>
            link?.classList.contains('active')
        )

        if (activeIndex !== -1 && navLinksRef.current[activeIndex]) {
            const activeElement = navLinksRef.current[activeIndex]
            return { position: activeElement?.offsetLeft || 0, show: true }
        } else {
            return { position: navLinksRef.current[2]?.offsetLeft || 0, show: false }
        }
    }

    const [activePosition, setActivePosition] = useState(doJob())

    // Recalculate position when route changes OR window resizes
    useEffect(() => {
        setActivePosition(doJob())
    }, [location.pathname, width]) // Add width as dependency

    // Initialize ref array
    useEffect(() => {
        navLinksRef.current = navLinksRef.current.slice(0, 5)
    }, [])

    // Simple resize handler - just update width, the effect above will handle recalculation
    const onResize = () => {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    return (
        <footer className='bg-white border border-neutral-100 w-full z-[15] px-[8px] py-[12px] flex gap-[0.5rem] fixed inset-x-0 bottom-0 justify-between items-center box-shadow' dir='rtl'>
            <div
                className="absolute z-[1] bg-primary-100 flex justify-center items-end py-[0.5rem]  w-[4.78rem] max-h-[4.5rem] h-full my-auto rounded-2xl transition-all  ease-in-out"
                style={{ left: activePosition.position, opacity: activePosition.show ? '100' : '0' }}
            >

                <div className="size-[0.25rem] rounded-full bg-primary-600"></div>
            </div>

            <NavLink
                to={'/panel/panel'}
                className={({ isActive }) =>
                    `w-[4.78rem] gap-[4px] pt-[8px] pb-[16px] z-[3] flex justify-center clamp-line-1 flex-col items-center transition-all  ${isActive ? 'active' : ''}`
                }
                ref={el => navLinksRef.current[0] = el}
            >
                {({ isActive }) => (
                    <>
                        <Category className={`transition duration-[200ms] size-[24px] fill-primary_1000" ${isActive ? "fill-primary-1000" : "fill-neutral-800"}`} />
                        <span className={`text-neutral-800 text-xs transition-all ${isActive ? 'text-primary-1000' : 'text-neutral-800'}`}>پیشخوان</span>
                    </>
                )}
            </NavLink>

            <NavLink
                to={'/panel/workspaces'}
                className={({ isActive }) =>
                    `w-[4.78rem] gap-[4px] pt-[8px] pb-[16px] z-[3] flex justify-center clamp-line-1 flex-col items-center transition-all  ${isActive ? 'active' : ''}`
                }
                ref={el => navLinksRef.current[1] = el}
            >
                {({ isActive }) => (
                    <>
                        <Case className={`transition duration-[200ms] size-[24px] fill-primary_1000" ${isActive ? "fill-primary-1000" : "fill-neutral-800"}`} />
                        <span className={`text-neutral-800 text-xs transition-all ${isActive ? 'text-primary-1000' : 'text-neutral-800'}`}>فضای کاری</span>
                    </>
                )}
            </NavLink>

            <NavLink
                to={'/panel/projects'}
                className={({ isActive }) =>
                    `w-[4.78rem] gap-[4px] pt-[8px] pb-[16px] z-[3] flex justify-center clamp-line-1 flex-col items-center transition-all  ${isActive ? 'active' : ''}`
                }
                ref={el => navLinksRef.current[2] = el}
            >
                {({ isActive }) => (
                    <>
                        <Category className={`transition duration-[200ms] size-[24px] fill-primary_1000" ${isActive ? "fill-primary-1000" : "fill-neutral-800"}`} />
                        <span className={`text-neutral-800 text-xs transition-all ${isActive ? 'text-primary-1000' : 'text-neutral-800'}`}>پروژه ها</span>
                    </>
                )}
            </NavLink>

            <NavLink
                to={'/panel/users/list'}
                className={({ isActive }) =>
                    `w-[4.78rem] gap-[4px] pt-[8px] pb-[16px] z-[3] flex justify-center clamp-line-1 flex-col items-center transition-all  ${isActive ? 'active' : ''}`
                }
                ref={el => navLinksRef.current[3] = el}
            >
                {({ isActive }) => (
                    <>
                        <Users className={`transition duration-[200ms] size-[24px] fill-primary_1000" ${isActive ? "fill-primary-1000" : "fill-neutral-800"}`} />
                        <span className={`text-neutral-800 text-xs transition-all ${isActive ? 'text-primary-1000' : 'text-neutral-800'}`}>کاربران</span>
                    </>
                )}
            </NavLink>

            <NavLink
                to={'/panel/dashboard'}
                className={({ isActive }) =>
                    `w-[4.78rem] gap-[4px] pt-[8px] pb-[16px] z-[3] flex justify-center clamp-line-1 flex-col items-center transition-all  ${isActive ? 'active' : ''}`
                }
                ref={el => navLinksRef.current[4] = el}
            >
                {({ isActive }) => (
                    <>
                        <Statistic className={`transition duration-[200ms] size-[24px] fill-primary_1000" ${isActive ? "fill-primary-1000" : "fill-neutral-800"}`} />
                        <span className={`text-neutral-800 text-xs transition-all ${isActive ? 'text-primary-1000' : 'text-neutral-800'}`}>پیشخوان</span>
                    </>
                )}
            </NavLink>
            {/*  */}




        </footer>
    )
}

export default FootBar