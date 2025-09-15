import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Calendar, Users, Eye, Heart, Share2, Play } from 'lucide-react';
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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Explore
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Beautiful Jharkhand</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover Jharkhand's diverse landscapes from pristine waterfalls to spiritual temples, 
            tribal heritage to modern industrial cities - all with immersive 360° previews and seamless booking.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-heritage)]'
                    : 'bg-card hover:bg-muted text-foreground border border-border hover:border-primary/20'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.label}</span>
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Destinations Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {(destinations[activeCategory as keyof typeof destinations] || destinations.waterfalls).map((destination, index) => (
            <motion.div
              key={destination.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="card-heritage overflow-hidden group cursor-pointer">
                {/* Image Container */}
                <div className="relative h-64 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                  <div className="text-8xl group-hover:scale-110 transition-transform duration-500">
                    {destination.image}
                  </div>
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-4">
                    <Button
                      size="sm"
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      360° View
                    </Button>
                    <Button
                      size="sm"
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      AR Preview
                    </Button>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(destination.id);
                      }}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(destination.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground font-medium">
                      {destination.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {destination.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{destination.state}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {destination.description}
                    </p>
                  </div>

                  {/* Rating and Reviews */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-semibold text-foreground">{destination.rating}</span>
                      <span className="text-sm text-muted-foreground">({destination.reviews.toLocaleString()})</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.map((highlight, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{destination.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-royal" />
                      <span className="text-muted-foreground">{destination.bestTime}</span>
                    </div>
                  </div>

                  {/* Price and Book Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-2xl font-bold text-primary">{destination.price}</span>
                      <span className="text-sm text-muted-foreground ml-1">per person</span>
                    </div>
                    <Button className="btn-heritage">
                      Book Now
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
            Load More Destinations
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationExplorer;