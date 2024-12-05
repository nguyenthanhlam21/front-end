import React from 'react'
import Contact from '../../components/user/contact'
import Brand from '../../components/user/brand'

type Props = {}

const contact = (props: Props) => {
  return (
    <>
    <Contact/>
    <div className="mt-14"><Brand/></div>
    </>
  )
}

export default contact