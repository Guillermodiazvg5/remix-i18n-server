import Footer from '@mitimiti/components/footer';
import Header from '@mitimiti/components/header';
import SubscriptionForm from '@mitimiti/components/subscribe-form';
import { useTranslation } from '@mitimiti/hooks/use-translation';
import { Outlet } from '@remix-run/react';

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header title={t('greeting-home') as string} />
      <Outlet />
      <Footer>
        <SubscriptionForm />
      </Footer>
    </>
  );
};

export default Home;
