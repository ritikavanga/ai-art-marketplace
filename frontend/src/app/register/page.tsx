"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    try {
      await axios.post(
        "http://127.0.0.1:8000/auth/register",
        {
          username,
          email,
          password
        }
      )

      alert("Registration successful")

      router.push("/login")

    } catch (error) {
      console.error(error)
      alert("Registration failed")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md space-y-4"
      >
        <h1 className="text-4xl font-bold mb-6">
          Register
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full p-3 rounded bg-zinc-800"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-3 rounded bg-zinc-800"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-3 rounded bg-zinc-800"
        />

        <button
          type="submit"
          className="w-full bg-white text-black py-3 rounded font-semibold"
        >
          Register
        </button>
      </form>
    </div>
  )
}