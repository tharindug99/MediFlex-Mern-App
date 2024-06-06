import React from 'react'

const Error = ({errmessage}) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
        <h3 className="text-black text-[20px] font-semibold">
            {errmessage}
        </h3>
    </div>
  )
}

export default Error