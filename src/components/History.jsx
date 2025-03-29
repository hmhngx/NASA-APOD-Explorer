import '../components/components.css';

function History({ history }) {
  return (
    <div className="history">
      <h2>Exploration History</h2>
      <div className="history-grid">
        {history.map((apod, index) => (
          <div key={index} className="history-item">
            {apod.mediaType === 'image' ? (
              <img src={apod.image} alt={`History APOD ${index}`} />
            ) : (
              <video controls>
                <source src={apod.image} type="video/mp4" />
              </video>
            )}
            <p>Title: {apod.title}</p>
            <p>Date: {apod.date}</p>
            <p>Media Type: {apod.mediaType}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;