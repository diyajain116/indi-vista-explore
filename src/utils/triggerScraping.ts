import { supabase } from "@/integrations/supabase/client";

export const triggerDataScraping = async () => {
  try {
    console.log('Starting tourism data scraping...');
    
    const { data, error } = await supabase.functions.invoke('scrape-tourism-data', {
      body: { 
        manual_trigger: true, 
        timestamp: new Date().toISOString() 
      }
    });

    if (error) {
      console.error('Scraping error:', error);
      throw error;
    }

    console.log('Scraping completed successfully:', data);
    return data;
  } catch (error) {
    console.error('Failed to trigger scraping:', error);
    throw error;
  }
};

// Auto-trigger scraping when this module loads (for immediate execution)
if (typeof window !== 'undefined') {
  console.log('Triggering automatic scraping of tourism sites...');
  triggerDataScraping()
    .then((result) => {
      console.log('✅ Scraping completed:', result);
    })
    .catch((error) => {
      console.error('❌ Scraping failed:', error);
    });
}