"usw client"
import { useAtom } from "jotai"
import { Selectvalname, Thechngeatom } from "../utils/atom"
import { useState } from "react"




type Props = {}

const Selectbox = (props: Props) => {
  const [darkmode] = useAtom(Thechngeatom)
  const [selectvalue, setSelectvalue] = useState("a")
  const [, setselectval] = useAtom(Selectvalname)


  const fetchSelectName = (value: string) => {
    fetch('/data.json')
        .then(res => res.json())
        .then(data => {
            const country = data.filter((e: any) => e.region === value);
            if (country) {
                
              setselectval(country);
            }
            
        })
        .catch(error => console.error('Error fetching countries:', error));
};
  
  const optionhandel = (value:any) => {
    setSelectvalue(value)
    fetchSelectName(value)
  }
  

  return (
    <select  onChange={(e:any) => optionhandel(e.target.value)} className={`p-5 rounded-md outline-none bg-white max-sm:mr-[100px] pr-16 max-md:w-[70%] ${darkmode && "light-dark text-white border-none"}`}>
    <option  value="">Filter by Region</option>
      <option value="Asia">Asia</option>
      <option value="Africa">Africa</option>
      <option value="Europe">Europe</option>
      <option value="Americas">Americas</option>
      <option value="Oceania">Oceania</option>
      
    </select>
  )
}

export default Selectbox