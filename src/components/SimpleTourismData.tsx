import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, ExternalLink, MapPin, Calendar, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

const SimpleTourismData = () => {
  const [content, setContent] = useState<TourismContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
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
        .limit(20);

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      // Silent error handling - show user-friendly message only
      toast({
        title: "Error",
        description: "Failed to fetch tourism data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
    } catch (error) {
      // Silent error handling - show user-friendly message only
      toast({
        title: "Error",
        description: "Failed to scrape tourism data",
        variant: "destructive",
      });
    } finally {
      setScraping(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading integrated tourism data...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {content.slice(0, 6).map((item) => (
            <Card key={item.id} className="card-hover h-full">
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
          ))}
        </div>

        {content.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No tourism content available yet. Click "Update Tourism Data" to scrape the latest information.
            </p>
          </div>
        )}

        {content.length > 6 && (
          <div className="text-center">
            <p className="text-muted-foreground">
              Showing 6 of {content.length} total items. Full interface coming soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SimpleTourismData;