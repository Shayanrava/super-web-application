import React, { useEffect, useState } from 'react'
import { Typography, Button, Alert } from '@mui/material'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import AutorenewIcon from '@mui/icons-material/Autorenew';

class reserve {
  row: number;
  number: number;
  isReserve: boolean;
  isSelected: boolean

  constructor() {
    this.row = -1;
    this.number = -1;
    this.isReserve = false;
    this.isSelected = false;
  }
}

export default function CinemaHome() {
  // for total button
  const [btnArr, setBtnArr] = useState<reserve[]>([])
  // save number selected by a user
  const [numberSeat, setNumberSeat] = useState<number>(0)

  // save array of selected button
  const [seatSelectArr, setSeatSelectArr] = useState<number[]>([])

  const [openInvoice, setOpenInvoice] = useState<boolean>(false)
  const [openResult, setOpenResult] = useState<boolean>(false)
  const [successShop, setSuccessShop] = useState<boolean>(false)

  // i & j for seats
  const rows: number = 5;
  const col: number = 8;
  const images: string[] = [process.env.PUBLIC_URL + '/shopping1.gif', process.env.PUBLIC_URL + '/shopping2.gif', process.env.PUBLIC_URL + '/shopping3.gif',
  process.env.PUBLIC_URL + '/shopping4.gif', process.env.PUBLIC_URL + '/Failed1.gif', process.env.PUBLIC_URL + '/Failed2.gif',]

  // initial btnArr
  useEffect(() => {
    const tempArr: reserve[] = [];
    for (let i: number = 0; i < rows; i++) {
      for (let j: number = 0; j < col; j++) {
        const temp: reserve = new reserve();
        temp.number = j;
        temp.row = i;
        tempArr.push(temp);
      }
    }
    setBtnArr(tempArr);
  }, [])

  const ClickHandler = (row: number, number: number): void => {
    const tempArr: reserve[] = [...btnArr];
    var tempSeatArr: number[] = [...seatSelectArr]
    const index: number = (row * col) + number;
    if (!tempArr[index].isSelected) {
      setNumberSeat(numberSeat + 1);
      tempSeatArr.push(index + 1);
    } else {
      setNumberSeat(numberSeat - 1);
      tempSeatArr = tempSeatArr.filter((value: number) => value !== index + 1);
    }
    tempArr[index].isSelected = !tempArr[index].isSelected;
    setBtnArr(tempArr);
    setSeatSelectArr(tempSeatArr);
  }

  const RefreshHandler = (): void => {
    setNumberSeat(0)
    setSeatSelectArr([])
    const tempArr: reserve[] = [...btnArr]
    tempArr.forEach((btn) => {
      btn.isReserve = false
      btn.isSelected = false
    })
    setBtnArr(tempArr)
  }

  const BuyHandler = (): void => {
    setOpenResult(true)
    if (seatSelectArr.length === 0) {
      setSuccessShop(false);

      return;
    }
    const tempArr: reserve[] = [...btnArr]
    seatSelectArr.forEach((i) => {
      tempArr[i - 1].isReserve = true;
      tempArr[i - 1].isSelected = false;
    })
    setBtnArr(tempArr);
    setNumberSeat(0)
    setSuccessShop(true);
    setSeatSelectArr([])
  }


  return (
    <div className='bg-[#1c1c1c] w-full h-full flex flex-col items-center'>

      <Typography variant='h3' className='mt-28 mb-5 text-yellow-300'> Book Ticket </Typography>

      <div className='w-full md:w-3/4 lg:w-3/5 xl:w-1/2 flex flex-col items-center px-2'>
        <Typography className='bg-[#444] w-full text-center text-white rounded-md py-3'>Screen</Typography>

        <div className="relative w-full h-[50px] bg-black">
          <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,.6),_transparent_80%)] animate-glow z-[1]"></div>
        </div>
      </div>

      <div className='w-full grid grid-cols-8 gap-x-1 gap-y-4 my-10 px-2 md:w-3/4 lg:w-3/5 xl:w-1/2  sm:gap-x-4 sm:gap-y-4'>
        {
          btnArr.map((btn) => {
            return (
              <>
                <Button variant="contained" key={(btn.row * col) + btn.number}
                  className={` ${btn.isSelected ? "bg-red-400" : btn.isReserve ? "bg-gray-500" : "bg-fuchsia-700"} 
                           ${btn.isSelected ? "hover:bg-red-500" : btn.isReserve ? "" : "hover:bg-fuchsia-800"}
                           transition duration-500 hidden sm:flex
                          `}
                  disabled={btn.isReserve}
                  onClick={() => ClickHandler(btn.row, btn.number)}>{(btn.row * col) + btn.number + 1}</Button>

                <button key={(btn.row * col) + btn.number}
                  className={` ${btn.isSelected ? "bg-red-400" : btn.isReserve ? "bg-gray-500" : "bg-fuchsia-700"} 
                           ${btn.isSelected ? "hover:bg-red-500" : btn.isReserve ? "" : "hover:bg-fuchsia-800"}
                           transition duration-500 flex justify-center size-11 text-white rounded-lg items-center sm:hidden 
                          `}
                  disabled={btn.isReserve}
                  onClick={() => ClickHandler(btn.row, btn.number)}>{(btn.row * col) + btn.number + 1}</button>

              </>
            )
          })
        }
      </div>

      <div className='flex flex-col items-center w-full my-8'>
        <div className='w-full flex justify-center'>
          <Button variant="text" className='flex justify-center gap-2 bg-[#ff9800] text-white hover:bg-[#e68900] ' onClick={BuyHandler}>
            <Typography variant="body1" >BUY</Typography>
            <AddShoppingCartIcon ></AddShoppingCartIcon>
          </Button>
        </div>

        <div className='flex w-full justify-center gap-5 my-5'>
          <Button variant="text" className='flex justify-center gap-2 bg-[#607d8b] text-white hover:bg-[#455a64]' onClick={RefreshHandler}>
            <Typography variant="body1" >refresh storage</Typography>
            <AutorenewIcon ></AutorenewIcon>
          </Button>
          <Button variant="text" className='flex justify-center gap-2 bg-[#607d8b] text-white hover:bg-[#455a64]' onClick={() => setOpenInvoice(true)}>
            <Typography variant="body1" >Show my sales</Typography>
            <LocalActivityIcon ></LocalActivityIcon>
          </Button>
        </div>

      </div>

      <Modal
        open={openInvoice}
        onClose={() => { setOpenInvoice(!openInvoice) }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openInvoice} >
          <Box className="w-5/6 md:w-3/5 lg:w-1/2 xl:w-1/3 h-3/5 md:h-1/2  absolute top-1/2 left-1/2 bg-cyan-100 -translate-y-1/2 -translate-x-1/2  flex flex-col items-center justify-center" >
            <Box className=" flex justify-center">
              <img src={`${process.env.PUBLIC_URL }/PopCorn.gif`} alt='' />
            </Box>
            <Box className=' my-8 w-2/3 flex flex-col gap-3'>
              <Alert color='info'>
                You select {numberSeat} seat
              </Alert>
              <Alert color='info'>
                Total Price is {numberSeat * 1.8}$
              </Alert>
              <Button variant='contained' onClick={() => setOpenInvoice(!openInvoice)}>OK</Button>
            </Box>
          </Box>
        </Fade>
      </Modal >

      <Modal
        open={openResult}
        onClose={() => { setOpenResult(!openResult) }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}

      >
        <Fade in={openResult}>
          <Box className={`${successShop ? 'bg-green-200' : 'bg-red-200'} w-11/12 md:w-3/5 lg:w-1/2 xl:w-1/3 h-3/5 md:h-1/2  absolute top-1/2 left-1/2 bg-gray-300 -translate-y-1/2 -translate-x-1/2 px-14 py-6 `} >
            <Box className=" flex justify-center">
              <img src={openResult ? (successShop ? images[Math.floor(Math.random() * 4)] : images[Math.floor(Math.random() * 2) + 4]) : ""} alt="" />
            </Box>
            <Alert className="my-2" color={successShop ? 'success' : 'error'} >
              {successShop ? "Your ticket purchase was successful!" : "Your purchase failed!"}
            </Alert>
            <Alert className="" color={successShop ? 'success' : 'error'}>
              {successShop ? "Enjoy your movie!" : "Please select at least a seat!"}
            </Alert>
          </Box>
        </Fade>
      </Modal>


    </div >

  )
}
