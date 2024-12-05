import React from 'react';

type Props = {
  text: string;
};

const TitleMainLeft: React.FC<Props> = ({ text }) => {
  return (
    <div className="border-b">
      <div className="by py-[7.5px] uppercase text-[1.25em] font-bold inline-block">
        {text}
      </div>
    </div>
  );
};

export default TitleMainLeft;
