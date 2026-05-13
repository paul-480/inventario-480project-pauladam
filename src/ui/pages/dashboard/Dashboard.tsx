import MainProfileCard from '@/ui/components/user/MainProfileCard';
import { Skeleton } from '@/ui/components/ui/skeleton';
import { useMe } from '@/ui/hooks/user/useMe';
import { useProjects } from '@/ui/hooks/project/useProjects';
import { columns } from '@/ui/components/projects/table/columns';
import { DataTable } from '@/ui/components/projects/table/data-table';

const Dashboard = () => {
  const { me, loading } = useMe();
  const { myProjects, loading: projectsLoading } = useProjects();

  if (loading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton className="h-12 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-40 col-span-2" />
          <Skeleton className="h-40" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2">
            ¡Bienvenido, <span className="text-primary">{me?.name}</span>!
          </h1>
          <p className="text-muted-foreground text-lg">
            Aquí tienes un resumen de tu actividad y proyectos.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <MainProfileCard user={me} />
        </div>
        <div className="space-y-4">
          <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Estadísticas Rápidas
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <span className="text-sm font-medium text-muted-foreground">Proyectos Activos</span>
                <span className="text-2xl font-bold text-emerald-600">
                  {myProjects.filter(p => p.isActive).length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <span className="text-sm font-medium text-muted-foreground">Total Proyectos</span>
                <span className="text-2xl font-bold">{myProjects.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Mis Proyectos
          </h2>
        </div>
        
        {projectsLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
             <DataTable columns={columns} data={myProjects} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;