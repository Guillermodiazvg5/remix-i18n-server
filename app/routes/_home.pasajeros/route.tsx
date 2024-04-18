import type { MetaFunction } from '@remix-run/node';

import PassengerPage from '@mitimiti/pages/passenger';
import { action } from '@mitimiti/routes/_home.pasajeros/action';
import { loader } from '@mitimiti/routes/_home.pasajeros/loader';

export const meta: MetaFunction = () => {
  return [
    { title: 'MitiMiti App' },
    { name: 'Comparte gastos entre vehiculos', content: 'Mitimit App' },
  ];
};

export { loader };
export { action };

export default function Index() {
  return <PassengerPage />;
}
