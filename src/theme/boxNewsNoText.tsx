import { Link } from 'react-router-dom';

const BoxNewsNoText = ({ style, link, setting }) => {
  return (
    <Link to={link} className={`${setting} atbf w-full p-4`} style={style}>
      <div className="w-full h-full relative">
        <div className="left-border"></div>
        <div className="right-border"></div>
      </div>
    </Link>
  );
};

export default BoxNewsNoText;
