import React from 'react'

type Props = {}

const titleMainCenter = ({text,sub}) => {
  return (
    <div className="text-center ">
        <span className='py-[7.5px] text-[2.15em] font-bold '>{text}</span>
        <p className="text-sm text-[rgb(102, 102, 102)]">{sub}</p>
    </div>
  )
}

export default titleMainCenter