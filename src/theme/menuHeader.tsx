
const menuHeader = ({menu,menuCT,size,font,style}) => {
  return (
    <div className={`${style} ${size} ${font}`}>{menu}</div>
  )
}

export default menuHeader