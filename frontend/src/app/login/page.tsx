"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login",
        {
          email,
          password
        }
      )

      localStorage.setItem(
        "token",
        response.data.access_token
      )

      alert("Login successful")

      router.push("/")

    } catch (error) {
      console.error(error)
      alert("Login failed")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md space-y-4"
      >
        <h1 className="text-4xl font-bold mb-6">
          Login
        </h1>

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
          Login
        </button>
      </form>
    </div>
  )
}