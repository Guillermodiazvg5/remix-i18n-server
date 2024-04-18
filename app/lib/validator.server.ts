import { z } from 'zod';
import i18next from '@mitimiti/modules/i18n.server'

export const validationSchema = async (request: Request) => {
  const t = await i18next.getFixedT(request, 'translation');
  const errorValue = t('example')
  console.log('value', errorValue)
  return z.object({
    cityFrom: z.string().min(1, { message: 'Debes seleccionar un origen' }),
    cityTo: z.string().min(1, { message: 'Debes seleccionar un destino' }),
    date: z.string().refine(
      (val) => {
        const inputDate = new Date(Number(val)).setHours(0, 0, 0, 0);
        const currentDate = new Date().setHours(0, 0, 0, 0);
        return inputDate >= currentDate;
      },
      {
        message: 'La fecha debe ser mayor a hoy',
      }
    ),
    seats: z
      .number({
        invalid_type_error: errorValue,
      })
      .refine((val) => val > 0, {
        message: `${t('example')}`
      })
      .refine((val) => val < 5, {
        message: 'Debes seleccionar maximo 4 cupos',
      }),
  });
}
