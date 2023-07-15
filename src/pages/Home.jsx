import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context'
import {DisplayCampaigns} from '../components'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])     //initially it is empty array bcoz we have to fetch them(campaigns) from smart contracts
  const { address, contract, getCampaigns } = useStateContext();
  
  const fetchCampaigns = async () => {
    setIsLoading(true)
    const data = await getCampaigns();               //bcoz getcampaign in index.js is async so cannot use it directly in useeffect 
    setCampaigns(data)                               // campaign se jo data aya tha use yahan state me set kar dia
    setIsLoading(false)
  }

  useEffect(() => {
    if (contract) fetchCampaigns();                   //if there is contract then fetch the campaign details 
  }, [address, contract]);                            //use effect id dependent on address and contract if they get update then render will take place

  return (
    <DisplayCampaigns
    title="All Campaigns"                            
    isLoading={isLoading}                             // ye state as a prop pass kardi display campaign me
    campaigns={campaigns}                             // campaign ki state yahan se as prop pass kardi display campaign component me
    />
  )
}

export default Home