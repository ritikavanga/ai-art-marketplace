"use client"

import { useEffect, useState } from "react"
import axios from "axios"

import ArtworkCard from "../components/ArtworkCard"

interface Artwork {
  id: number
  title: string
  description: string
  genre: string
  image_url: string
  price: number
}

export default function Home() {
  const [artworks, setArtworks] = useState<Artwork[]>([])

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/artworks/")
      .then((res) => {
        setArtworks(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-5xl font-bold">
          AI Art Marketplace
        </h1>

        <a
          href="/upload"
          className="bg-white text-black px-5 py-3 rounded-lg font-semibold"
        >
          Upload Art
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {artworks.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            title={artwork.title}
            description={artwork.description}
            genre={artwork.genre}
            image_url={artwork.image_url}
            price={artwork.price}
          />
        ))}
      </div>
    </div>
  )
}