import React, { useEffect, useState, ChangeEvent } from 'react'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import { InputAdornment, Avatar } from "@mui/material";
import { OutlinedInput, FormControl, InputLabel } from "@mui/material";


export default function ExchangeRates() {
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [names, setNames] = useState<Record<string, string> | null>(null);
  const [amount, setAmount] = useState<number>(1)
  const [isShowCalculate, setIsShowCalculate] = useState<boolean>(false)
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [isShowFrom, setIsShowForm] = useState<boolean>(false)
  const [keyFrom, setKeyFrom] = useState<string>("USD")
  const [nameFrom, setNameFrom] = useState<string>("- United States Dollar")
  const [urlFrom, setUrlFrom] = useState<string>("https://www.xe.com/svgs/flags/usd.static.svg")
  const [valueFrom, setValueFrom] = useState<number>(0)
  const [isShowTo, setIsShowTo] = useState<boolean>(false)
  const [keyTo, setKeyTo] = useState<string>("EUR")
  const [nameTo, setNameTo] = useState<string>("- EURO")
  const [urlTo, setUrlTo] = useState<string>("https://www.xe.com/svgs/flags/eur.static.svg")
  const [valueTo, setValueTo] = useState<number>(0)

  useEffect(() => {
    getRates()
    getNames()
  }, [])

  const getRates = async (): Promise<void> => {
    try {
      const response: Response = await fetch("https://open.er-api.com/v6/latest/USD");
      const data: any = await response.json();
      setRates(data.rates);
    } catch (error) {
      console.log(error);
    }
  }
  const getNames = async (): Promise<void> => {
    try {
      const response: Response = await fetch("https://openexchangerates.org/api/currencies.json");
      const data: any = await response.json();
      setNames(data);
    } catch (error) {
      console.log(error);
    }
  }
  const ClickPanelFrom = (key: string, name: string, value: number, url: string): void => {
    setKeyFrom(key)
    setNameFrom(name)
    setUrlFrom(url)
    setIsShowForm(false)
    setValueFrom(value)
  }
  const ClickPanelTo = (key: string, name: string, value: number, url: string): void => {
    setKeyTo(key)
    setNameTo(name)
    setUrlTo(url)
    setIsShowTo(false)
    setValueTo(value)
  }
  const togglePanelFrom = (): void => {
    setIsShowForm(!isShowFrom)
    setIsShowTo(false)
  }
  const togglePanelTo = (): void => {
    setIsShowTo(!isShowTo)
    setIsShowForm(false)
  }
  const resetPanels = (): void => {
    setIsShowTo(false)
    setIsShowForm(false)
  }
  const calculate = () => {
    if (valueFrom === 0 || valueTo === 0) {
      setValueFrom(rates!["USD"])
      setValueTo(rates!["EUR"])
    }
    setIsShowForm(false)
    setIsShowCalculate(true)
  }





  return (
    <div className="flex justify-center bg-gradient-to-r from-[rgb(20,20,105)] to-[rgb(15,15,65)] w-full h-screen">
      <div className='flex justify-center mt-48 w-full'>

        {!rates || !names ? (
          <CircularProgress className='text-white' />
        ) : (
          <div className='bg-gray-100 flex flex-col gap-8 items-center justify-center w-3/4 rounded-3xl h-72'>
            <Box className=' grid grid-cols-3 gap-x-2 justify-center items-center w-full px-4' >
              <FormControl variant="outlined" onClick={resetPanels}>
                <InputLabel> Amount</InputLabel>
                <OutlinedInput
                  className='px-4 py-6 text-xl'
                  type='number'
                  value={isFocus ? amount : amount.toFixed(2)}
                  onFocus={() => { setIsFocus(true) }}
                  onBlur={() => setIsFocus(false)}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setAmount(Number(Number(e.target.value).toFixed(2)))}
                  startAdornment={
                    <InputAdornment position="start">
                      <Typography variant="body1" color="initial" className='px-2 text-3xl'>$</Typography>
                    </InputAdornment>
                  }
                  label="Amount"
                />
              </FormControl>
              <Box className=" relative " onClick={togglePanelFrom} >
                <FormControl variant="outlined" disabled>
                  <InputLabel> From</InputLabel>
                  <OutlinedInput
                    className='px-4 py-6'
                    startAdornment={
                      <InputAdornment position="start" >
                        <Box className='flex items-center '>
                          <Avatar
                            src={urlFrom}
                          />
                          <Typography variant="body1" color="initial" className='px-2'>{keyFrom}</Typography>
                          <Typography variant="body1" color="initial" className='text-gray-400'>{nameFrom}</Typography>
                        </Box>
                      </InputAdornment>
                    }
                    label="From"
                  />
                </FormControl>
                <div className={` absolute h-[250px] w-full bg-white top-[105%] rounded-md overflow-y-scroll ${isShowFrom ? "flex" : "hidden"}`}>
                  <ul >
                    {Object.entries(rates).map(([key, value]) => ((names[key] && key !== "SSP") &&
                      <li key={key} className='flex gap-5 text-sm border-blue-400 px-2 py-3 rounded-md cursor-pointer hover:border' onClick={() => ClickPanelFrom(key, names[key], value, `https://www.xe.com/svgs/flags/${key.toLowerCase()}.static.svg`)}>
                        <img className='size-6' src={`	https://www.xe.com/svgs/flags/${key.toLowerCase()}.static.svg`} alt="" />
                        <Typography variant="body1" className='text-sm '>{` ${key}   ${names[key]} `}</Typography>
                      </li>
                    ))}
                  </ul>
                </div>
              </Box>
              <Box className=" relative " onClick={togglePanelTo} >
                <FormControl variant="outlined" disabled>
                  <InputLabel>To</InputLabel>
                  <OutlinedInput
                    className='px-4 py-6'
                    startAdornment={
                      <InputAdornment position="start" >
                        <Box className='flex items-center '>
                          <Avatar
                            src={urlTo}
                          />
                          <Typography variant="body1" color="initial" className='px-2'>{keyTo}</Typography>
                          <Typography variant="body1" color="initial" className='text-gray-400'>{nameTo}</Typography>
                        </Box>
                      </InputAdornment>
                    }
                    label="From"
                  />
                </FormControl>
                <div className={` absolute h-[250px] w-full bg-white top-[105%] rounded-md overflow-y-scroll z-10 ${isShowTo ? "flex" : "hidden"}`}>
                  <ul >
                    {Object.entries(rates).map(([key, value]) => ((names[key] && key !== "SSP") &&
                      <li key={key} className='flex gap-5 text-sm border-blue-400 px-2 py-3 rounded-md cursor-pointer hover:border' onClick={() => ClickPanelTo(key, names[key], value, `https://www.xe.com/svgs/flags/${key.toLowerCase()}.static.svg`)}>
                        <img className='size-6' src={`	https://www.xe.com/svgs/flags/${key.toLowerCase()}.static.svg`} alt="" />
                        <Typography variant="body1" className='text-sm '>{` ${key}   ${names[key]} `}</Typography>
                      </li>
                    ))}
                  </ul>
                </div>
              </Box>
            </Box>
            <Box className="w-full flex justify-start  px-4">
              <Box className="w-1/2 mr-auto flex flex-col  items-start px-3 py-2">
                {isShowCalculate && (
                  <>
                    <Box className="text-xl text-[rgb(92,102,123)]">{amount.toFixed(2)} {keyFrom} =</Box>
                    <Box className="text-[rgb(46, 60, 87)] text-3xl my-2">{(amount * valueTo / valueFrom).toFixed(6)} {keyTo}</Box>
                  </>)
                }
              </Box>
              <Box className='w-1/5 bg-blue-450 py-4 '>
                <Button variant="contained" className='w-full py-4 ' onClick={calculate}>Convert</Button>
              </Box>
            </Box>
          </div>
        )}


      </div>
    </div>
  )
}
