import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Phone, User, Search, MapPin, ChevronDown, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Signed out successfully!",
      });
      navigate('/');
    }
    setUserMenuOpen(false);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' }
  ];

  const navItems = [
    { label: 'Destinations', href: '#destinations', icon: '🏔️' },
    { label: 'Plan Trip', href: '#plan', icon: '📅' },
    { label: 'Local Market', href: '#marketplace', icon: '🛍️' },
    { label: 'Culture', href: '#culture', icon: '🎭' },
    { label: 'Emergency', href: '#emergency', icon: '🚨' }
  ];

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-xl border-b border-primary/20 sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Enhanced Logo */}
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg glow-on-hover">
                <span className="text-white font-bold text-xl">झ</span>
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">Jharkhand Tourism</h1>
                <p className="text-xs text-muted-foreground">वनांचल की यात्रा</p>
              </div>
            </motion.div>

            {/* Enhanced Search Bar */}
            <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
              <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 transition-colors group-focus-within:text-primary" />
                <Input
                  placeholder="Search Jharkhand destinations..."
                  className="pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-border/50 focus:border-primary rounded-full transition-all duration-300 focus:shadow-lg hover:shadow-md"
                />
              </div>
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 font-medium group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                  <span>{item.label}</span>
                </motion.a>
              ))}
            </div>

            {/* Enhanced Navigation Links & Actions */}
            <div className="flex items-center space-x-4">
              {/* Enhanced Language Selector */}
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setLanguageOpen(!languageOpen)}
                  className="flex items-center space-x-2 text-foreground hover:text-primary transition-all duration-300 hover:bg-primary/10 rounded-xl"
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-sm font-medium">{languages.find(l => l.code === currentLanguage)?.name}</span>
                  <motion.div
                    animate={{ rotate: languageOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </Button>
                
                <AnimatePresence>
                  {languageOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-52 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-border/50 py-3 z-50"
                    >
                      {languages.map((lang, index) => (
                        <motion.button
                          key={lang.code}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => {
                            setCurrentLanguage(lang.code);
                            setLanguageOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm text-foreground hover:bg-primary/10 hover:text-primary flex items-center space-x-3 transition-all duration-200 group"
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span className="group-hover:font-medium">{lang.name}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Enhanced Emergency SOS */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-300 pulse-heritage rounded-xl"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="font-semibold">SOS</span>
                </Button>
              </motion.div>

              {/* Enhanced Sign In / User Menu */}
              {user ? (
                <div className="relative">
                  <Button
                    variant="ghost"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 text-foreground hover:text-primary transition-all duration-300 hover:bg-primary/10 rounded-xl"
                  >
                    <User className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {user.user_metadata?.display_name || user.email?.split('@')[0] || 'User'}
                    </span>
                    <motion.div
                      animate={{ rotate: userMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </Button>
                  
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-border/50 py-2 z-50"
                      >
                        <div className="px-4 py-2 border-b border-border/50">
                          <p className="text-sm font-medium text-foreground">
                            {user.user_metadata?.display_name || 'User'}
                          </p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                        <motion.button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-3 text-sm text-foreground hover:bg-red-50 hover:text-red-600 flex items-center space-x-2 transition-all duration-200"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/auth">
                    <Button 
                      variant="outline"
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-xl glow-on-hover"
                    >
                      <User className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Sign In</span>
                    </Button>
                  </Link>
                </motion.div>
              )}

              {/* Mobile Menu Button */}
              <motion.div
                className="md:hidden"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 hover:bg-primary/10 rounded-xl"
                >
                  <motion.div
                    animate={{ rotate: isMenuOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden border-t border-border/50 overflow-hidden"
              >
                <div className="px-4 py-6 space-y-4 bg-white/95 backdrop-blur-lg">
                  {/* Mobile Search */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative"
                  >
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      placeholder="Search destinations..."
                      className="pl-10 py-3 rounded-xl border-2 border-border/50 focus:border-primary"
                    />
                  </motion.div>

                  {/* Mobile Navigation Items */}
                  <div className="space-y-2">
                    {navItems.map((item, index) => (
                      <motion.a
                        key={index}
                        href={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span>{item.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Click outside to close dropdowns */}
      <AnimatePresence>
        {(languageOpen || userMenuOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => {
              setLanguageOpen(false);
              setUserMenuOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;