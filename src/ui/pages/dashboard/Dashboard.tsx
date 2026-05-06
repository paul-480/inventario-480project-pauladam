import { Skeleton } from '@/ui/components/ui/skeleton';
import { useMe } from '@/ui/hooks/user/useMe';


const Dashboard = () => {

  const {me, loading,} = useMe();
 

  return (  
 <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {loading? <Skeleton className="h-10 w-1/3 mb-2" />:<div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          ¡Bienvenido, {me.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gestiona tus proyectos y horas de trabajo
        </p>
      </div>}
 </div>
  


  
  
)};

export default Dashboard;