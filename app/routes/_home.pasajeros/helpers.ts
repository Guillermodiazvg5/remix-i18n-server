import { TypedResponse, json } from '@remix-run/node';

import { mitimitiCookiePref } from '@mitimiti/lib/cookies.server';
import { validationSchema } from '@mitimiti/lib/validator.server';
import { ResponseAction } from '@mitimiti/types/response';
import { PendingTrip, Trip } from '@mitimiti/types/trip';
import { getObjectFromSearchParams } from '@mitimiti/helpers/trip';
import { getTripDateRange } from '@mitimiti/services/trip.services';
import { format, dayStart, dayEnd, addDay } from '@formkit/tempo';

type searchTrip = {
  pendingTrip: PendingTrip;
  search: {
    type: 'MATCH' | 'NEXT_TRIPS' | 'NO_TRIPS';
    trips: Trip[];
  };
};

export const searchTrip = async (
  request: Request
): Promise<TypedResponse<ResponseAction<searchTrip | null>>> => {
  const pendingTrip = getObjectFromSearchParams(request.url);

  // Validating the form with the zod schema
  const tripSchema = await validationSchema(request)
  const validatedForm = tripSchema.safeParse(pendingTrip);

  
  if (!validatedForm.success) {
    console.log('validatedForm', validatedForm?.error)
    return json<ResponseAction<searchTrip | null>>({
      result: { success: false, message: 'error' },
      data: null,
      errors: validatedForm?.error?.format(),
    });
  }

  // Saving the pending trip in the cookie
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await mitimitiCookiePref.parse(cookieHeader)) || {};

  const language = 'es';
  const temporalDate = format(
    new Date(Number(pendingTrip.date)),
    'YYYY-MM-DD',
    language
  );

  // search trip same day to match
  const tripsMatch = await getTripDateRange(request, {
    fromTrip: pendingTrip.cityFrom,
    toTrip: pendingTrip.cityTo,
    startDate: `${dayStart(temporalDate).toISOString()}`,
    endDate: `${dayEnd(temporalDate).toISOString()}`,
  });

  if (tripsMatch.length > 0) {
    return json<ResponseAction<searchTrip | null>>(
      {
        result: { success: true, message: 'ok' },
        data: { pendingTrip, search: { type: 'MATCH', trips: tripsMatch } },
        errors: null,
      },
      {
        headers: { 'Set-Cookie': await mitimitiCookiePref.serialize(cookie) },
      }
    );
  }

  const NEXT_DAYS = 5;
  const nextDays = addDay(temporalDate, NEXT_DAYS);

  // search trip next days
  const trips = await getTripDateRange(request, {
    fromTrip: pendingTrip.cityFrom,
    toTrip: pendingTrip.cityTo,
    startDate: `${dayStart(temporalDate).toISOString()}`,
    endDate: `${dayEnd(nextDays).toISOString()}`,
  });

  if (trips.length > 0) {
    return json<ResponseAction<searchTrip | null>>(
      {
        result: { success: true, message: 'ok' },
        data: { pendingTrip, search: { type: 'NEXT_TRIPS', trips } },
        errors: null,
      },
      {
        headers: { 'Set-Cookie': await mitimitiCookiePref.serialize(cookie) },
      }
    );
  }

  return json<ResponseAction<searchTrip | null>>(
    {
      result: { success: true, message: 'ok' },
      data: { pendingTrip, search: { type: 'NO_TRIPS', trips: [] } },
      errors: null,
    },
    {
      headers: { 'Set-Cookie': await mitimitiCookiePref.serialize(cookie) },
    }
  );
};
