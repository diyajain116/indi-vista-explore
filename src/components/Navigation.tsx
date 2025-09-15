import React, { useState } from 'react';
import { Menu, X, Globe, Phone, User, Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = ['English', 'हिंदी', 'मराठी', 'বাংলা', 'தமிழ்'];

  const navItems = [
    { label: 'Destinations', href: '#destinations' },
    { label: 'Plan Trip', href: '#plan' },
    { label: 'Local Market', href: '#marketplace' },
    { label: 'Emergency', href: '#emergency' },
    { label: 'Analytics', href: '#analytics' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-card/95 backdrop-blur-lg border-b border-border shadow-[var(--shadow-warm)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">भारत यात्रा</h1>
              <p className="text-xs text-muted-foreground">India Tourism</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search destinations, experiences, hotels..."
                className="pl-10 pr-4 py-2 w-full rounded-xl border-primary/20 focus:border-primary"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Language & User Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="hidden sm:flex items-center space-x-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent text-sm font-medium text-foreground border-none focus:outline-none cursor-pointer"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Emergency Button */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Phone className="w-4 h-4" />
              <span className="text-xs font-medium">SOS</span>
            </Button>

            {/* User Profile */}
            <Button variant="ghost" size="sm" className="p-2">
              <User className="w-5 h-5" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search destinations..."
                  className="pl-10 w-full rounded-xl"
                />
              </div>

              {/* Mobile Navigation Items */}
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Language Selector */}
              <div className="px-3 py-2">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full bg-muted rounded-lg px-3 py-2 text-sm font-medium text-foreground border-none focus:outline-none"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;