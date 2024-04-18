import { cn } from '@mitimiti/lib/utils';
import { PropsWithChildren } from 'react';
import { H3 } from './ui/typography/h3';
import { H4 } from './ui/typography/h4';

type Props = {
  title: string;
  subtitle?: string;
  className?: string;
};

const ListTripsWrapper: React.FC<PropsWithChildren<Props>> = ({
  children,
  title,
  subtitle = '',
  className,
}) => {
  return (
    <section className="container mb-8">
      <H3 className="text-center text-[38px] text-blue-900 font-bold my-5">
        {title}
      </H3>
      <H4 className="text-center text-[18px] text-gray-900 font-bold my-2">
        {subtitle}
      </H4>
      <article
        data-testid="posts-passenger"
        className={cn('flex justify-center flex-wrap gap-6', className)}
      >
        {children}
      </article>
    </section>
  );
};

export default ListTripsWrapper;
