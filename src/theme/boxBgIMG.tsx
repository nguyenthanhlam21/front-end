import React from 'react';

const BoxBgIMG = ({ fullIMG }) => {
  return (
    <div
      className="border w-[500px]  border-300 p-2 pb-5 text-center  bg-cover bg-center " 
      style={{ backgroundImage: `url('${fullIMG}')` }} 
    ></div>
  );
};

export default BoxBgIMG;
