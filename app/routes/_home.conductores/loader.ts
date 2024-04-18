import { json, type LoaderFunctionArgs } from '@remix-run/node';

import { getPostsPassengers } from '@mitimiti/services/post.services';
import { ResponseLoader } from '@mitimiti/types/response';
import { LoaderResponse } from '@mitimiti/types/drivers';
import { mitimitiCookiePref } from '@mitimiti/lib/cookies.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const response = new Response();
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await mitimitiCookiePref.parse(cookieHeader)) || {};

  return json<ResponseLoader<LoaderResponse>>({
    type: 'success',
    errorMessage: null,
    data: {
      postsPassengers: await getPostsPassengers({ request, response }),
      pendingTrip: cookie.pendingTrip ?? null,
    },
  });
}
