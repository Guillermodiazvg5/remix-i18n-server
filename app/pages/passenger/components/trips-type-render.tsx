import { PendingTrip, Trip } from '@mitimiti/types/trip';
import ListTrips from './list-trips';
import NoTrips from './no-trips';
import { useTranslation } from '@mitimiti/hooks/use-translation';

type Props = {
  type: 'MATCH' | 'NEXT_TRIPS' | 'NO_TRIPS' | 'LAST_TRIPS';
  trips: Trip[];
  pendingTrip?: PendingTrip | null;
};

const TripsTypeRender: React.FC<Props> = ({ type, trips, pendingTrip }) => {
  const { t } = useTranslation();
  const { match, nextTrips, noTrips, lastTrips } = t('passenger-post', {
    returnObjects: true,
  }) as {
    match: {
      title: string;
      matches: string;
    };
    nextTrips: {
      title: string;
      subtitle: string;
    };
    noTrips: {
      title: string;
      subtitle: string;
    };
    lastTrips: {
      title: string;
    };
  };

  if (!trips) {
    return null;
  }

  switch (type) {
    case 'MATCH': {
      if (trips.length === 1) {
        return (
          <ListTrips
            className={
              'justify-center grid-cols-1 md:grid-cols-1 lg:grid-cols-1 items-center'
            }
            title={match.title}
            trips={trips}
          />
        );
      }
      return <ListTrips title={match.matches} trips={trips} />;
    }
    case 'NEXT_TRIPS': {
      return (
        <ListTrips
          title={nextTrips.title}
          subtitle={nextTrips.subtitle}
          trips={trips}
          isConfirmeTrip
        />
      );
    }
    case 'NO_TRIPS': {
      return (
        <NoTrips
          pendingTrip={pendingTrip}
          title={noTrips.title}
          subtitle={noTrips.subtitle}
        />
      );
    }
    case 'LAST_TRIPS': {
      return <ListTrips title={lastTrips.title} trips={trips} isConfirmeTrip />;
    }
    default: {
      return null;
    }
  }
};

export default TripsTypeRender;
