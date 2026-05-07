import { isAdmin, type User } from "@/domain/user/user.entity"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Users, Mail } from "lucide-react"
import CustomAvatar from "./CustomAvatar"
import { Badge } from "../ui/badge"

const MainProfileCard = (currentUser: User) => {
  return (
     <Card className="w-full mt-4">
        <CardHeader>
          <CardTitle>Tu Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
              <CustomAvatar {...currentUser} />
            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    <span className="font-medium">Nombre:</span>{" "}
                    {currentUser.name} {currentUser.surname}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    <span className="font-medium">Correo:</span>{" "}
                    {currentUser.email}
                  </span>
                </div>
                {isAdmin(currentUser) && (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border-0">
                      Administrador
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
  )
}

export default MainProfileCard
