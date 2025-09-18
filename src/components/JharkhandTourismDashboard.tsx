import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { ExternalLink, Loader2, MapPin, Building, TreePine, Landmark, RefreshCw } from 'lucide-react';

interface TourismContent {
  id: string;
  title: string;
  description?: string;
  content?: string;
  location?: string;
  district?: string;
  category?: string;
  source_url?: string;
  scraped_at: string;
  tourism_sites: {
    name: string;
    site_type: string;
  };
}

const JharkhandTourismDashboard = () => {
  const [content, setContent] = useState<TourismContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [scrapingProgress, setScrapingProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchTourismData();
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
        .limit(50);

      if (error) throw error;

      setContent(data || []);
    } catch (error) {
      console.error('Error fetching tourism data:', error);
      toast({
        title: "Error loading data",
        description: "Failed to load tourism information",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const startScraping = async () => {
    setScraping(true);
    setScrapingProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setScrapingProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 1000);

    try {
      const { data, error } = await supabase.functions.invoke('scrape-tourism-data');
      
      clearInterval(progressInterval);
      setScrapingProgress(100);

      if (error) throw error;

      toast({
        title: "Data Updated Successfully",
        description: `Scraped ${data.totalItems || 0} items from ${data.sites?.length || 0} tourism portals`,
      });

      // Refresh the data
      await fetchTourismData();
    } catch (error) {
      console.error('Error scraping data:', error);
      toast({
        title: "Scraping Failed",
        description: "Failed to update tourism data from government portals",
        variant: "destructive",
      });
    } finally {
      clearInterval(progressInterval);
      setScraping(false);
      setScrapingProgress(0);
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'facility':
      case 'registered_service':
        return <Building className="w-4 h-4" />;
      case 'environmental':
        return <TreePine className="w-4 h-4" />;
      case 'heritage':
        return <Landmark className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'facility':
      case 'registered_service':
        return 'bg-blue-100 text-blue-800';
      case 'environmental':
        return 'bg-green-100 text-green-800';
      case 'heritage':
        return 'bg-purple-100 text-purple-800';
      case 'tourism_info':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const groupContentByCategory = () => {
    const grouped = content.reduce((acc, item) => {
      const category = item.category || 'general';
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {} as Record<string, TourismContent[]>);

    return grouped;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const groupedContent = groupContentByCategory();

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Jharkhand Tourism Data Portal
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Real-time data from official government tourism portals, registration systems, and heritage conservation sites
          </p>
          
          <div className="flex justify-center gap-4 mb-6">
            <Button 
              onClick={startScraping} 
              disabled={scraping}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              {scraping ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating Data...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Update Tourism Data
                </>
              )}
            </Button>
          </div>

          {scraping && (
            <div className="max-w-md mx-auto mb-6">
              <Progress value={scrapingProgress} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2">
                Scraping official government portals...
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{content.length}</div>
                <div className="text-sm text-muted-foreground">Total Records</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{Object.keys(groupedContent).length}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {content.filter(item => item.tourism_sites.site_type === 'official').length}
                </div>
                <div className="text-sm text-muted-foreground">Official Sources</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {content.filter(item => item.location).length}
                </div>
                <div className="text-sm text-muted-foreground">Located Items</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All Data</TabsTrigger>
            <TabsTrigger value="tourism_info">Tourism Info</TabsTrigger>
            <TabsTrigger value="facility">Services</TabsTrigger>
            <TabsTrigger value="heritage">Heritage</TabsTrigger>
            <TabsTrigger value="environmental">Nature</TabsTrigger>
            <TabsTrigger value="registered_service">Registered</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.slice(0, 12).map((item) => (
                <Card key={item.id} className="h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className={getCategoryColor(item.category)}>
                        {item.category || 'general'}
                      </Badge>
                      {item.location && (
                        <Badge variant="outline">
                          <MapPin className="w-3 h-3 mr-1" />
                          {item.location}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {item.description && (
                      <CardDescription className="mb-3 line-clamp-3">
                        {item.description}
                      </CardDescription>
                    )}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{item.tourism_sites.name}</span>
                      {item.source_url && (
                        <Button variant="ghost" size="sm" asChild>
                          <a href={item.source_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Updated: {new Date(item.scraped_at).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {Object.entries(groupedContent).map(([category, items]) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.slice(0, 9).map((item) => (
                  <Card key={item.id} className="h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
                        {getCategoryIcon(item.category)}
                      </div>
                      {item.location && (
                        <Badge variant="outline">
                          <MapPin className="w-3 h-3 mr-1" />
                          {item.location}
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      {item.description && (
                        <CardDescription className="mb-3 line-clamp-3">
                          {item.description}
                        </CardDescription>
                      )}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="truncate">{item.tourism_sites.name}</span>
                        {item.source_url && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={item.source_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </Button>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        Updated: {new Date(item.scraped_at).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {content.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No tourism data available yet. Click "Update Tourism Data" to fetch the latest information from government portals.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JharkhandTourismDashboard;