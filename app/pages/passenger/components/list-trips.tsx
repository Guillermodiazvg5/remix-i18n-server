import ListTripsWrapper from '@mitimiti/components/list-trips-wrapper';
import { CardTrip } from '@mitimiti/components/ui/card-trip';
import { Trip } from '@mitimiti/types/trip';
import { format } from '@formkit/tempo';
import { Avatar } from '@mitimiti/components/ui/avatar';
import { Button } from '@mitimiti/components/ui/button';
import { SummaryTrip } from '@mitimiti/components/ui/summary-trip';
import { P } from '@mitimiti/components/ui/typography/p';
import { useTranslation } from '@mitimiti/hooks/use-translation';

type Props = {
  title: string;
  subtitle?: string;
  trips: Trip[];
  className?: string;
  isConfirmeTrip?: boolean;
};
const ListTrips: React.FC<Props> = ({
  title,
  subtitle,
  trips,
  className,
  isConfirmeTrip = false,
}) => {
  const { t } = useTranslation();
  const { confirm, booking } = t('passenger-post', {
    returnObjects: true,
  }) as {
    confirm: {
      message: string;
    };
    booking: {
      requestButton: string;
      sentMessageButton: string;
    };
  };
  return (
    <>
      <ListTripsWrapper title={title} subtitle={subtitle} className={className}>
        {trips.map(({ id, date, user, trip }) => (
          <CardTrip
            data-testid="post-passenger"
            key={id}
            titleText={format(date, { date: 'full' })}
            renderHeader={() => (
              <div className="flex items-center gap-2">
                {user && (
                  <>
                    <Avatar
                      src={user?.avatar || ''}
                      alt={`Avatar de ${user.name}`}
                      fallback="JA"
                      classNameWrapper=""
                      classNameAvatar=""
                      classNameFallback=""
                    />
                    <h6 className="uppercase text-sm font-bold">{user.name}</h6>
                  </>
                )}
              </div>
            )}
            renderFotter={() => (
              <div>
                <Button className="w-full flex-1 first-letter:capitalize mb-2">
                  {booking.requestButton}
                </Button>
                <Button
                  variant="outline"
                  className="w-full first-letter:capitalize"
                >
                  {booking.sentMessageButton}
                </Button>
              </div>
            )}
          >
            <SummaryTrip
              startLocation={trip.startLocation}
              finishLocation={trip.finishLocation}
              hourStart={format(date, { time: 'short' })}
              hourFinish={''}
              numberOfPassengers={`${trip.numberOfPassengers} pasajeros`}
            />
          </CardTrip>
        ))}
      </ListTripsWrapper>
      {isConfirmeTrip && (
        <div className="container">
          <P className="w-full text-center text-gray-400 mb-20 text-[14px]">
            {confirm.message}
          </P>
        </div>
      )}
    </>
  );
};

export default ListTrips;
