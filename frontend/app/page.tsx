"use client"

import Link from "next/link"
import { ArrowRight, UserPlus, LogIn, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/authContext"

export default function Home() {
  const { user } = useAuth()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-background">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-6xl font-bold tracking-tight">User Module</h1>
          <p className="text-muted-foreground text-2xl">Manage User Accounts and Profiles</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {!localStorage.getItem("token") ? (
            <>
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Sign Up
                  </CardTitle>
                  <CardDescription>Create a new account</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href="/signup" className="w-full">
                    <Button variant="outline" className="w-full justify-between group">
                      Get Started
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LogIn className="h-5 w-5" />
                    Log In
                  </CardTitle>
                  <CardDescription>Access your account</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href="/login" className="w-full">
                    <Button variant="outline" className="w-full justify-between group">
                      Sign In
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </>
          ) : (
            <>
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile
                  </CardTitle>
                  <CardDescription>View your profile</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href="/profile" className="w-full">
                    <Button variant="outline" className="w-full justify-between group">
                      View Profile
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    All Users
                  </CardTitle>
                  <CardDescription>Browse user accounts</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href="/users" className="w-full">
                    <Button variant="outline" className="w-full justify-between group">
                      View Users
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
