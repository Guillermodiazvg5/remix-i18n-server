import ListTripsWrapper from '@mitimiti/components/list-trips-wrapper';
import { CardTrip } from '@mitimiti/components/ui/card-trip';
import { PendingTrip } from '@mitimiti/types/trip';
import { format } from '@formkit/tempo';
import { Button } from '@mitimiti/components/ui/button';
import { SummaryTrip } from '@mitimiti/components/ui/summary-trip';
import { useTranslation } from '@mitimiti/hooks/use-translation';

type Props = {
  title: string;
  subtitle: string;
  pendingTrip?: PendingTrip | null;
};

const NoTrips: React.FC<Props> = ({ title, subtitle, pendingTrip }) => {
  const { t } = useTranslation();
  const { publishSearch } = t('passenger-post', {
    returnObjects: true,
  }) as {
    publishSearch: {
      publishButton: string;
    };
  };
  return (
    <ListTripsWrapper title={title} subtitle={subtitle}>
      {pendingTrip && (
        <CardTrip
          titleText={format(
            new Date(Number(pendingTrip.date)),
            { date: 'full' },
            'es'
          )}
          renderFotter={() => (
            <div>
              <Button className="w-full flex-1 first-letter:capitalize mb-2">
                {publishSearch.publishButton}
              </Button>
            </div>
          )}
        >
          <SummaryTrip
            startLocation={pendingTrip.cityFrom}
            finishLocation={pendingTrip.cityTo}
            numberOfPassengers={`${pendingTrip.seats} persona`}
          />
        </CardTrip>
      )}
    </ListTripsWrapper>
  );
};

export default NoTrips;
