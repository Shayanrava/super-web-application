import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './component/users/Home';
import { AppBar, Toolbar } from "@mui/material";
import Typography from '@mui/material/Typography'
import CinemaHome from './component/ticket_reservation/CinemaHome';
import FootballResults from './component/football-results/FootballResults';
import ExchangeRates from './component/exchange_rates/ExchangeRates';


function App() {

  return (
    <>
      <BrowserRouter basename='/super-web-application'>
        <AppBar position="static" className='fixed top-0 z-50'>
          <Toolbar className=' flex justify-center items-center gap-20'>
            <Typography variant="h6" className='hover:scale-125 transition duration-700' >
              <Link to="/">Home</Link>
            </Typography>

            <Typography variant="h6" className='hover:scale-125 transition duration-700'  >
              <Link to="/book-ticket">Book Tickets</Link>
            </Typography>

            <Typography variant="h6" className='hover:scale-125 transition duration-700' >
              <Link to="/football-results">Football Result</Link>
            </Typography>

            <Typography variant="h6" className='hover:scale-125 transition duration-700' >
              <Link to="/exchange"> Exchamge Rates </Link>
            </Typography>

          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book-ticket" element={<CinemaHome />} />
          <Route path="/football-results" element={<FootballResults />} />
          <Route path="/exchange" element={<ExchangeRates />} />
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
