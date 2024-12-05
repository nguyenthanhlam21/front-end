import React from 'react'
import { Link } from 'react-router-dom'


const boxMenuNews = ({title,style,id}) => {
  return (
    <>
        <Link to={`/newSale/${id}?label=Chi%20tiết`} className={`${style}`}>{title}</Link>
    </>
  )
}

export default boxMenuNews