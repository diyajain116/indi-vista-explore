import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Calendar, MapPin, Users, DollarSign, Clock, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

const SmartPlanner = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [budget, setBudget] = useState([50000]);
  const [duration, setDuration] = useState([7]);
  const [isGenerating, setIsGenerating] = useState(false);

  const steps = [
    { icon: MapPin, title: 'Destinations', description: 'Where do you want to go?' },
    { icon: Calendar, title: 'When', description: 'Travel dates & duration' },
    { icon: Users, title: 'Travelers', description: 'Who\'s coming along?' },
    { icon: DollarSign, title: 'Budget', description: 'Set your budget range' },
    { icon: Sparkles, title: 'Preferences', description: 'Customize your experience' }
  ];

  const travelStyles = [
    { id: 'nature', label: 'Nature Explorer', icon: '🌿', description: 'Waterfalls, hills, wildlife sanctuaries' },
    { id: 'spiritual', label: 'Spiritual Seeker', icon: '🕉️', description: 'Temples, Jyotirlingas, pilgrimage sites' },
    { id: 'tribal', label: 'Tribal Culture', icon: '🎭', description: 'Indigenous culture, art, festivals' },
    { id: 'adventure', label: 'Adventure Enthusiast', icon: '🏔️', description: 'Trekking, rock climbing, caves' },
    { id: 'industrial', label: 'Industrial Tourism', icon: '🏭', description: 'Steel plants, mining heritage' },
    { id: 'wellness', label: 'Wellness Retreat', icon: '🧘', description: 'Ayurveda, meditation, hot springs' }
  ];

  const handleGenerateItinerary = async () => {
    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
      // Show generated itinerary
    }, 3000);
  };

  return (
    <section id="plan" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-royal flex items-center justify-center pulse-heritage">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground">
              AI Travel
              <span className="bg-gradient-to-r from-royal to-accent bg-clip-text text-transparent"> Planner</span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Let our AI create the perfect itinerary for you. Just tell us your preferences, 
            and we'll handle the rest with smart recommendations and seamless booking.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Planning Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="card-heritage p-8">
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex flex-col items-center space-y-2 ${
                        index <= currentStep ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        index < currentStep 
                          ? 'bg-primary border-primary text-primary-foreground' 
                          : index === currentStep 
                            ? 'border-primary text-primary' 
                            : 'border-muted-foreground'
                      }`}>
                        {index < currentStep ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <step.icon className="w-5 h-5" />
                        )}
                      </div>
                      <span className="text-xs font-medium hidden sm:block">{step.title}</span>
                    </div>
                  ))}
                </div>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step Content */}
              <div className="space-y-6">
                {currentStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-foreground">Where would you like to explore in Jharkhand?</h3>
                    <Input
                      placeholder="e.g., Ranchi, Deoghar, Jamshedpur, Hazaribagh..."
                      className="text-lg py-3"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      {['Ranchi', 'Deoghar', 'Jamshedpur', 'Hazaribagh', 'Dhanbad', 'Bokaro'].map((city) => (
                        <Button
                          key={city}
                          variant="outline"
                          className="justify-start hover:bg-primary hover:text-primary-foreground"
                        >
                          {city}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-foreground">When are you planning to travel?</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Check-in Date</label>
                        <Input type="date" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Check-out Date</label>
                        <Input type="date" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Duration: {duration[0]} days</label>
                      <Slider
                        value={duration}
                        onValueChange={setDuration}
                        max={30}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>1 day</span>
                        <span>30 days</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-foreground">Who's traveling?</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Adults</label>
                        <Input type="number" defaultValue="2" min="1" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Children</label>
                        <Input type="number" defaultValue="0" min="0" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium">Travel Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Solo Travel', 'Couple', 'Family', 'Friends', 'Business', 'Group'].map((type) => (
                          <Button
                            key={type}
                            variant="outline"
                            className="justify-start hover:bg-primary hover:text-primary-foreground"
                          >
                            {type}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-foreground">What's your budget?</h3>
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Budget: ₹{budget[0].toLocaleString()} per person
                      </label>
                      <Slider
                        value={budget}
                        onValueChange={setBudget}
                        max={200000}
                        min={5000}
                        step={5000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>₹5,000</span>
                        <span>₹2,00,000+</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { label: 'Budget (₹5K-20K)', description: 'Hostels, local transport, street food' },
                        { label: 'Mid-range (₹20K-50K)', description: 'Hotels, private transport, restaurants' },
                        { label: 'Luxury (₹50K+)', description: 'Premium stays, private tours, fine dining' }
                      ].map((tier) => (
                        <Button
                          key={tier.label}
                          variant="outline"
                          className="p-4 h-auto text-left flex-col items-start hover:bg-primary hover:text-primary-foreground"
                        >
                          <div className="font-medium">{tier.label}</div>
                          <div className="text-xs opacity-70">{tier.description}</div>
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-foreground">What's your travel style?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {travelStyles.map((style) => (
                        <Button
                          key={style.id}
                          variant="outline"
                          className="p-4 h-auto text-left flex items-start space-x-3 hover:bg-primary hover:text-primary-foreground"
                        >
                          <span className="text-2xl">{style.icon}</span>
                          <div>
                            <div className="font-medium">{style.label}</div>
                            <div className="text-xs opacity-70">{style.description}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  
                  {currentStep < steps.length - 1 ? (
                    <Button
                      className="btn-heritage"
                      onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                    >
                      Next <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      className="btn-royal px-8"
                      onClick={handleGenerateItinerary}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate Itinerary
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* AI Assistant Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* AI Chat Interface */}
            <Card className="card-heritage p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-royal to-primary flex items-center justify-center pulse-heritage">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                  <div>
                    <h4 className="font-semibold text-foreground">झारखंड AI Assistant</h4>
                    <p className="text-sm text-muted-foreground">Jharkhand travel planning help</p>
                  </div>
                <Badge className="ml-auto bg-green-100 text-green-800">Online</Badge>
              </div>

              <div className="space-y-4 max-h-80 overflow-y-auto">
                {[
                  {
                    type: 'ai',
                    message: 'Welcome! I\'m here to help you plan the perfect Jharkhand adventure. What kind of experience are you looking for - waterfalls, temples, tribal culture, or industrial heritage?',
                    time: '2 min ago'
                  },
                  {
                    type: 'user',
                    message: 'I want to explore Jharkhand\'s waterfalls and tribal culture with my family',
                    time: '1 min ago'
                  },
                  {
                    type: 'ai',
                    message: 'Excellent choice! Jharkhand offers amazing waterfalls like Hundru Falls and rich tribal heritage. The monsoon season (July-September) is perfect for waterfalls. I recommend a 5-day circuit covering Ranchi, Deoghar, and tribal villages. Shall I create your detailed itinerary?',
                    time: 'Just now'
                  }
                ].map((chat, index) => (
                  <div
                    key={index}
                    className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        chat.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm">{chat.message}</p>
                      <p className="text-xs opacity-70 mt-1">{chat.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask me anything about your trip..."
                    className="flex-1"
                  />
                  <Button size="sm" className="btn-heritage">
                    Send
                  </Button>
                </div>
              </div>
            </Card>

            {/* Quick Features */}
            <Card className="card-heritage p-6">
              <h4 className="font-semibold text-foreground mb-4">AI-Powered Features</h4>
              <div className="space-y-4">
                {[
                  { icon: '🎯', title: 'Smart Recommendations', description: 'Personalized suggestions based on your preferences' },
                  { icon: '🌡️', title: 'Weather Insights', description: 'Real-time weather and crowd predictions' },
                  { icon: '💰', title: 'Budget Optimization', description: 'Get maximum value within your budget' },
                  { icon: '📱', title: 'Real-time Updates', description: 'Live updates on bookings and changes' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="text-lg">{feature.icon}</span>
                    <div>
                      <h5 className="font-medium text-foreground">{feature.title}</h5>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SmartPlanner;