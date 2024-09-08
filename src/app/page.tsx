"use client";
import Image from "next/image";
import Searchbox from "./components/Searchbox";
import Selectbox from "./components/Selectbox";
import React, { useEffect, useState } from 'react';
import { useAtom } from "jotai";
import {  optionvalname, Selectvalname, Thechngeatom } from "./utils/atom";
import OptionName from "./components/OptionName";
import SelectName from "./components/SelectName";

interface Country {
  name: string;
  population: number;
  region: string;
  capital: string;
  flags: {
    png: string;
  };
}

// Function to shuffle an array
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [darkmode] = useAtom(Thechngeatom);
  const [optionName] = useAtom(optionvalname);
  const [selectval] = useAtom(Selectvalname)
  const [sliceval, setSliceval] = useState(8);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setCountries(shuffleArray(data))) // Shuffle the data
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Re-run effect when optionName changes
  

  const limitedData = countries.slice(0, sliceval);

  const handleButton = () => {
    setSliceval(prevSliceval => prevSliceval + 8);
  }
  const finalfunction = (value:any) => {
    
    window.location.href = `/${value}`;

  
  }
  
  
  return (
    <main className={`${darkmode ? "bg-dark-mode" : "bg-light-mode"} relative transition duration-500`}>
      <div className="w-full max-w-7xl mx-auto p-5 h-full">
        <div className="flex justify-between items-center mt-10 max-md:flex-col ">
          <Searchbox />
          <Selectbox />
        </div>
        <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-14 my-10">
          {optionName.length !== 0 && optionName ?  <OptionName /> : selectval && selectval.length > 0 ? <SelectName />  : limitedData.map((e: Country) => (
            <div onClick={() => finalfunction(e.name)} key={e.name} className={`flex flex-col bg-white ${darkmode && "light-dark"}`}>
              <Image priority className="object-contain w-full" src={e.flags.png} alt="Flag" width={300} height={150} />
              <div className={`flex flex-col gap-2 mx-3 my-5 ml-7 ${darkmode && "text-white"}`}>
                <h4 className="font-extrabold text-xl my-4">{e.name}</h4>
                <p><span className="font-bold">Population:</span> {e.population.toLocaleString()}</p>
                <p><span className="font-bold">Region:</span> {e.region}</p>
                <p><span className="font-bold">Capital:</span> {e.capital}</p>
              </div>
            </div>
          ))}
        </div>
        {optionName.length !== 0 && optionName || selectval.length !== 0 && selectval ? <></> : <button onClick={handleButton} className={`${darkmode && "bg-light-mode text-black"} mx-auto flex justify-center items-center text-center bg-dark-mode p-5 text-white`}>Show More</button>}
        

        
      </div>
    </main>
  );
}
