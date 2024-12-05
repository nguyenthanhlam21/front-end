import logoWhite from '../../public/logoWhite.png'

const logo = ({size}) => {
  return (
    <img src={logoWhite} className={`${size}`} alt="Logo" />
  )
}

export default logo