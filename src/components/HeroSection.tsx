import React from 'react';
import { motion } from 'framer-motion';
import { Search, Star, Users, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import heroImage from '@/assets/hero-tourism.jpg';

const HeroSection = () => {
  const stats = [
    { icon: MapPin, label: 'Destinations', value: '500+', color: 'text-primary' },
    { icon: Users, label: 'Happy Travelers', value: '2M+', color: 'text-royal' },
    { icon: Star, label: 'Average Rating', value: '4.9', color: 'text-accent' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Indian Heritage Tourism"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 cultural-pattern"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-sm font-medium text-primary-glow border border-primary/30 mb-4">
                  🇮🇳 Incredible India Awaits
                </span>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Discover
                  <span className="bg-gradient-to-r from-primary-glow to-accent bg-clip-text text-transparent"> Bharat</span>
                  <br />
                  Like Never Before
                </h1>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-gray-200 max-w-2xl leading-relaxed"
              >
                Experience India's rich heritage with AI-powered planning, 360° previews, 
                and seamless booking. From royal palaces to spiritual journeys - your perfect 
                Indian adventure starts here.
              </motion.p>

              {/* Search Interface */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-200 mb-2">Where to?</label>
                    <Input
                      placeholder="Rajasthan, Goa, Kerala..."
                      className="bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:bg-white/30"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-200 mb-2">When?</label>
                    <Input
                      type="date"
                      className="bg-white/20 border-white/30 text-white focus:bg-white/30"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button className="btn-heritage px-8 py-3 text-lg font-semibold whitespace-nowrap">
                      <Search className="w-5 h-5 mr-2" />
                      Explore Now
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-wrap gap-8"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-white/10 backdrop-blur-sm ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-gray-300">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Featured Destinations */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6"
          >
            <Card className="card-heritage bg-white/10 backdrop-blur-lg border-white/20 text-white">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">🔥 Trending Now</h3>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    View All <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: 'Golden Triangle', price: '₹15,999', rating: 4.9, image: '🏰' },
                    { name: 'Kerala Backwaters', price: '₹12,499', rating: 4.8, image: '🌴' },
                    { name: 'Spiritual Varanasi', price: '₹8,999', rating: 4.7, image: '🕉️' }
                  ].map((dest, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center space-x-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <div className="text-2xl">{dest.image}</div>
                      <div className="flex-1">
                        <h4 className="font-medium">{dest.name}</h4>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="text-sm text-gray-300">{dest.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-primary-glow">{dest.price}</div>
                        <div className="text-xs text-gray-400">per person</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>

            {/* AI Assistant Preview */}
            <Card className="card-heritage bg-gradient-to-br from-royal/20 to-primary/20 backdrop-blur-lg border-white/20 text-white">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-royal flex items-center justify-center pulse-heritage">
                    <span className="text-sm font-bold">AI</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">यात्रा AI Assistant</h4>
                    <p className="text-xs text-gray-300">Your personal travel guide</p>
                  </div>
                </div>
                <p className="text-sm text-gray-200 bg-white/10 rounded-lg p-3 border border-white/20">
                  "Based on your preferences for heritage sites and adventure, I recommend 
                  a 7-day Rajasthan circuit with Jaipur, Udaipur, and Jodhpur. 
                  Perfect weather window: Oct 15-22. Shall I create your itinerary?"
                </p>
                <Button 
                  size="sm" 
                  className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white border border-white/30"
                >
                  Start Planning with AI
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm">Discover More</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;