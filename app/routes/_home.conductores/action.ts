import { ActionFunctionArgs } from '@remix-run/node';
import { publishTripStepTwo, publishTripStepOne } from './helpers';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData: FormData = await request.formData();
  const intent = formData.get('intent');

  switch (intent) {
    case 'publish-trip-step-one':
      return await publishTripStepOne(request);
    case 'publish-trip-step-two':
      return await publishTripStepTwo(request, formData);
  }
};
