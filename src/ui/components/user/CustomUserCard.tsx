import { isActive, isAdmin, type User } from "@/domain/user/user.entity"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import CustomAvatar from "./CustomAvatar"


const CustomUserCard = ({ user }: { user: User }) => {
  return (
    <div>
      <Card className={`hover:shadow-lg min-h-40 ${!isActive(user) ? 'opacity-60' : ''}`}>

      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <CustomAvatar user={user} className="w-20 h-20" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-semibold">
                {user.name} {user.surname}
              </h3>
              {isAdmin(user) && (
                <Badge className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border-0">
                  Administrador
                </Badge>
              )}
            </div>
            <div className="flex  text-sm text-gray-600 dark:text-gray-400">
              <p><span className="font-medium">Correo:</span> {user.email}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </div >
  )
}

export default CustomUserCard
