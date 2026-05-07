import { type User } from "@/domain/user/user.entity"
import { Avatar, AvatarFallback } from "../ui/avatar";


const CustomAvatar = (currentUser: User) => {
    const getInitials = () =>
        `${currentUser.name[0]}${currentUser.surname[0]}`.toUpperCase();
    return (
        <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
    )
}

export default CustomAvatar
