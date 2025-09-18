import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { RefreshCw, Search, ExternalLink, MapPin, Calendar, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface TourismContent {
  id: string;
  title: string;
  description?: string;
  content?: string;
  images?: string[];
  location?: string;
  district?: string;
  category?: string;
  contact_info?: any;
  metadata?: any;
  source_url: string;
  scraped_at: string;
  tourism_sites?: {
    name: string;
    site_type: string;
  };
}

interface TourismSite {
  id: string;
  name: string;
  url: string;
  site_type: string;
  last_scraped_at?: string;
}

const IntegratedTourismData = () => {
  const [content, setContent] = useState<TourismContent[]>([]);
  const [sites, setSites] = useState<TourismSite[]>([]);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSiteType, setSelectedSiteType] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchTourismData();
    fetchTourismSites();
  }, []);

  const fetchTourismData = async () => {
    try {
      const { data, error } = await supabase
        .from('tourism_content')
        .select(`
          *,
          tourism_sites (
            name,
            site_type
          )
        `)
        .order('scraped_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching tourism data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch tourism data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTourismSites = async () => {
    try {
      const { data, error } = await supabase
        .from('tourism_sites')
        .select('*')
        .order('name');

      if (error) throw error;
      setSites(data || []);
    } catch (error) {
      console.error('Error fetching tourism sites:', error);
    }
  };

  const startScraping = async () => {
    setScraping(true);
    try {
      const { data, error } = await supabase.functions.invoke('scrape-tourism-data');
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Successfully scraped data from tourism websites`,
      });
      
      // Refresh the data
      await fetchTourismData();
      await fetchTourismSites();
    } catch (error) {
      console.error('Error scraping data:', error);
      toast({
        title: "Error",
        description: "Failed to scrape tourism data",
        variant: "destructive",
      });
    } finally {
      setScraping(false);
    }
  };

  const filteredContent = content.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    const matchesSiteType = selectedSiteType === 'all' || 
      item.tourism_sites?.site_type === selectedSiteType;
    
    return matchesSearch && matchesCategory && matchesSiteType;
  });

  const categories = [...new Set(content.map(item => item.category).filter(Boolean))];
  const siteTypes = [...new Set(sites.map(site => site.site_type))];

  if (loading) {
    return (
      <div className="w-full p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading integrated tourism data...</p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Integrated Tourism Data
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive information sourced from official Jharkhand tourism websites and trusted portals
          </p>
          
          <Button
            onClick={startScraping}
            disabled={scraping}
            className="btn-glow mb-8"
            size="lg"
          >
            {scraping ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Updating Data...
              </>
            ) : (
              <>
                <RefreshCw className="w-5 h-5 mr-2" />
                Update Tourism Data
              </>
            )}
          </Button>
        </motion.div>

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="content">Tourism Content</TabsTrigger>
            <TabsTrigger value="sources">Data Sources</TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search tourism content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category?.replace('_', ' ').toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSiteType} onValueChange={setSelectedSiteType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Source Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  {siteTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="card-hover h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-lg line-clamp-2">
                          {item.title}
                        </CardTitle>
                        <Badge variant="outline" className="shrink-0">
                          {item.tourism_sites?.site_type || 'Unknown'}
                        </Badge>
                      </div>
                      {item.description && (
                        <CardDescription className="line-clamp-3">
                          {item.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-3">
                        {item.category && (
                          <div className="flex items-center gap-2">
                            <Info className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm capitalize">
                              {item.category.replace('_', ' ')}
                            </span>
                          </div>
                        )}
                        
                        {item.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{item.location}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">
                            {new Date(item.scraped_at).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                          <span className="text-sm text-muted-foreground">
                            Source: {item.tourism_sites?.name || 'Unknown'}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(item.source_url, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredContent.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No tourism content found matching your filters.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedSiteType('all');
                  }}
                  variant="outline"
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="sources">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sites.map((site, index) => (
                <motion.div
                  key={site.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="card-hover">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {site.name}
                        <Badge
                          variant={site.site_type === 'official' ? 'default' : 'secondary'}
                        >
                          {site.site_type}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="break-all">
                        {site.url}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-3">
                        {site.last_scraped_at && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">
                              Last updated: {new Date(site.last_scraped_at).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => window.open(site.url, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit Source
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default IntegratedTourismData;