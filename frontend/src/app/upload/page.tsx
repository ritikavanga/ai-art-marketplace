"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function UploadPage() {
  const router = useRouter()

  const [mounted, setMounted] = useState(false)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [genre, setGenre] = useState("")
  const [price, setPrice] = useState("")
  const [file, setFile] = useState<File | null>(null)

  // FIX: wait until browser loads
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/login")
    }
  }, [mounted])

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/login")
      return
    }

    if (!file) {
      alert("Select image")
      return
    }

    const formData = new FormData()

    formData.append("title", title)
    formData.append("description", description)
    formData.append("genre", genre)
    formData.append("price", price)
    formData.append("file", file)

    try {
      const response = await axios.post(
        "http://localhost:8000/artworks/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      )

      alert("Upload successful")
      console.log(response.data)

    } catch (error: any) {
      console.error(error.response?.data || error.message)
      alert("Upload failed")
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        Upload Artwork
      </h1>

      <form onSubmit={handleUpload} className="space-y-4 max-w-xl">
        <input
          className="w-full p-3 bg-zinc-900"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-3 bg-zinc-900"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="w-full p-3 bg-zinc-900"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <input
          className="w-full p-3 bg-zinc-900"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
        />

        <button className="bg-white text-black px-6 py-3 rounded">
          Upload
        </button>
      </form>
    </div>
  )
}