import React from 'react'

const FormField = ({ labeLName, placeholder, inputType, isTextArea, value, handleChange }) => {  //props
    return (
        <label className='flex-1 w-full flex flex-col' >
            {labeLName && (              // will check that only if there is labelname then we will show span element (label name bole to heading)
                <span className='font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]'>{labeLName}</span>
            )}
            {isTextArea ? (                 //agar text area hai to text area dikhega warna input area dikhega
                <textarea
                    required
                    value={value}
                    onChange={handleChange}
                    rows={10}                      //10 row bada textarea ban jayega
                    placeholder={placeholder}
                    className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
                />)        //
                : (<input
                    required                    //in order to tell that the field must be filled
                    value={value}
                    onChange={handleChange}
                    type={inputType}
                    step="0.1"              // this will change number of ethereum donation
                    placeholder={placeholder}
                    className='py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]'
                />)}
        </label>
    )
}

export default FormField