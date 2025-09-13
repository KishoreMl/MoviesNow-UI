
import './App.css';
import './movie.css';
// import Home from './components/Home.tsx';
import Header from './components/Header/Header.jsx';
// import MoviePage from './components/MoviePage/MoviePage.tsx';
// import MovieData from './mockData/movies.json';
import TheatrePage from './components/TheatrePage/TheatrePage.tsx';

function App() {
  return (    
    <div className="App">
      <Header/>
      <TheatrePage  />
    </div>
  );
}

export default App;
