import { useState } from 'react';
import axios from 'axios';
import './App.css';
import ApodDisplay from './components/ApodDisplay';
import BanList from './components/BanList';
import History from './components/History';

function App() {
  const [currentApod, setCurrentApod] = useState(null);
  const [history, setHistory] = useState([]);
  const [banList, setBanList] = useState({
    titles: [],
    dates: [],
    mediaTypes: [],
  });
  const [loading, setLoading] = useState(false);

  const fetchApod = async () => {
    setLoading(true);
    let newApod = null;
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      try {
        const response = await axios.get('https://api.nasa.gov/planetary/apod', {
          params: {
            api_key: import.meta.env.VITE_NASA_API_KEY,
            count: 1,
          },
        });

        const apodData = response.data[0];
        const apodItem = {
          id: apodData.date + Math.random(),
          image: apodData.media_type === 'image' ? apodData.url : apodData.thumbnail_url,
          title: apodData.title,
          date: apodData.date,
          mediaType: apodData.media_type,
          explanation: apodData.explanation,
        };

        if (
          !banList.titles.includes(apodItem.title) &&
          !banList.dates.includes(apodItem.date) &&
          !banList.mediaTypes.includes(apodItem.mediaType)
        ) {
          newApod = apodItem;
          break;
        }
      } catch (error) {
        console.error('Error fetching APOD:', error);
      }
      attempts++;
    }

    if (newApod) {
      setCurrentApod(newApod);
      setHistory((prev) => [newApod, ...prev]);
    }
    setLoading(false);
  };

  const toggleBan = (attribute, value) => {
    setBanList((prev) => {
      const category =
        attribute === 'title' ? 'titles' : attribute === 'date' ? 'dates' : 'mediaTypes';
      const isBanned = prev[category].includes(value);

      if (isBanned) {
        return {
          ...prev,
          [category]: prev[category].filter((item) => item !== value),
        };
      } else {
        return {
          ...prev,
          [category]: [...prev[category], value],
        };
      }
    });
  };

  const banCurrentApod = () => {
    if (currentApod) {
      toggleBan('title', currentApod.title);
      toggleBan('date', currentApod.date);
      toggleBan('mediaType', currentApod.mediaType);
      fetchApod();
    }
  };

  return (
    <>
      <div className="header">
        <a href="https://www.nasa.gov" target="_blank">
          <img src="/nasa_logo.png" className="logo" alt="NASA logo 1" />
        </a>
        <h1>NASA APOD Explorer</h1>
        <a href="https://www.nasa.gov" target="_blank">
          <img src="/nasa_logo.png" className="logo nasa" alt="NASA logo 2" />
        </a>
      </div>

      <div className="button-group">
        <button className="discover-button" onClick={fetchApod} disabled={loading}>
          {loading ? 'Exploring...' : 'Discover'}
        </button>
        <button className="ban-button" onClick={banCurrentApod} disabled={!currentApod || loading}>
          Ban Current
        </button>
      </div>

      <ApodDisplay currentApod={currentApod} banList={banList} toggleBan={toggleBan} />
      <BanList banList={banList} toggleBan={toggleBan} />
      <History history={history} />
    </>
  );
}

export default App;