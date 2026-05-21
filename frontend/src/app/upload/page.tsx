"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function UploadPage() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [genre, setGenre] = useState("")
  const [price, setPrice] = useState("")
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/login")
    }
  }, [router])

  const handleUpload = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    if (!file) {
      alert("Please select an image")
      return
    }

    const formData = new FormData()

    formData.append("title", title)
    formData.append("description", description)
    formData.append("genre", genre)
    formData.append("price", price)
    formData.append("file", file)

    try {
      const token = localStorage.getItem("token")

      const response = await axios.post(
        "http://127.0.0.1:8000/artworks/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert("Artwork uploaded successfully")

      console.log(response.data)

      setTitle("")
      setDescription("")
      setGenre("")
      setPrice("")
      setFile(null)

    } catch (error) {
      console.error(error)
      alert("Upload failed")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        Upload Artwork
      </h1>

      <form
        onSubmit={handleUpload}
        className="max-w-xl space-y-4"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full p-3 rounded bg-zinc-900"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full p-3 rounded bg-zinc-900"
          required
        />

        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) =>
            setGenre(e.target.value)
          }
          className="w-full p-3 rounded bg-zinc-900"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          className="w-full p-3 rounded bg-zinc-900"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0])
            }
          }}
          className="w-full"
          required
        />

        <button
          type="submit"
          className="bg-white text-black px-6 py-3 rounded font-semibold"
        >
          Upload Artwork
        </button>
      </form>
    </div>
  )
}