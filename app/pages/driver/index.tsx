import { useLoaderData, useActionData } from '@remix-run/react';

import SearchBar from '@mitimiti/components/search-bar';
import SectionPassengerPost from '@mitimiti/components/section-passenger-post';
import SectionInformation from '@mitimiti/components/section-information';
import { loader, action } from '@mitimiti/routes/_home.conductores/route';
import HowItWork from '@mitimiti/components/how-it-work';
import DialogSaveTrip from '@mitimiti/components/ui/modal';
import StepTwoTrip from '@mitimiti/components/trips/step-two-trip';
import { ZodFormattedError } from 'zod';
import { PendingTrip } from '@mitimiti/types/trip';

const Driver = () => {
  const actionData = useActionData<typeof action>();
  const { data, type, errorMessage } = useLoaderData<typeof loader>();

  if (type === 'error') {
    return <div>Error, {errorMessage}</div>;
  }

  const tripSummary =
    data?.pendingTrip ?? actionData?.data?.pendingTrip ?? null;

  return (
    <>
      <SearchBar
        isHome={true}
        pendingTrip={tripSummary}
        intentSearch={'publish-trip-step-one'}
        errors={actionData?.errors as ZodFormattedError<PendingTrip, string>}
      />
      <div className="h-[50px]"></div>
      {data?.postsPassengers && data?.postsPassengers.length > 0 && (
        <SectionPassengerPost postsPassenger={data?.postsPassengers} />
      )}
      <HowItWork />
      <SectionInformation />
      <DialogSaveTrip open={tripSummary !== null} onOpenChange={() => {}}>
        <StepTwoTrip intentSearch={'publish-trip-step-two'} />
      </DialogSaveTrip>
    </>
  );
};

export default Driver;
