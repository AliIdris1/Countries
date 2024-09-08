"use client"
import React from 'react'
import {  Selectvalname, Thechngeatom } from '../utils/atom';
import { useAtom } from 'jotai';


const SelectName = () => {
    const [selectval] = useAtom(Selectvalname)
    const [darkmode] = useAtom(Thechngeatom);
    const finalfunction = (value) => {
    
        window.location.href = `/${value}`;
    
}
return (
    <>
    {selectval.map((e) => (
        <div key={e.name} onClick={() => finalfunction(e.name)} className={`flex flex-col bg-white ${darkmode && "light-dark"}`}>
        <img priority className="object-contain" src={e.flags.png} alt="Flag" width={300} height={150} />
        <div className={`flex flex-col gap-2 mx-3 my-5 ml-7 ${darkmode && "text-white"}`}>
                <h4 className="font-extrabold text-xl my-4">{e.name}</h4>
                <p><span className="font-bold">Population:</span> {e.population}</p>
                <p><span className="font-bold">Region:</span> {e.region}</p>
                <p><span className="font-bold">Capital:</span> {e.capital}</p>
            </div>
            </div>
    ))}
    </>
   
  )
}

export default SelectName