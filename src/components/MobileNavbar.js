import React from 'react';
import { NavLink } from 'react-router-dom';


function NavBar() {
    return (
        <div className=''>
            <div className='w-full h-20 bg-gray-200 shadow-inv flex justify-evenly items-center fixed bottom-0 z-20'>
                <NavLink to="" className={(navData) => navData.isActive ? "invert before:content-[''] before:inline-block before:absolute before:w-16 before:h-16 before:z-[-1] before:bg-gray-200 before:transform before:translate-x-navbarActiveLg before:translate-y-navbarActiveLg before:rounded-xl" : ""}>
                    <img className="h-14" alt="PGC logo" src="https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/logo512.png" />
                </NavLink>
                <span className='h-4/6 border-1 border-gray-400' />
                <NavLink to="/schedule" className={(navData) => navData.isActive ? "invert before:content-[''] before:inline-block before:absolute before:w-16 before:h-16 before:z-[-1] before:bg-gray-200 before:transform before:translate-x-navbarActive before:translate-y-navbarActive before:rounded-xl" : ""}>
                    <img className="h-12" alt="Leaderboard logo" src="https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/ScheduleIcon.png" />
                </NavLink>
                <span className='h-4/6 border-1 border-gray-400' />
                <NavLink to="/standings" className={(navData) => navData.isActive ? "invert before:content-[''] before:inline-block before:absolute before:w-16 before:h-16 before:z-[-1] before:bg-gray-200 before:transform before:translate-x-navbarActive before:translate-y-navbarActive before:rounded-xl" : ""}>
                    <img className="h-12" alt="Standings logo" src="https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/StandingsIcon.png" />
                </NavLink>
                <span className='h-4/6 border-1 border-gray-400' />
                <NavLink to="/lockerroom" className={(navData) => navData.isActive ? "invert before:content-[''] before:inline-block before:absolute before:w-16 before:h-16 before:z-[-1] before:bg-gray-200 before:transform before:translate-x-navbarActive before:translate-y-navbarActive before:rounded-xl" : ""}>
                    <img className="h-12" alt="Golfer Stats logo" src="https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/LockerRoomIcon.png" />
                </NavLink>
                <span className='h-4/6 border-1 border-gray-400' />
                <NavLink to="/leagueoffice" className={(navData) => navData.isActive ? "invert before:content-[''] before:inline-block before:absolute before:w-16 before:h-16 before:z-[-1] before:bg-gray-200 before:transform before:translate-x-navbarActive before:translate-y-navbarActive before:rounded-xl" : ""}>
                    <img className="h-12" alt="Rulebook logo" src="https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/LeagueOfficeIcon.png" />
                </NavLink>
            </div>
        </div>
    )
}

export default NavBar;