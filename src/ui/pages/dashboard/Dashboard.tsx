import MainProfileCard from '@/ui/components/user/MainProfileCard';
import { Skeleton } from '@/ui/components/ui/skeleton';
import { useMe } from '@/ui/hooks/user/useMe';


const Dashboard = () => {

  const {me, loading,} = useMe();
 

  return (  <>
      {loading? <Skeleton />:<div >
        <div className='gap-6'>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          ¡Bienvenido, {me.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gestiona tus proyectos y horas de trabajo
        </p>
      </div>
        <MainProfileCard {...me} />
      </div>}
</>
  


  
  
)};

export default Dashboard;