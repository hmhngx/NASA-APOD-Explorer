import { useEffect, useState } from 'react';
import '../components/components.css';

function ApodDisplay({ currentApod, banList, toggleBan }) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (currentApod) {
      setFade(false);
      setTimeout(() => setFade(true), 10);
    }
  }, [currentApod]);

  if (!currentApod) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className={`apod-display ${fade ? 'fade-in' : ''}`}>
      {currentApod.mediaType === 'image' ? (
        <img src={currentApod.image} alt={currentApod.title} className="apod-image" />
      ) : (
        <video controls className="apod-video">
          <source src={currentApod.image} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="apod-attributes">
        <p>
          Title:{' '}
          <span
            className={`attribute ${banList.titles.includes(currentApod.title) ? 'banned' : ''}`}
            onClick={() => toggleBan('title', currentApod.title)}
          >
            {currentApod.title}
          </span>
        </p>
        <p>
          Date:{' '}
          <span
            className={`attribute ${banList.dates.includes(currentApod.date) ? 'banned' : ''}`}
            onClick={() => toggleBan('date', currentApod.date)}
          >
            {currentApod.date}
          </span>
        </p>
        <p>
          Media Type:{' '}
          <span
            className={`attribute ${banList.mediaTypes.includes(currentApod.mediaType) ? 'banned' : ''}`}
            onClick={() => toggleBan('mediaType', currentApod.mediaType)}
          >
            {currentApod.mediaType}
          </span>
        </p>
        <p className="explanation">{currentApod.explanation}</p>
      </div>
    </div>
  );
}

export default ApodDisplay;