"use client"

import { useEffect, useState } from "react"
import axios from "axios"

import ArtworkCard from "@/app/ArtworkCard"

interface Artwork {
  id: number
  title: string
  genre: string
  price: number
  image_url: string
}

export default function Home() {
  const [artworks, setArtworks] = useState<Artwork[]>([])

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/artworks")
      .then((res) => {
        setArtworks(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        AI Art Marketplace
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {artworks.map((art) => (
          <ArtworkCard
            key={art.id}
            title={art.title}
            genre={art.genre}
            price={art.price}
            image_url={art.image_url}
          />
        ))}
      </div>
    </main>
  )
}