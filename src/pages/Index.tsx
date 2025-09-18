import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import DestinationExplorer from '@/components/DestinationExplorer';
import SmartPlanner from '@/components/SmartPlanner';
import SimpleTourismData from '@/components/SimpleTourismData';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <DestinationExplorer />
      <SmartPlanner />
      <SimpleTourismData />
      
      {/* Additional sections will be added in future iterations */}
      <div className="py-20 text-center">
        <p className="text-muted-foreground">
          More exciting features coming soon: Local Marketplace, Government Analytics, Emergency Support, and AR/VR Experiences
        </p>
      </div>
    </div>
  );
};

export default Index;