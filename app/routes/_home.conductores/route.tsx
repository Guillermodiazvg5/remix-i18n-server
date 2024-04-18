import { type MetaFunction } from '@remix-run/node';

import DriverPage from '@mitimiti/pages/driver';
import { loader } from '@mitimiti/routes/_home.conductores/loader';
import { action } from '@mitimiti/routes/_home.conductores/action';
import { isRouteErrorResponse, useRouteError } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'MitiMiti App' },
    { name: 'Conductor', content: 'Mitimiti App' },
  ];
};

export { loader };

export { action };

export default function Driver() {
  return <DriverPage />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
