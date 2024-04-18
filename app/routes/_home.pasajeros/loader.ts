import { TypedResponse, json, type LoaderFunctionArgs } from '@remix-run/node';

import { ResponseLoader } from '@mitimiti/types/response';
import { mitimitiCookiePref } from '@mitimiti/lib/cookies.server';
import { getTrips } from '@mitimiti/services/trip.services';
import { PendingTrip, Trip } from '@mitimiti/types/trip';
import i18next from '@mitimiti/modules/i18n.server'

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<
  TypedResponse<
    ResponseLoader<{ trips: Trip[]; pendingTrip: PendingTrip | null }>
  >
> {
  const t = await i18next.getFixedT(request);
  const value = t('greeting-home')
  console.log('value', value)
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await mitimitiCookiePref.parse(cookieHeader)) || {};

  const lastTrips = await getTrips(request, { limit: 3 });

  return json({
    type: 'success',
    errorMessage: null,
    data: {
      trips: lastTrips,
      pendingTrip: cookie.pendingTrip ?? null,
    },
  });
}
