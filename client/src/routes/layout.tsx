import { Outlet } from 'react-router-dom';
import { Header } from 'src/components/layout/header';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="grow">
        <Outlet />
      </div>
    </div>
  );
}

export { Layout };
