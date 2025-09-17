import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Calendar, Users, Eye, Heart, Share2, Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DestinationExplorer = () => {
  const [activeCategory, setActiveCategory] = useState('waterfalls');
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = [
    { id: 'waterfalls', label: 'Waterfalls', icon: '💧', count: 45 },
    { id: 'temples', label: 'Temples & Spiritual', icon: '🕉️', count: 89 },
    { id: 'tribal', label: 'Tribal Heritage', icon: '🎭', count: 67 },
    { id: 'hills', label: 'Hills & Nature', icon: '🏔️', count: 78 },
    { id: 'industrial', label: 'Industrial Tourism', icon: '🏭', count: 25 },
    { id: 'wildlife', label: 'Wildlife Sanctuaries', icon: '🦌', count: 15 }
  ];

  const destinations = {
    waterfalls: [
      {
        id: 'hundru-falls',
        name: 'Hundru Falls',
        state: 'Ranchi',
        rating: 4.8,
        reviews: 12345,
        price: '₹1,500',
        image: '💧',
        description: 'Spectacular 320ft waterfall cascading from Subarnarekha river',
        highlights: ['Monsoon Trekking', 'Photography', 'Nature Walk'],
        duration: '4 hours',
        bestTime: 'Jul-Oct',
        category: 'Natural'
      },
      {
        id: 'jonha-falls',
        name: 'Jonha Falls',
        state: 'Ranchi',
        rating: 4.6,
        reviews: 8967,
        price: '₹1,200',
        image: '🌊',
        description: 'Hidden gem waterfall perfect for adventure seekers',
        highlights: ['Rock Climbing', 'Cave Exploration', 'Picnic Spot'],
        duration: '5 hours',
        bestTime: 'Jun-Sep',
        category: 'Adventure'
      },
      {
        id: 'dassam-falls',
        name: 'Dassam Falls',
        state: 'Ranchi',
        rating: 4.7,
        reviews: 10234,
        price: '₹1,800',
        image: '💦',
        description: 'Multi-tiered waterfall offering breathtaking valley views',
        highlights: ['Valley Views', 'Tribal Culture', 'Local Cuisine'],
        duration: '6 hours',
        bestTime: 'Jul-Nov',
        category: 'Scenic'
      }
    ],
    temples: [
      {
        id: 'baidyanath-dham',
        name: 'Baidyanath Dham',
        state: 'Deoghar',
        rating: 4.9,
        reviews: 45678,
        price: '₹2,500',
        image: '🕉️',
        description: 'One of the 12 Jyotirlingas, sacred pilgrimage site',
        highlights: ['Jyotirlinga Darshan', 'Temple Complex', 'Spiritual Retreat'],
        duration: '8 hours',
        bestTime: 'Oct-Mar',
        category: 'Pilgrimage'
      },
      {
        id: 'chinnamasta-temple',
        name: 'Chinnamasta Temple',
        state: 'Hazaribagh',
        rating: 4.7,
        reviews: 15432,
        price: '₹1,800',
        image: '🛕',
        description: 'Ancient Shakti Peeth temple dedicated to Goddess Chinnamasta',
        highlights: ['Tantric Traditions', 'Ancient Architecture', 'Religious Rituals'],
        duration: '4 hours',
        bestTime: 'Sep-Feb',
        category: 'Shakti Peeth'
      }
    ],
    tribal: [
      {
        id: 'tribal-heritage',
        name: 'Tribal Heritage Museum',
        state: 'Ranchi',
        rating: 4.5,
        reviews: 6789,
        price: '₹800',
        image: '🎭',
        description: 'Experience rich tribal culture and traditional art forms',
        highlights: ['Cultural Shows', 'Traditional Crafts', 'Tribal Dance'],
        duration: '3 hours',
        bestTime: 'Year Round',
        category: 'Cultural'
      }
    ]
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="destinations" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center space-x-4 bg-gradient-to-r from-primary/20 via-accent/15 to-royal/20 backdrop-blur-xl px-10 py-5 rounded-full border-2 border-primary/30 mb-12 shadow-[var(--shadow-primary)] animate-levitate"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-3xl animate-breath">🌿</span>
            <span className="font-bold text-xl gradient-text">Discover Amazing Places</span>
          </motion.div>
          
          <h2 className="text-5xl lg:text-7xl xl:text-8xl font-bold text-foreground mb-10">
            Explore
            <span className="gradient-text animate-gradient-flow"> Beautiful Jharkhand</span>
          </h2>
          <motion.p 
            className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover Jharkhand's diverse landscapes from pristine waterfalls to spiritual temples, 
            tribal heritage to modern industrial cities - all with immersive 360° previews and seamless booking.
          </motion.p>
        </motion.div>

        {/* Enhanced Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex flex-wrap justify-center gap-6">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onClick={() => setActiveCategory(category.id)}
                className={`group flex items-center space-x-4 px-10 py-6 rounded-3xl font-bold transition-all duration-500 magnetic-hover ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-br from-primary via-primary-glow to-accent text-primary-foreground shadow-[var(--shadow-primary)] animate-breath border-2 border-primary/50'
                    : 'bg-gradient-to-br from-card to-muted/50 text-foreground hover:from-primary/10 hover:to-accent/10 hover:text-primary border-2 border-border hover:border-primary/50 hover:shadow-[var(--shadow-elevation-2)]'
                } relative overflow-hidden`}
              >
                {/* Shimmer effect for active state */}
                {activeCategory === category.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                )}
                
                <motion.span 
                  className="text-2xl group-hover:scale-110 transition-transform duration-300"
                  animate={activeCategory === category.id ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {category.icon}
                </motion.span>
                <div className="text-left">
                  <span className="block text-lg">{category.label}</span>
                  <Badge 
                    variant={activeCategory === category.id ? "secondary" : "outline"} 
                    className={`mt-1 ${activeCategory === category.id ? 'bg-white/20 text-white border-white/30' : ''}`}
                  >
                    {category.count} places
                  </Badge>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Destinations Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {(destinations[activeCategory as keyof typeof destinations] || destinations.waterfalls).map((destination, index) => (
            <motion.div
              key={destination.id}
              layout
              initial={{ opacity: 0, y: 80, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="group"
            >
              <Card className="card-premium overflow-hidden group cursor-pointer relative animate-levitate" style={{ animationDelay: `${index * 0.3}s` }}>
                {/* Enhanced Image Container */}
                <div className="relative h-80 bg-gradient-to-br from-primary/30 via-accent/25 to-royal/30 flex items-center justify-center overflow-hidden forest-pattern">
                  <motion.div 
                    className="text-9xl group-hover:scale-125 transition-all duration-1000 ease-out filter drop-shadow-2xl animate-breath"
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 6, repeat: Infinity, delay: index * 0.7 }}
                  >
                    {destination.image}
                  </motion.div>
                  
                  {/* Enhanced Overlay Actions */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center space-x-4"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Button
                        size="sm"
                        className="btn-glass"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        360° View
                      </Button>
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Button
                        size="sm"
                        className="btn-glass"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        AR Preview
                      </Button>
                    </motion.div>
                  </motion.div>

                  {/* Enhanced Action Buttons */}
                  <div className="absolute top-6 right-6 flex space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0">
                    <motion.button
                      className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-xl glow-on-hover"
                      whileHover={{ scale: 1.1, rotate: 15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(destination.id);
                      }}
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(destination.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </motion.button>
                    <motion.button
                      className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-accent hover:text-white transition-all duration-300 shadow-xl glow-on-hover"
                      whileHover={{ scale: 1.1, rotate: -15 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Enhanced Category Badge */}
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-gradient-to-r from-primary via-primary-glow to-accent text-white font-bold px-5 py-3 rounded-2xl shadow-[var(--shadow-primary)] backdrop-blur-lg border-2 border-white/30 animate-shimmer">
                      {destination.category}
                    </Badge>
                  </div>

                  {/* Enhanced Rating Badge */}
                  <div className="absolute bottom-6 left-6">
                    <div className="bg-white/95 backdrop-blur-xl px-5 py-3 rounded-2xl flex items-center space-x-3 shadow-[var(--shadow-elevation-2)] border border-white/20">
                      <Star className="w-6 h-6 fill-accent text-accent animate-pulse" />
                      <span className="text-xl font-bold text-foreground">{destination.rating}</span>
                      <span className="text-sm text-muted-foreground font-medium">({destination.reviews.toLocaleString()})</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="p-8 space-y-6">
                  <div>
                    <motion.h3 
                      className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {destination.name}
                    </motion.h3>
                    <div className="flex items-center space-x-2 text-muted-foreground mb-4">
                      <MapPin className="w-5 h-5" />
                      <span className="text-lg font-medium">{destination.state}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {destination.description}
                    </p>
                  </div>

                  {/* Enhanced Highlights */}
                  <div className="flex flex-wrap gap-3">
                    {destination.highlights.map((highlight, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="cursor-pointer"
                      >
                        <Badge 
                          variant="outline" 
                          className="px-3 py-1 text-sm font-medium hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                        >
                          {highlight}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>

                  {/* Enhanced Details */}
                  <div className="grid grid-cols-2 gap-6 text-base">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground font-medium">{destination.duration}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-royal" />
                      <span className="text-muted-foreground font-medium">{destination.bestTime}</span>
                    </div>
                  </div>

                  {/* Enhanced Price and Book Button */}
                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <div>
                      <span className="text-4xl font-bold gradient-text-sunset animate-gradient-flow">{destination.price}</span>
                      <span className="text-lg text-muted-foreground ml-3 font-medium">per person</span>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="btn-sunset animate-breath">
                        Book Now
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Load More */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="px-12 py-4 text-lg font-semibold border-2 border-primary/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-2xl shadow-lg hover:shadow-2xl"
            >
              <span className="mr-3">🔍</span>
              Discover More Destinations
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationExplorer;