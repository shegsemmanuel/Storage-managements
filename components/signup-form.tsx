"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function SignupForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({ name: "", email: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({ name: "", email: "" })

    const newErrors = { name: "", email: "" }

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name"
    }

    if (!formData.email || !formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address"
    }

    if (newErrors.name || newErrors.email) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    console.log("[v0] Creating account for:", formData)

    // Simulate signup
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center lg:text-left">
        <h2 className="text-4xl font-bold text-foreground mb-8">Create Account</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-muted-foreground">
            Full name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value })
              setErrors({ ...errors, name: "" })
            }}
            required
            className="h-12 bg-secondary/50 border-0 placeholder:text-muted-foreground/50"
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-muted-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value })
              setErrors({ ...errors, email: "" })
            }}
            required
            className="h-12 bg-secondary/50 border-0 placeholder:text-muted-foreground/50"
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 bg-primary hover:bg-primary/90 text-white text-lg font-medium rounded-full shadow-lg"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}
