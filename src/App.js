
import './App.css';
import './movie.css';
// import Home from './components/Home.tsx';
import Header from './components/Header/Header.jsx';
import MoviePage from './components/MoviePage/MoviePage.tsx';
import MovieData from './mockData/movies.json';

function App() {
  return (    
    <div className="App">
      <Header/>
      <MoviePage {...MovieData.movies[0]} />
    </div>
  );
}

export default App;
