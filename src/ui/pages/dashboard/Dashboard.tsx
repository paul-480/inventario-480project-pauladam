import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí iría la lógica de logout
    navigate('/login');
  };

   type Estado = 'activo' | 'completado';

  const menuItems = [
    { id: 1, nombre: 'Dashboard', icono: '📊', ruta: '/' },
    { id: 2, nombre: 'Proyectos', icono: '📁', ruta: '/proyectos' },
    { id: 3, nombre: 'Horas', icono: '⏰', ruta: '/horas' },
    { id: 4, nombre: 'Usuarios', icono: '👥', ruta: '/usuarios' },
  ];

  const proyectos = [
    { id: 1, nombre: 'App Móvil', progreso: 75, estado: 'activo' as Estado },
    { id: 2, nombre: 'Web Dashboard', progreso: 45, estado: 'activo' as Estado },
    { id: 3, nombre: 'API Backend', progreso: 90, estado: 'completado' as Estado },
  ];

  const horasRecientes = [
    { id: 1, proyecto: 'App Móvil', horas: 4, fecha: '2026-04-24' },
    { id: 2, proyecto: 'Web Dashboard', horas: 3, fecha: '2026-04-23' },
    { id: 3, proyecto: 'API Backend', horas: 5, fecha: '2026-04-22' },
  ];

  return(
    <div>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.logo}>📊 MiApp</h1>
          <div style={styles.userInfo}>
            <span style={styles.userName}>Juan Pérez</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Menú de navegación */}
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.ruta)}
              style={styles.navItem}
            >
              <span style={styles.navIcon}>{item.icono}</span>
              <span>{item.nombre}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Contenido principal */}
      <main style={styles.main}>
        <div style={styles.welcomeSection}>
          <h2 style={styles.welcomeTitle}>
            ¡Bienvenido de vuelta, Juan! 👋
          </h2>
          <p style={styles.welcomeText}>
            Aquí tienes un resumen de tu actividad reciente
          </p>
        </div>

        {/* Tarjetas de estadísticas */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📊</div>
            <div>
              <h3 style={styles.statNumber}>12</h3>
              <p style={styles.statLabel}>Proyectos activos</p>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>⏰</div>
            <div>
              <h3 style={styles.statNumber}>48</h3>
              <p style={styles.statLabel}>Horas este mes</p>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>👥</div>
            <div>
              <h3 style={styles.statNumber}>8</h3>
              <p style={styles.statLabel}>Miembros del equipo</p>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>✅</div>
            <div>
              <h3 style={styles.statNumber}>23</h3>
              <p style={styles.statLabel}>Tareas completadas</p>
            </div>
          </div>
        </div>

        {/* Proyectos recientes */}
        <div style={styles.sectionCard}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>📁 Tus proyectos</h3>
            <button
              onClick={() => navigate('/proyectos')}
              style={styles.viewAllBtn}
            >
              Ver todos →
            </button>
          </div>
          <div >
            {proyectos.map((proyecto) => (
              <div key={proyecto.id} style={styles.projectItem}>
                <div style={styles.projectInfo}>
                  <h4 style={styles.projectName}>{proyecto.nombre}</h4>
                  <div style={styles.progressBar}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${proyecto.progreso}%`,
                      }}
                    />
                  </div>
                  <span style={styles.estadoBadge(proyecto.estado)}>
                    {proyecto.estado}
                  </span>
                </div>
                <div style={styles.progressText}>{proyecto.progreso}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Horas recientes */}
        <div style={styles.sectionCard}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>⏰ Últimas horas</h3>
            <button
              onClick={() => navigate('/horas')}
              style={styles.viewAllBtn}
            >
              Ver todas →
            </button>
          </div>
          <table >
            <thead>
              <tr>
                <th >Proyecto</th>
                <th >Horas</th>
                <th >Fecha</th>
              </tr>
            </thead>
            <tbody>
              {horasRecientes.map((hora) => (
                <tr key={hora.id}>
                  <td style={styles.td}>{hora.proyecto}</td>
                  <td style={styles.td}>{hora.horas}h</td>
                  <td style={styles.td}>{hora.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botones de acción rápida */}
        <div style={styles.quickActions}>
          <button
            onClick={() => navigate('/proyectos/nuevo')}
            style={styles.actionBtn}
          >
            ➕ Nuevo Proyecto
          </button>
          <button
            onClick={() => navigate('/horas/nuevo')}
            style={styles.actionBtn}
          >
            ⏰ Registrar Horas
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2026 MiApp - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

// Estilos en línea (CSS plano)
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e0e0e0',
    padding: '1rem 0',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0,
    color: '#333',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  userName: {
    color: '#666',
  },
  logoutBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
  },
  nav: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e0e0e0',
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    gap: '1rem',
  },
  navItem: {
    padding: '0.75rem 1rem',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  navIcon: {
    fontSize: '1.25rem',
  },
  main: {
    flex: 1,
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
    width: '100%',
  },
  welcomeSection: {
    marginBottom: '2rem',
  },
  welcomeTitle: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    margin: 0,
    color: '#333',
  },
  welcomeText: {
    color: '#666',
    marginTop: '0.5rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  statCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  statIcon: {
    fontSize: '2rem',
  },
  statNumber: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0,
    color: '#333',
  },
  statLabel: {
    color: '#666',
    margin: 0,
    fontSize: '0.875rem',
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    margin: 0,
    color: '#333',
  },
  viewAllBtn: {
    backgroundColor: 'transparent',
    color: '#3b82f6',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
  },
  projectsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  projectItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: '1rem',
    fontWeight: '500',
    margin: '0 0 0.5rem 0',
  },
  progressBar: {
    height: '0.5rem',
    backgroundColor: '#e5e7eb',
    borderRadius: '0.25rem',
    overflow: 'hidden',
    marginBottom: '0.5rem',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: '0.25rem',
    transition: 'width 0.3s ease',
  },
  progressText: {
    fontSize: '0.875rem',
    fontWeight: '600',
  },
  estadoBadge: (estado: 'activo' | 'completado') => ({
    display: 'inline-block',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    fontSize: '0.75rem',
    fontWeight: '500',
    backgroundColor: estado === 'activo' ? '#dbeafe' : '#d1fae5',
    color: estado === 'activo' ? '#1e40af' : '#065f46',
  }),
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '0.75rem',
    borderBottom: '1px solid #e5e7eb',
    color: '#6b7280',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  td: {
    padding: '0.75rem',
    borderBottom: '1px solid #e5e7eb',
    color: '#374151',
    fontSize: '0.875rem',
  },
  quickActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  actionBtn: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  footer: {
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e0e0e0',
    padding: '1rem 0',
    marginTop: 'auto',
  },
  footerText: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    textAlign: 'center',
    color: '#666',
    fontSize: '0.875rem',
  },
};

export default Dashboard;