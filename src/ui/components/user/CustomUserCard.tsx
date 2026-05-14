import { isActive, isAdmin, type User } from "@/domain/user/user.entity"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import CustomAvatar from "./CustomAvatar"


const CustomUserCard = ({ user, className, hideEmail, onlyAvatar }: { user: User, className?: string, hideEmail?: boolean, onlyAvatar?: boolean }) => {
  if (!user) return null;

  return (
    <Card className={`hover:shadow-lg hover:border-black dark:hover:border-white hover:scale-105 transition-all duration-200 h-full ${!isActive(user) ? 'opacity-60' : ''} ${className}`}>
      <CardContent className={`h-full flex items-center ${onlyAvatar ? 'p-0 justify-center' : 'p-4'}`}>
        <div className={`flex items-center w-full min-w-0 ${onlyAvatar ? 'justify-center' : 'gap-3'}`}>
          {/* Avatar que se ajusta al contenedor */}
          <CustomAvatar user={user} className={`${onlyAvatar ? 'w-10 h-10' : 'w-12 h-12 sm:w-16 sm:h-16'} shrink-0`} />
          
          {!onlyAvatar && (
            <div className="flex-1 min-w-0 flex flex-col items-start justify-center">
            <div className="flex items-center gap-2 flex-wrap w-full">
              <h3 className="text-sm sm:text-base font-semibold truncate leading-tight">
                {user.name} {user.surname}
              </h3>
              {isAdmin(user) && (
                <Badge className="px-1.5 py-0 text-[10px] sm:text-xs bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border-0 shrink-0">
                  Admin
                </Badge>
              )}
            </div>
            {!hideEmail && (
              <div className="text-[11px] sm:text-sm text-gray-600 dark:text-gray-400 truncate w-full text-left">
                <span className="font-medium">Correo: </span>
                {user.email}
              </div>
            )}
          </div>
        )}
        </div>
      </CardContent>
    </Card>
  )
}

export default CustomUserCard
