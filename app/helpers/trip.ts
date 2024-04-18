import { PendingTrip } from '@mitimiti/types/trip';

// Getting the form data from the request
export const getObjectFromSearchParams = (url: string): PendingTrip => {
  // Getting the form data from the request
  const { searchParams } = new URL(url);

  const cityFrom = (searchParams.get('city-from') as string) ?? null;
  const cityTo = (searchParams.get('city-to') as string) ?? null;
  const date = (searchParams.get('date') as string) ?? null;
  const seats = Number(searchParams.get('seats')) ?? 0;

  return {
    cityFrom,
    cityTo,
    date,
    seats,
  };
};
