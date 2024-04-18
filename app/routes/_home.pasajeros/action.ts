import { ActionFunctionArgs } from '@remix-run/node';
import { searchTrip } from './helpers';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData: FormData = await request.formData();
  const intent = formData.get('intent');

  switch (intent) {
    case 'passenger-search-bar':
      return await searchTrip(request);
  }
};
