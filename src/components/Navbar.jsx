import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


import  {CustomButton}  from './';
import { logo, menu, search, thirdweb } from '../assets';
import { navlinks } from '../constants';
import { useStateContext } from '../context';

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard')
  const [toggleDrawer, setToggleDrawer] = useState(false);       //initially toggle false hai
  const {connect, address} = useStateContext();      //usestatecontext se address aur connect import kar dia
  
  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      {/*this is a search imput and image which together create that search bar*/}
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input type="text" placeholder="Search for campaigns" className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none" />

        <div className="w-[72px] h-full rounded-[20px] bg-[#1dc071] flex justify-center items-center cursor-pointer">
          <img src={search} alt="search" className="w-[15px] h-[15px] object-contain" />
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={address ? 'Create a campaign' : 'Connect'}            //agar wallet se already connected hai to create a campaign ayega nahi to connect button
          styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}      //color bhi konsa button hai us base par dikhega
          handleClick={() => {
            if (address) navigate('create-campaign')          //agar address hai to create-campaign page par navigate kardo otherwise connect karo
            else connect()
          }}
        />

        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />    {/*ye logo hai*/}
          </div>
        </Link>
      </div>

      {/* small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />      {/*yahan bas logo render kara rhe hain left corner me*/}
        </div>

        <img
          src={menu}                         // ye image hai hamburger menu ki
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}        //image parclick hone par, set previous state to, not previous state, matlab agar pehle false tha to true kar do nahi to false (next to next bhi likh skte the)
        />

        <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>        {/*agar toggledrawer true hai yo 100vh me dikhao li ko nahi to mat dikhao*/}
          <ul className="mb-4">
            {navlinks.map((link) => (                   //navlinks ko small screen me sidebar ki jagah hamburger menu me render karaya one by one
              <li
                key={link.name}
                className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'}`}
                onClick={() => {
                  setIsActive(link.name);          // click krne par particular state par render kar dega
                  setToggleDrawer(false);          //toggle drawer band ho jayega
                  navigate(link.link);             // doosre link par navigate kar diya
                }}
              >
                <img
                  src={link.imgUrl}                //image har ek icon ki render ho jayegi
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}      //icon para active hone par grey rahega atherwise nahin rahega
                />
                <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>              {/*agar icon para active hai to wo green dikhega nahi to grey*/}
                  {link.name}                     {/*har icon k samne uska name bhi a jayega ho jayega*/}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            <CustomButton                   // button is exactly like the large screen buttton same
              btnType="button"
              title={address ? 'Create a campaign' : 'Connect'}                //upar k button k ek dum same
              styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
              handleClick={() => {
                if (address) navigate('create-campaign')
                else connect();
              }}
            />
          </div>
        </div>
      </div>
    </div>

  )
}

export default Navbar

// sm is small devices lg is large devices, md is medium devices

// why curly braces for some import not for other