import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/ui/components/ui/sidebar"
import {
  Home,
  Users,
  FolderKanban,
  LogOut,
  Sun,
  Moon,
  Building2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Logo from "./Logo"
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/application/auth/useAuth";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMe } from "@/ui/hooks/user/useMe";
import CustomUserCard from "../user/CustomUserCard";



const AppSidebar = () => {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";
  const isMobile = useIsMobile();
  const { setTheme, theme, } = useTheme();
  const { isAdmin, logout,isLoading } = useAuth();
  
  const navItems = [
    { path: '/', label: 'Inicio', icon: Home, show: true },
    { path: '/users', label: 'Personal', icon: Users, show: isAdmin },
    { path: '/clients', label: 'Clientes', icon: Building2, show: isAdmin },
    { path: '/projects', label: 'Proyectos', icon: FolderKanban, show: true },
  ];
  const [menuOptions, setMenuOptions] = useState(navItems);
  
  const {me } = useMe()

  useEffect(() => {
    setMenuOptions(navItems.filter(item => item.show));
  }, [isAdmin, isLoading, me?.role]);
  const toggleDarkTheme = theme === 'dark' ? () => setTheme('light') : () => setTheme('dark');
  type ItemParam = {
    path: string;
    label: string;
    icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
    show: boolean;
  };

  const CustomItem = (item: ItemParam) => (
    <SidebarMenuItem key={item.path}>
      <SidebarMenuButton asChild tooltip={item.label}>
        <Link to={item.path}>
          <item.icon />
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
  
  
  
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className={state === "expanded" ? "space-x-2 space-y-2.5 p-4" : ""}>
        <Logo 
          size={state === "expanded" ? "lg" : "sm"} 
          align={isMobile ? "center" : (state === "expanded" ? "left" : "center")}
          className={(isMobile || state === "collapsed") ? "mx-auto" : undefined} 
        />
        <CustomUserCard 
          user={me} 
          hideEmail 
          onlyAvatar={!isExpanded && !isMobile}
          className={isExpanded || isMobile ? "h-20 min-h-20" : "h-12 w-12 mx-auto border-none shadow-none bg-transparent hover:scale-110"}
        />
      </SidebarHeader>

<hr />
      <SidebarContent>        
        <SidebarRail   className="flex items-center justify-center  rounded-full   transition ">
            {isExpanded  ? <ChevronLeft size={20}  /> : <ChevronRight size={20} />}
        </SidebarRail>
        <SidebarGroup >
        {menuOptions.map(CustomItem)}
        </SidebarGroup >
      </SidebarContent>
<hr />

      <SidebarFooter >
        <SidebarMenu >
          <SidebarMenuItem >
            <SidebarMenuButton onClick={toggleDarkTheme} tooltip={"Altenar tema"} >
              {isExpanded && <span>Toggle Theme</span>}
             <div className="ml-auto">
                {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
             </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem >
            <SidebarMenuButton onClick={() => { logout() }} tooltip={"Cerrar sesión"} >
              {isExpanded && <span className="text-destructive">Cerrar sesión</span>}             
               <div className="ml-auto"> <LogOut size={20} className="text-destructive" /></div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
