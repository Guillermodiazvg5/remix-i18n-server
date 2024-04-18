import type { MetaFunction } from '@remix-run/node';

import SectionInformation from '@mitimiti/components/section-information';
import HowItWork from '@mitimiti/components/how-it-work';
export const meta: MetaFunction = () => {
  return [
    { title: 'MitiMiti App' },
    { name: 'Comparte gastos entre vehiculos', content: 'Mitimit App' },
  ];
};

export default function Index() {
  return (
    <>
      <div className="h-[50px]"></div>
      <HowItWork />
      <SectionInformation />
    </>
  );
}
