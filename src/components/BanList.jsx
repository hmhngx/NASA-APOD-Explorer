import '../components/components.css';

function BanList({ banList, toggleBan }) {
  return (
    <div className="ban-list">
      <h2>Ban List</h2>
      <div>
        <h3>Titles:</h3>
        {banList.titles.map((title) => (
          <span
            key={title}
            className="ban-item"
            onClick={() => toggleBan('title', title)}
          >
            {title}
          </span>
        ))}
      </div>
      <div>
        <h3>Dates:</h3>
        {banList.dates.map((date) => (
          <span
            key={date}
            className="ban-item"
            onClick={() => toggleBan('date', date)}
          >
            {date}
          </span>
        ))}
      </div>
      <div>
        <h3>Media Types:</h3>
        {banList.mediaTypes.map((mediaType) => (
          <span
            key={mediaType}
            className="ban-item"
            onClick={() => toggleBan('mediaType', mediaType)}
          >
            {mediaType}
          </span>
        ))}
      </div>
    </div>
  );
}

export default BanList; 