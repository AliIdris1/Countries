"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { optionvalname, Thechngeatom } from '../utils/atom';
import { useAtom } from 'jotai';

type Props = {};

type Country = {
    name: string;
};

const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
};

const Searchbox = (props: Props) => {
    const [darkmode] = useAtom(Thechngeatom);
    const [inputvalue, setinputvalue] = useState("");
    const [optionValue, setoptionValue] = useState("");
    const [Names, setNames] = useState<Country[]>([]);
    const [,setoptionName] = useAtom(optionvalname);

    useEffect(() => {
        if (optionValue) {
            fetchOptionName(optionValue);
        }
    }, [optionValue]);

    const fetchnames = (value: string) => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => {
                const result = data.filter((country: Country) => {
                    return value && country && country.name && country.name.toLowerCase().includes(value.toLowerCase());
                });
                setNames(result);
            })
            .catch(error => console.error('Error fetching countries:', error));
    };

    const fetchOptionName = (value: string) => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => {
                const country = data.find((e: Country) => e.name === value);
                if (country) {
                    
                    setoptionName(country);
                }
                
            })
            .catch(error => console.error('Error fetching countries:', error));
    };

    const handleChange = (value: string) => {
        setinputvalue(value);
        fetchnames(value);
    };

    const handleOption = (value: string) => {
        setoptionValue(value);
        setNames([])
    };

    window.onclick = () => {
        setNames([])
    }

    const limitedDatabox = Names.slice(0, 10);

    return (
        <form className={`relative transition-all max-md:mb-10 max-sm:w-full `} onSubmit={submitHandler}>
            <input
                className={`outline-none transition-all rounded-lg shadow-sm py-4 w-[110%] max-sm:w-full pl-16 max-sm:pr-0 pr-44 ${darkmode && "light-dark placeholder:text-white"}`}
                type="text"
                placeholder='Search for a country...'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
            />
            <FontAwesomeIcon
                className={`cursor-pointer absolute text-gray-500 left-6 bottom-5 w-5 h-5 ${darkmode && "text-white"}`}
                icon={faMagnifyingGlass}
                onClick={submitHandler}
            />
            <div className='bg-white mt-2 absolute w-full'>
                {limitedDatabox.map((e) => (
                    <p key={e.name} onClick={() => handleOption(e.name)} className='hover:bg-gray-100 p-2 cursor-pointer transition-all'>{e.name}</p>
                ))}
            </div>
        </form>
    );
};

export default Searchbox;
