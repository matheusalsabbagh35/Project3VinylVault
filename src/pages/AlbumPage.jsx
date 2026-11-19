import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const AlbumPage = ({ albums, onAddToCart }) => {
  const { albumId } = useParams();
  const [qty, setQty] = useState(1);

  // looks for which album to display
  const album = albums.find((a) => a.id === albumId);

  // Check if the album exists
  if (!album) {
    return (
      <div className="detail-error">
        <h2>Album Not Found</h2>
        <Link className="btn btn-secondary" to="/">
          Return To Main Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="detail-container">
      {/* back to the catalog */}
      <nav className="breadcrumb">
        <Link to="/">Catalog</Link> &gt; <span>{album.title}</span>
      </nav>

      <div className="detail-grid">
        {/* Display the album cover */}
        <img src={album.image} alt={album.title} className="detail-img" />

        <div className="detail-info">
          {/* Display the album information */}
          <span className="product-category">{album.genre}</span>
          <h1 className="detail-title">{album.title}</h1>
          <p>{album.artist}</p>
          <p className="detail-price">${album.price.toFixed(2)}</p>
          <p className="detail-desc">{album.description}</p>

          {/* Check if album is available */}
          <div className="stock-tag">
            {album.stock > 0
              ? `✓ In Stock (${album.stock} units available)`
              : "Out of Stock"}
          </div>

          {/* Select amount and add to cart */}
          <div className="detail-actions">
            <div className="qty-input-group">
              <label htmlFor="detail-qty">Quantity: </label>
              <input
                type="number"
                id="detail-qty"
                min="1"
                max={album.stock}
                disabled={album.stock === 0}
                value={qty}
                onChange={(e) =>
                  setQty(
                    Math.min(
                      Math.max(1, parseInt(e.target.value, 10) || 1),
                      Math.max(1, album.stock),
                    ),
                  )
                }
              />
            </div>

            <button
              className="btn btn-primary"
              disabled={album.stock === 0}
              onClick={() => onAddToCart(album, qty)}
            >
              Add {qty} to cart
            </button>
          </div>

          {/* Display the vinyl specifications */}
          <div className="album-specs">
            <h2>Vinyl Specifications</h2>
            <p>Catalog Number: {album.specs.catalogNumber}</p>
            <p>Weight: {album.specs.weight}</p>
            <p>Speed: {album.specs.speed}</p>
            <p>Record Label: {album.specs.label}</p>
          </div>

          {/* Display the album tracklist */}
          <div className="album-tracklist">
            <h2>Tracklist</h2>
            <ol>
              {album.tracklist.map((track, index) => (
                <li key={index}>{track}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
