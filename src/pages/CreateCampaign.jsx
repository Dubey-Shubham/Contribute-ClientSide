import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers';         //utility library which will allow us to interact with our smartcontract  

import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components'
import { checkIfImage } from '../utils';       // takes a image and callback
import { useStateContext } from '../context';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();    //createcampaign func ko use kiya from usestate context
  const [form, setForm] = useState({            // is state me form hoga initially jisme campaign banane ki detail dali jayegi 
    name: '',
    title: '',
    description: '',          // all have empty string
    target: '',
    deadline: '',
    image: '',
  })

  const handleFormFieldChange = (fieldName, e) => {      //fieldname aur e ki jagah ham kuch bhi likh sakte the like a,b they are just takinh input
    setForm({ ...form, [fieldName]: e.target.value })    //function call hone par state change hogi aur form phirse spread ho jayega aur uske sath sath fieldname ko jo bhi as a input milega (title,description ) usme user se info enter karwa di jayegi
  }

  const handleSubmit = async (e) => {                 // its async as   
    e.preventDefault();    //to prevent reload
    checkIfImage(form.image, async (exists) => {     //url lega aur agar valid hua to exist true hoga
      if(exists) {                                   //if it exist (exist url hai)
        setIsLoading(true)                           //pehle loading hoga
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})          // props, we spread entire form, changed the target from numbers to wei(smallest denomination of eth) 18decimals 
        setIsLoading(false);                         //phir loading band
        navigate('/');                //back to home
      } else {
        alert('Provide valid image URL')  //agar url valid nahi hua 
        setForm({ ...form, image: '' });    // image string ko empty kar dia
      }
    })
    
  }
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader/>}      {/*loader abhi bana nhi par bana lenge isko bhi*/}
      {/* INITIAL HEADING */}
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
      </div>
      {/* ENTIRE FORM */}
      <form className='w-full mt-[65px] flex flex-col gap-[30px]' onSubmit={handleSubmit}>
        {/* ye do input side by side wale hai isi liye same div me */}
        <div className='flex flex-wrap gap-[40px]'>

          <FormField                                        // this is a component that we created
            labeLName="Your Name *"   //astrek for important denotation
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}    //ispar click krte hi function call ho jayega aur name and event as a input de dega us function ko
          />
          <FormField
            labeLName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}    // similarly yahan bhi func call ho jayega aur input title hoga
          />
        </div>

        <FormField
          labeLName="Your Description *"   //astrek for important denotation
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />     
        {/* IMAGE JO CAMPAIGN ME DALEGI */}
        <div className='w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]'>
          <img src={money} alt="money" className='w-[40px] h-[40px] object-contain' />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 100% of the raised amount</h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"                              //date enter ki jayegi
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>
        {/* this is for image of campaign */}
        <FormField
          labelName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
        />

        {/* this is button */}
        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  )
}

export default CreateCampaign