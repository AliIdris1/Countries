"use client"
import React from 'react'
import { optionvalname, Thechngeatom } from '../utils/atom';
import { useAtom } from 'jotai';


const OptionName = () => {
    const [optionName] = useAtom(optionvalname);
    const [darkmode] = useAtom(Thechngeatom);
    const finalfunction = (value) => {
    
      window.location.href = `/${value}`;
  
    
    }
  return (
    <div key={optionName.name} onClick={() => finalfunction(optionName.name)} className={`flex flex-col bg-white ${darkmode && "light-dark"}`}>
        <img priority className="object-contain" src={optionName.flags.png} alt="Flag" width={300} height={150} />
        <div className={`flex flex-col gap-2 mx-3 my-5 ml-7 ${darkmode && "text-white"}`}>
                <h4 className="font-extrabold text-xl my-4">{optionName.name}</h4>
                <p><span className="font-bold">Population:</span> {optionName.population}</p>
                <p><span className="font-bold">Region:</span> {optionName.region}</p>
                <p><span className="font-bold">Capital:</span> {optionName.capital}</p>
            </div>
            </div>
  )
}

export default OptionName