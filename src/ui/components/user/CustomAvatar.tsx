import { type User } from "@/domain/user/user.entity"
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Link } from "react-router-dom";


const CustomAvatar = ({ user, className }: { user: User, className?: string }) => {
    const getInitials = () =>
        `${user.name[0]}${user.surname[0]}`.toUpperCase();
    return (
        <Link to={`/user/${user.id}`} >
            <Avatar className={`${className || "w-20 h-20"} hover:cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out`}>
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {getInitials()}
                </AvatarFallback>
            </Avatar>
        </Link>
    )
}

export default CustomAvatar
