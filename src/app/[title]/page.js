"use client"
import React, { useEffect, useState } from 'react'
import Searchbox from '../components/Searchbox'
import Selectbox from '../components/Selectbox'
import { FinalAtom, optionvalname, Thechngeatom } from '../utils/atom'
import { useAtom } from 'jotai'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { getName } from 'country-list';
import Link from 'next/link'

const Page = () => {
  const [darkmode] = useAtom(Thechngeatom);
  const [country, setCountry] = useState(null);
  let Pathname = usePathname();

  let final = Pathname.substring(1);
  let relleyfinal = final.replace(/%20/g, " ");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/data.json');
        const data = await res.json();
        const country = data.find((e) => e.name === relleyfinal);
        if (country) {
          setCountry(country);
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
  
    fetchData();
  }, [relleyfinal]);


  return (
    <div className={`${darkmode ? "bg-dark-mode border-black" : "bg-light-mode"} relative height-detialsPage max-lg:h-full transition duration-500 border-t `}>
      <div className="w-full max-w-7xl mx-auto p-5 h-full">
        <Link href={"/"} 
        >
        <button className={`${darkmode && "text-white font-light light-dark hover:bg-white hover:text-black"} p-2 hover:bg-gray-500 transition duration-150 ease-in shadow-md mt-10 w-32 flex justify-center items-center gap-3`}>
          <FontAwesomeIcon icon={faArrowLeftLong} className='w-4' />
          Back
        </button>
        </Link>
        {country ? (
          <div className='flex  max-lg:flex-col max-lg:items-start items-center mt-14'>
            {country.flags && <img  src={country.flags.png} alt={`${country.name} flag`} className='w-[500px] h-[350px] mr-24 max-sm:object-contain' />}
            <div className='flex flex-col '>
              <h4 className={`font-extrabold text-3xl max-lg:mt-5 ${darkmode && "text-white"}`}>{country.name}</h4>
              <div className='flex max-lg:flex-col max-lg:gap-7 gap-48 max-lg:mt-5 mt-10'>
                <div className='flex-col'>
                <p className={`${darkmode && "text-gray-400 font-bold"} py-1`}><span className={`${darkmode && "text-white"} font-bold`}>Native Name: </span>{country.nativeName}</p>
                <p className={`${darkmode && "text-gray-400 font-bold"} py-1`}><span className={`${darkmode && "text-white"} font-bold`}>Population: </span>{country.population.toLocaleString()}</p>
                <p className={`${darkmode && "text-gray-400 font-bold"} py-1`}><span className={`${darkmode && "text-white"} font-bold`}>Region: </span>{country.region}</p>
                <p className={`${darkmode && "text-gray-400 font-bold"} py-1`}><span className={`${darkmode && "text-white"} font-bold`}>Sub Region: </span>{country.subregion}</p>
                <p className={`${darkmode && "text-gray-400 font-bold"}`}><span className={`${darkmode && "text-white"} font-bold`}>Capital: </span>{country.capital}</p>
                </div>
                <div className='flex-col'>
                <p className={`${darkmode && "text-gray-400 font-bold"} py-1`}><span className={`${darkmode && "text-white"} font-bold`}>Top Level Domain: </span>{country.topLevelDomain}</p>
                <p className={`${darkmode && "text-gray-400 font-bold"} py-1`}><span className={`${darkmode && "text-white"} font-bold`}>Currencies: </span>{country.currencies ? country.currencies[0].code : "None"}</p>
                <p className={`${darkmode && "text-gray-400 font-bold"} `}><span className={`${darkmode && "text-white"} font-bold`}>Languages: </span>{country.languages[0].name}</p>
                </div>
              </div>
            <div className='flex mt-10 gap-2 items-cente max-sm:flex-col flex-wrap'>
          <p className={`${darkmode && "text-white font-normal"} font-extrabold mr-1`}>Border Countries: </p>
          <div className='grid grid-rows-1 grid-cols-3 gap-2'>

          {country.borders ? country.borders.map((e) => (
            <span key={e} className={` ${darkmode && "text-gray-300 light-dark border-none"} border border-gray-300 text-sm py-1 max-sm:px-1 max-sm:w-[100px] px-4`}>{getName(e.slice(0, -1))}</span>
          )) : <p>None</p>}
          </div>
        </div>
            </div>
          </div>
        ) : (
          <div role="status">
  <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
  </svg>
  <span className="sr-only">Loading...</span>
</div>

        )}
        
      </div>
    </div>
  );
}

export default Page;
