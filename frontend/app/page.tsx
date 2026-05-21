"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function Home() {
  const [backendMsg, setBackendMsg] = useState("Connecting to backend...")

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000")
      .then((res) => {
        setBackendMsg(res.data.message)
      })
      .catch(() => {
        setBackendMsg("Backend not connected ❌")
      })
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      {/* HERO SECTION */}
      <h1 className="text-5xl md:text-6xl font-bold text-center">
        AI Art Marketplace
      </h1>

      <p className="text-gray-400 mt-4 text-center text-lg">
        Discover, create, and sell AI-generated artworks
      </p>

      {/* API STATUS BOX */}
      <div className="mt-10 bg-zinc-900 border border-zinc-700 px-6 py-3 rounded-lg">
        <p className="text-sm text-gray-300">
          Backend Status:{" "}
          <span className="text-green-400 font-semibold">
            {backendMsg}
          </span>
        </p>
      </div>

      {/* FUTURE SECTION PLACEHOLDER */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl">

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-xl font-semibold">Explore Art</h2>
          <p className="text-gray-400 text-sm mt-2">
            Browse AI-generated artworks by category
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-xl font-semibold">Create</h2>
          <p className="text-gray-400 text-sm mt-2">
            Upload or generate your own AI art
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-xl font-semibold">Sell</h2>
          <p className="text-gray-400 text-sm mt-2">
            Monetize your creations in marketplace
          </p>
        </div>

      </div>

    </div>
  )
}