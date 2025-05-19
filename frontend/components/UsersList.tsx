"use client"

import { useEffect, useState } from "react"
import { gql, useQuery } from "@apollo/client"
import { Users, Mail, AlertCircle, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      _id
      email
      name
    }
  }
`

interface UserType {
  _id: string
  email: string
  name: string
}

const UsersList = () => {
  const [isClient, setIsClient] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const { data, loading, error } = useQuery(GET_ALL_USERS, {
    skip: !isClient, // Skip query until client-side
  })

  useEffect(() => {
    setIsClient(true) // Ensure component only renders on client
  }, [])

  // Filter users based on search term
  const filteredUsers =
    data?.getAllUsers?.filter(
      (user: UserType) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || []

  if (!isClient) return null

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          All Users
        </CardTitle>
        <CardDescription>{!loading && !error && `${data?.getAllUsers?.length || 0} users found`}</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="mb-4 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name or email..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {filteredUsers.length > 0 ? (
              <div className="space-y-3">
                {filteredUsers.map((user: UserType) => (
                  <div
                    key={user._id}
                    className="p-4 rounded-md border bg-card flex items-start gap-4 hover:bg-accent/50 transition-colors"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h3 className="font-medium">{user.name}</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm ? "No users match your search." : "No users found."}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default UsersList
