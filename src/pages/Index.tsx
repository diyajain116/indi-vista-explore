import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import DestinationExplorer from '@/components/DestinationExplorer';
import SmartPlanner from '@/components/SmartPlanner';
import JharkhandTourismDashboard from '@/components/JharkhandTourismDashboard';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import '@/utils/triggerScraping';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <DestinationExplorer />
      <SmartPlanner />
      
      {/* Show authentication status and tourism data */}
      {user ? (
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Welcome back, {user.user_metadata?.display_name || user.email?.split('@')[0]}!
              </h2>
              <p className="text-muted-foreground">
                Explore verified tourism data and plan your perfect Jharkhand adventure.
              </p>
            </div>
          </div>
          <JharkhandTourismDashboard />
        </div>
      ) : (
        <div className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Discover Authentic Jharkhand
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Sign in to access verified tourism data, personalized trip planning, and exclusive local insights.
            </p>
            <Link to="/auth">
              <Button size="lg" className="rounded-xl">
                Get Started - Sign In Now
              </Button>
            </Link>
          </div>
        </div>
      )}
      
      {/* Additional sections */}
      <div className="py-20 text-center bg-secondary/10">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-foreground mb-4">Coming Soon</h3>
          <p className="text-muted-foreground">
            More exciting features: Local Marketplace, Government Analytics, Emergency Support, and AR/VR Experiences
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;