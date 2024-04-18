import SectionInformation from '@mitimiti/components/section-information';
import SearchBar from '@mitimiti/components/search-bar';
import { action } from '@mitimiti/routes/_home.pasajeros/action';
import { useActionData, useLoaderData } from '@remix-run/react';
import { ZodFormattedError } from 'zod';
import { PendingTrip } from '@mitimiti/types/trip';
import HowItWork from '@mitimiti/components/how-it-work';
import { loader } from '@mitimiti/routes/_home.pasajeros/loader';
import TripsTypeRender from './components/trips-type-render';

const Passenger = () => {
  const actionData = useActionData<typeof action>();
  const { data, type, errorMessage } = useLoaderData<typeof loader>();

  if (type === 'error') {
    return <div>{errorMessage}</div>;
  }

  return (
    <>
      <SearchBar
        isHome={true}
        pendingTrip={actionData?.data?.pendingTrip ?? null}
        intentSearch={'passenger-search-bar'}
        typeUser="passenger"
        errors={actionData?.errors as ZodFormattedError<PendingTrip, string>}
      />
      <div className="h-[50px]"></div>
      <TripsTypeRender
        type={actionData?.data?.search?.type || 'LAST_TRIPS'}
        trips={actionData?.data?.search?.trips || data.trips}
        pendingTrip={actionData?.data?.pendingTrip}
      />
      <HowItWork />
      <SectionInformation />
    </>
  );
};

export default Passenger;
