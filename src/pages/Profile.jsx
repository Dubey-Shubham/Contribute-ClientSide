import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context'
import {DisplayCampaigns} from '../components'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])     //initially it is empty array bcoz we have to fetch them(campaigns) from smart contracts
  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true)
    const data = await getUserCampaigns();               //bcoz getcampaign in index.js is async so cannot use it directly in useeffect 
    setCampaigns(data)
    setIsLoading(false)
  }

  useEffect(() => {
    if (contract) fetchCampaigns();                   //if there is contract then fetch the campaig details
  }, [address, contract]);

  return (
    <DisplayCampaigns
    title="All Campaigns"
    isLoading={isLoading}
    campaigns={campaigns}
    />
  )
}

export default Profile