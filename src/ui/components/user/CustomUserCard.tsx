import { isActive, isAdmin, type User } from "@/domain/user/user.entity"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import CustomAvatar from "./CustomAvatar"
import { Link } from "react-router-dom"
import { Mail } from "lucide-react"


const CustomUserCard = ({ user, className, hideEmail, onlyAvatar, noLink }: { user: User | null, className?: string, hideEmail?: boolean, onlyAvatar?: boolean, noLink?: boolean }) => {
  if (!user) return null;

  if (onlyAvatar) {
    return <CustomAvatar user={user} className={className} />;
  }

  const cardContent = (
    <Card className={`hover:shadow-lg hover:border-black dark:hover:border-white transition-all duration-200 h-full ${!noLink ? 'hover:scale-[1.02] cursor-pointer' : ''} ${!isActive(user) ? 'opacity-60' : ''} ${className}`}>
      <CardContent className="p-4 flex items-center gap-4">
        <CustomAvatar user={user} className="w-12 h-12 shrink-0" />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold leading-tight truncate">
              {user.name} {user.surname}
            </h3>
            {isAdmin(user) && (
              <Badge className="px-1.5 py-0 text-[10px] bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border-0 shrink-0">
                Admin
              </Badge>
            )}
            {!isActive(user) && (
              <Badge className="px-1.5 py-0 text-[10px] bg-muted text-muted-foreground border-0 shrink-0">
                Inactivo
              </Badge>
            )}
          </div>
          {!hideEmail && (
            <div className="flex items-center gap-1 mt-0.5 text-[11px] text-muted-foreground truncate">
              <Mail className="size-3 shrink-0" />
              <span className="truncate">{user.email}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (noLink) return cardContent;

  return (
    <Link to={`/user/${user.id.value}`} className="block h-full">
      {cardContent}
    </Link>
  );
}

export default CustomUserCard
