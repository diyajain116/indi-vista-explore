import React from 'react';
import { motion } from 'framer-motion';
import { Search, Star, Users, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import heroImage from '@/assets/jharkhand-hero.jpg';

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
          alt="Jharkhand Tourism Heritage"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 cultural-pattern"></div>
      </div>

      {/* Enhanced Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-white space-y-10"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
              >
                <motion.span 
                  className="inline-block px-6 py-3 bg-gradient-to-r from-primary/30 to-accent/30 backdrop-blur-lg rounded-full text-sm font-semibold text-white border border-white/20 mb-6 sparkle-effect"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  🌿 वनांचल की यात्रा - Vananchal Ki Yatra
                </motion.span>
                <motion.h1 
                  className="text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <motion.span
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  >
                    Explore
                  </motion.span>
                  <br />
                  <motion.span 
                    className="bg-gradient-to-r from-primary-glow via-accent to-royal bg-clip-text text-transparent"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                  >
                    Jharkhand
                  </motion.span>
                  <br />
                  <motion.span
                    className="text-white/90"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                  >
                    Nature's Paradise
                  </motion.span>
                </motion.h1>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="text-xl lg:text-2xl text-white/90 max-w-2xl leading-relaxed font-light"
              >
                Discover Jharkhand's pristine waterfalls, rich tribal culture, ancient temples, 
                and vibrant festivals. From the steel city of Jamshedpur to the spiritual Deoghar - 
                your authentic Jharkhand adventure begins here.
              </motion.p>

              {/* Enhanced Search Interface */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="card-glass relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <motion.div 
                    className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-sm font-semibold text-white/90 mb-3">Where to explore? 🗺️</label>
                    <Input
                      placeholder="Ranchi, Jamshedpur, Deoghar, Hazaribagh..."
                      className="input-heritage text-white placeholder:text-white/60 text-lg py-4"
                    />
                  </motion.div>
                  <motion.div 
                    className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-sm font-semibold text-white/90 mb-3">When? 📅</label>
                    <Input
                      type="date"
                      className="input-heritage text-white text-lg py-4"
                    />
                  </motion.div>
                  <div className="flex items-end">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="btn-heritage whitespace-nowrap animate-breath">
                        <Search className="w-6 h-6 mr-3" />
                        Explore Now
                      </Button>
                    </motion.div>
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

          {/* Enhanced Right Column - Featured Destinations */}
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="space-y-8"
          >
            <motion.div
              className="card-featured text-white"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-8">
                <motion.div 
                  className="flex items-center justify-between mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <h3 className="text-2xl font-bold flex items-center">
                    🔥 <span className="ml-2 gradient-text-secondary">Trending Now</span>
                  </h3>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 hover:text-white transition-all duration-300">
                      View All <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                </motion.div>
                
                <div className="space-y-5">
                  {[
                    { name: 'Ranchi Hills Circuit', price: '₹8,999', rating: 4.8, image: '🏔️', desc: 'Scenic hill stations & waterfalls' },
                    { name: 'Deoghar Temple Trail', price: '₹6,499', rating: 4.9, image: '🕉️', desc: 'Sacred temples & spiritual journey' },
                    { name: 'Jamshedpur Industrial Tour', price: '₹5,999', rating: 4.6, image: '🏭', desc: 'Steel city & modern marvels' }
                  ].map((dest, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                      whileHover={{ scale: 1.03, x: 5 }}
                      className="flex items-center space-x-5 p-4 rounded-2xl bg-white/5 hover:bg-white/15 transition-all duration-300 cursor-pointer border border-white/10 hover:border-white/30 glow-on-hover"
                    >
                      <motion.div 
                        className="text-3xl"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      >
                        {dest.image}
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-white mb-1">{dest.name}</h4>
                        <p className="text-sm text-white/70 mb-2">{dest.desc}</p>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-accent text-accent" />
                            <span className="text-sm text-accent font-medium">{dest.rating}</span>
                          </div>
                          <span className="text-xs text-white/50">•</span>
                          <span className="text-xs text-white/70">3-5 days</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xl text-primary-glow">{dest.price}</div>
                        <div className="text-xs text-white/60">per person</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Enhanced AI Assistant Preview */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="card-glass relative overflow-hidden"
            >
              <div className="p-8">
                <motion.div 
                  className="flex items-center space-x-4 mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                >
                  <motion.div 
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-accent to-royal flex items-center justify-center pulse-heritage shadow-2xl"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <span className="text-lg font-bold text-white">AI</span>
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-xl text-white">झारखंड AI Assistant</h4>
                    <p className="text-sm text-white/70">Your personalized Jharkhand travel guide</p>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="ml-auto"
                  >
                    <div className="w-3 h-3 bg-green-400 rounded-full pulse-heritage"></div>
                  </motion.div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.6 }}
                  className="chat-bubble-ai mb-6"
                >
                  <p className="text-sm leading-relaxed">
                    "Perfect timing! I recommend exploring Ranchi's Rock Garden, Hundru Falls, 
                    and Deoghar's Baidyanath Temple. The monsoon season (July-Sep) offers 
                    spectacular waterfalls. Shall I plan your 5-day Jharkhand discovery tour?"
                  </p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8, duration: 0.6 }}
                >
                  <Button className="w-full btn-sunset animate-levitate">
                    Start Planning with AI ✨
                  </Button>
                </motion.div>
              </div>
            </motion.div>
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