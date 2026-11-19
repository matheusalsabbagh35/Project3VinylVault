import React, { useState } from "react";
import AlbumCard from "../components/AlbumCard";

function CatalogPage({ albums, onAddToCart }) {
  // music genres
  const genres = ["All", "Rock", "Jazz", "Classical", "Electronic"];
  const [selectedGenre, setSelectedGenre] = useState("All");
  const validAlbums = albums || [];

  // Filter albums by the genres
  const filteredAlbums =
    selectedGenre === "All"
      ? validAlbums
      : validAlbums.filter((album) => album.genre === selectedGenre);

  return (
    <div className="catalog-container">
      <header className="catalog-hero">
        <h1>Welcome to VinylVault</h1>
        <p>Enjoy The Best Music Selection</p>
      </header>

      <div className="filter-bar">
        {genres.map((genre) => (
          <button
            key={genre}
            type="button"
            className={`filter-pill ${selectedGenre === genre ? "active" : ""}`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredAlbums.map((album) => (
          <AlbumCard key={album.id} album={album} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default CatalogPage;
