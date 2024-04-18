import { FC, PropsWithChildren } from 'react';
import { Form } from '@remix-run/react';

import SearchInput from '@mitimiti/components/input-search';
import { InputDatePicker } from '@mitimiti/components/input-date-picker';
import { useTranslation } from '@mitimiti/hooks/use-translation';
import { Button } from '@mitimiti/components/ui/button';
import { ChildrenWithLabel } from '@mitimiti/components/ui/children-with-label';
import { InputSelectSeats } from '@mitimiti/components/input-select-seats';
import { PendingTrip } from '@mitimiti/types/trip';
import Errors from './ui/form/errors';
import { ZodFormattedError } from 'zod';

type Props = {
  readonly isHome: boolean;
  readonly intentSearch: string;
  readonly pendingTrip?: PendingTrip | null;
  readonly typeUser?: 'driver' | 'passenger';
  readonly errors?: ZodFormattedError<PendingTrip, string>;
};

const SearchBar: FC<PropsWithChildren<Props>> = ({
  isHome = true,
  typeUser = 'driver',
  pendingTrip = null,
  intentSearch,
  errors,
}) => {
  const { t } = useTranslation();
  const { searchBar } = t('home', { returnObjects: true }) as {
    searchBar: {
      labelCityFrom: string;
      labelCityTo: string;
      labelDatePicker: string;
      labelSelectSeats: string;
      labelSelectAmountPassengers: string;
      dialogPlaceHolderFrom: string;
      dialogPlaceHolderTo: string;
      selectOptions: [];
      btnTextPublishTrip: string;
      btnTextSearchTrip: string;
    };
  };

  return (
    <div
      className={`md:container md:mx-auto z-1 relative ${
        isHome ? 'md:-mt-14 -mt-20' : ''
      }`}
    >
      <Form
        method="post"
        className="grid items-center justify-center grid-cols-1 md:grid-cols-5 gap-3 bg-white px-6 pb-8 pt-3 rounded-xl shadow m-2 md:m-0"
      >
        <div className="h-full">
          <SearchInput
            label={searchBar.labelCityFrom}
            inputPlaceHolder={searchBar.dialogPlaceHolderFrom}
            dialogPlaceHolder={searchBar.dialogPlaceHolderFrom}
            nameInput="city-from"
            defaultValue={pendingTrip?.cityFrom ?? ''}
          />
          <Errors errors={errors?.cityFrom?._errors || []} />
        </div>
        <div className="h-full">
          <SearchInput
            label={searchBar.labelCityTo}
            inputPlaceHolder={searchBar.dialogPlaceHolderTo}
            dialogPlaceHolder={searchBar.dialogPlaceHolderTo}
            nameInput="city-to"
            defaultValue={pendingTrip?.cityTo ?? ''}
          />
          <Errors errors={errors?.cityTo?._errors || []} />
        </div>
        <div className="h-full">
          <ChildrenWithLabel
            htmlFor="btn-travel-date"
            textLabel={searchBar.labelDatePicker}
          >
            <InputDatePicker
              buttonId="btn-travel-date"
              defaultDate={pendingTrip?.date ?? ''}
            />
          </ChildrenWithLabel>
          <Errors errors={errors?.date?._errors || []} />
        </div>
        <div className="h-full">
          <ChildrenWithLabel
            htmlFor="select-seats-required"
            textLabel={
              typeUser === 'driver'
                ? searchBar.labelSelectSeats
                : searchBar.labelSelectAmountPassengers
            }
          >
            <InputSelectSeats
              selectOptions={searchBar.selectOptions}
              defaultValue={pendingTrip?.seats ?? ''}
            />
          </ChildrenWithLabel>
          <Errors errors={errors?.seats?._errors || []} />
        </div>
        <div className="flex items-end h-full">
          <Button
            name="intent"
            value={intentSearch}
            type="submit"
            className="w-full"
            variant={'default'}
          >
            {typeUser === 'driver'
              ? searchBar.btnTextPublishTrip
              : searchBar.btnTextSearchTrip}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SearchBar;
