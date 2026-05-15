import { isAdmin, type User } from "@/domain/user/user.entity"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Users, Mail } from "lucide-react"
import CustomAvatar from "./CustomAvatar"
import { Badge } from "../ui/badge"
import { useMe } from "@/ui/hooks/user/useMe"
import { Navigate } from "react-router-dom"
import Dashboard from "@/ui/pages/dashboard/Dashboard"
import type { ReactNode } from "react"

interface ProfileProps{
  user: User | null;
  children?: ReactNode
}

export const MainProfileCard = ({ user,children}: ProfileProps) => {
  const { me } = useMe();
  if (!me) return null;
  const isMe = me?.id === user?.id;
  if (!user){return <Navigate to={<Dashboard/>} />}

  
  return (
     <Card className="w-full pb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-center">{isMe ? "Tu Perfil" : "Perfil de Usuario"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col-reverse md:flex-row gap-6">
              <CustomAvatar user={user} className="w-30 h-30" />
            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    <span className="font-medium">Nombre:</span>{" "}
                    {user.name} {user.surname}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  
                  <span className="text-sm flex gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Correo:</span>{" "}
                    {user.email}
                  </span>
                  <br/>
                  {children}
                </div>
                {
                  
                isAdmin(user) && (
                <Badge className="px-1.5 py-0 text-[10px] sm:text-xs bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border-0 shrink-0">
                  Admin
                </Badge>
              )}
              
              </div>
              
            </div>
          </div>
        </CardContent>
      </Card>
  )
}

export default MainProfileCard
