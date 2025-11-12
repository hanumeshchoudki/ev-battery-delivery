"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  email: string
  name: string
  phone?: string
  isAuthenticated: boolean
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem("user")
        const isLoggedIn = sessionStorage.getItem("isLoggedIn")

        if (userData && isLoggedIn) {
          const parsedUser = JSON.parse(userData)
          if (parsedUser.isAuthenticated) {
            setUser(parsedUser)
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const logout = () => {
    localStorage.removeItem("user")
    sessionStorage.removeItem("isLoggedIn")
    setUser(null)
    router.push("/")
  }

  return { user, isLoading, logout }
}
