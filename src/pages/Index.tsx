import { useState } from 'react';
import { Layout } from '../components/Layout';
import { Router } from '../components/Router';

const Index = () => {
  const [activeRoute, setActiveRoute] = useState('dashboard');

  const handleRouteChange = (route: string) => {
    setActiveRoute(route);
  };

  return (
    <Layout activeRoute={activeRoute} onRouteChange={handleRouteChange}>
      <Router activeRoute={activeRoute} />
    </Layout>
  );
};

export default Index;
