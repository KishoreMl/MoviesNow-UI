
import './App.css';
import './movie.css';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import MoviePage from './components/MoviePage';
import Allmovies from './components/Allmovies';
import TheatrePage from './components/TheatrePage';
import TheatreHallPage from './components/TheatreHallPage';
import BookingSummary from './components/BookingSummary';
import PaymentPage from './components/PaymentPage';
import PaymentOtp from './components/PaymentOtp';
import TicketPage from './components/TicketPage';
import IndexPage from './components/IndexPage';
import MovieNotFound from './components/MovieNotFound';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Route exact path="/"><IndexPage /></Route>
      <Route path="/otp/:userid"  />
      <Route path="/home"><Home/></Route>
      <Route path="/movie/:id" render={(props) => <MoviePage {...props}/>}/>
      <Route path="/movies"><Allmovies /></Route>
      <Route path="/movienotfound"><MovieNotFound/></Route>
      <Route path="/theaters/:id"  render={(props) => <TheatrePage {...props}/>}/>
      <Route path="/theatrehall/:ticketId/:time" render={(props) => <TheatreHallPage {...props}/>}/>
      <Route path="/bookingsummary/:ticketId" render={(props) => <BookingSummary {...props}/>}/>
      <Route path="/payment/:ticketId" render={(props) => <PaymentPage {...props}/>}/>
      <Route path="/paymentotp/:ticketId" render={(props) => <PaymentOtp {...props}/>}/>
      <Route path="/ticket/:ticketId" render={(props) => <TicketPage {...props}/>}/>

    </div>
  );
}

export default App;
