import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="relative grid h-screen lg:grid-cols-2">
      <div className="hidden h-full flex-col p-8 bg-[url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80))] bg-cover lg:flex">
        <span className="block text-lg font-medium text-white">
          Altametrics
        </span>

        <div className="mt-auto">
          <blockquote className="space-y-2 text-white">
            <p className="text-lg">
              &ldquo;Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur, eveniet in. Asperiores impedit voluptates, doloremque
              illo nesciunt quibusdam exercitationem blanditiis tempora minima
              doloribus possimus esse magnam facere dolor, eum iure?&rdquo;
            </p>
            <footer className="text-sm">– Full Name, Position</footer>
          </blockquote>
        </div>
      </div>

      <div className="p-4 lg:p-8">
        <div className="mx-auto max-w-sm flex h-full items-center justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export { AuthLayout };
