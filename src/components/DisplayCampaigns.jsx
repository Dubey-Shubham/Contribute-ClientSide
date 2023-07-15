import React from 'react'
import { useNavigate } from 'react-router-dom'
import { loader } from '../assets'
import  FundCard from './FundCard'

const DisplayCampaigns = ({title , isLoading, campaigns}) => {
const navigate = useNavigate();

const handleNavigate = (campaign) => {            //created this func to increase code readability
  navigate(`/campaign-details/${campaign.title}`, { state: campaign })              // jis card pe click kiya us par navigate kara do, jis campaign par click kiya uski state new page jo route hua hai usme pass kardo
    // new react router allows us to pass state directly through routing
}

  return (
    <div>
        <h1 className='font-epilogue font-semibold text-[18px] text-white text-left'>{title} ({campaigns.length})</h1> 
        <div className="flex flex-wrap mt-[20px] gap-[26px]">
          {isLoading && (<img src={loader} alt="loader" className='w-[100px] h-[100px] object-contain' />)}     {/*if its loading then show image of loader*/}

          {!isLoading && campaigns.length === 0 && (                          // if no loading and there is no campaign then just show that text
            <p className='"font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]' >you have not created any campaigns yet</p>
          )}

          {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard    //if no loading and there are campaign then take campaign and map it into the fundcard component
          key={campaign.id}                                       // key is campaign id
          {...campaign}                                           // spread the entire campaign
          handleClick={() => handleNavigate(campaign)}            //agar click kiya to call this func and pass that campaign
        />)}
        </div>   
    </div>
  )
}

export default DisplayCampaigns

// this component will display all the campaigns in form of cards