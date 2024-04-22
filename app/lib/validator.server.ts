import { z } from 'zod';
import i18next from '@mitimiti/modules/i18n.server'

export const validationSchema = async (request: Request) => {
  const t = await i18next.getFixedT(request, 'translation');
  const errorValue = t('validator')
  console.log('value', errorValue)

  return z.object({
    cityFrom: z.string().min(1, { message: `${t('validator.selectOrigin')}` }),
    cityTo: z.string().min(1, { message: `${t('validator.selectDestination')}` }),
    date: z.string().refine(
      (val) => {
        const inputDate = new Date(Number(val)).setHours(0, 0, 0, 0);
        const currentDate = new Date().setHours(0, 0, 0, 0);
        return inputDate >= currentDate;
      },
      {
        message: `${t('validator.selectDate')}`
      }
    ),
    seats: z
      .number({
        invalid_type_error: errorValue,
      })
      .refine((val) => val > 0, {
        message: `${t('validator.minimumSeating')}`
      })
      .refine((val) => val < 5, {
        message: `${t('validator.maximumSeating')}`
      }),
  });
}
