"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import type { User as SupabaseUser } from "@supabase/supabase-js"

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
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          const supabaseUser = session.user
          // Get user profile from database
          const { data: profile } = await supabase
            .from("users")
            .select("full_name, phone")
            .eq("id", supabaseUser.id)
            .single()

          setUser({
            email: supabaseUser.email || "",
            name: profile?.full_name || supabaseUser.user_metadata?.full_name || supabaseUser.email?.split("@")[0] || "User",
            phone: profile?.phone || supabaseUser.user_metadata?.phone,
            isAuthenticated: true,
          })
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const supabaseUser = session.user
        // Get user profile from database
        const { data: profile } = await supabase
          .from("users")
          .select("full_name, phone")
          .eq("id", supabaseUser.id)
          .single()

        setUser({
          email: supabaseUser.email || "",
          name: profile?.full_name || supabaseUser.user_metadata?.full_name || supabaseUser.email?.split("@")[0] || "User",
          phone: profile?.phone || supabaseUser.user_metadata?.phone,
          isAuthenticated: true,
        })
      } else {
        setUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/")
    router.refresh()
  }

  return { user, isLoading, logout }
}
