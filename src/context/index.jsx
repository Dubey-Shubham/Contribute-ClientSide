import React, { useContext, createContext } from 'react'
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';      // these are all utility func coming from thirdweb
import { ethers } from 'ethers';

const StateContext = createContext();        //created context

export const StateContextProvider = ({ children }) => {             // props k andar children hai iske so we can get those children
    // here we are connecting to smartcontract    
    const { contract } = useContract('0x8c2649DA85739F2A922C8AA4481287f23D92A0aF');
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign')    // here we are calling write functions from smart contracts(calling createcampaign function from contract and pasing all parameter to it)

    const address = useAddress();      //calling wallet address
    const connect = useMetamask();     //connectto metamask wallet

    // taking data from form and publishing campaign on ethereum blockchain
    const publishCampaign = async (form) => {
        try {
            const data = await createCampaign({args:[           //create campaign component se form state jo banai thi uske arguments le liye aur smart contract wale function ko call krke usme form ka data de diya
                address,  //owner                         //every data will be sent in same chronology as createcampaign function in smartcontract takes 
                form.title,  //title
                form.description,
                form.target,
                new Date(form.deadline).getTime(),      //deadline date k liye  
                form.image

            ]})
            console.log("contract call success", data)
        } catch (error) {
            console.log("contract call failure", error)
        }
    }

    // fetching campaign details from smartcontract
    const getCampaigns= async ()=>{
        const campaigns = await contract.call('getCampaigns')    //we made a call to our getCamp function of smart contract to fetch data
        
        const parsedCampaings = campaigns.map((campaign, i) => ({            //taking a campaign and its id and taking out detail from it
            owner: campaign.owner,                        //jo campaign input liya is function me uska owner yhan dal denge
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),   //ether se string me convert kardi value
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: i                        // project id will be index of he campaign
          }));
          
           return parsedCampaings;
    }
    // fetching campaign details from smartcontract corresponding to a particular address (particular person)
    const getUserCampaigns = async () =>{
        const allCampaigns = await getCampaigns();                // contract se function call kiya

        const filteredCampaigns = allCampaigns.filter((campaign)=>
        campaign.owner === address                               //campaign jiska owner address cureent logged in user k adress k equal ho wo 
        )
        return filteredCampaigns
    }

    // tap into creating and getting user donation
    const donate = async (pId, amount) => {
        const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount)});
    
        return data;
      }

    // to get list of all donations and donators
    const getDonations = async (pId) => {
        const donations = await contract.call('getDonators', [pId]);
        const numberOfDonations = donations[0].length;
    
        const parsedDonations = [];
    
        for(let i = 0; i < numberOfDonations; i++) {
          parsedDonations.push({
            donator: donations[0][i],
            donation: ethers.utils.formatEther(donations[1][i].toString())
          })
        }
    
        return parsedDonations;
      }

    // sharing all thee functions with entire app
    return ( <StateContext.Provider value={{ address, contract, connect, createCampaign: publishCampaign, getCampaigns, getUserCampaigns, donate, getDonations}}>    {/*we are just naming publishCampaign to createCampaign*/}
    {children}
    </StateContext.Provider>)
};

export const useStateContext = () => useContext(StateContext);     //state context ko useStateContext function daal k export kar diya

//we can wrap entire application in StateContextProvider but still render all of the children that are inside of it
//  here we will keep all our web3 logic then we will wrap this application with that context so that every single page and component can use it without any problem.