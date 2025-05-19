"use client"

import { useAuth } from "@/lib/authContext"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, LogIn, UserPlus, User } from "lucide-react"

export default function Navbar() {
    const { user, logout } = useAuth()
    

    return (
        <nav className="border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link href="/" className="text-xl font-bold">
                        User Module
                    </Link>

                    <div className="flex items-center gap-4">
                        {localStorage.getItem("token") ? (
                            <>
                                <Link href="/profile">
                                    <Button variant="ghost" className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Profile
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    onClick={logout}
                                    className="flex items-center gap-2"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" className="flex items-center gap-2">
                                        <LogIn className="h-4 w-4" />
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <Button variant="ghost" className="flex items-center gap-2">
                                        <UserPlus className="h-4 w-4" />
                                        Sign Up
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
} 