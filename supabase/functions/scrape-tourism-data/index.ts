import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TourismSite {
  id: string;
  name: string;
  url: string;
  site_type: string;
  is_active: boolean;
}

interface ScrapedContent {
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
}

Deno.serve(async (req) => {
  console.log('Tourism data scraper function called');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get all active tourism sites
    const { data: sites, error: sitesError } = await supabaseClient
      .from('tourism_sites')
      .select('*')
      .eq('is_active', true);

    if (sitesError) {
      console.error('Error fetching sites:', sitesError);
      throw sitesError;
    }

    console.log(`Found ${sites?.length || 0} active tourism sites to scrape`);

    const scrapedData: any[] = [];

    for (const site of sites || []) {
      try {
        console.log(`Scraping ${site.name} - ${site.url}`);
        
        // Fetch the website content
        const response = await fetch(site.url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; TourismBot/1.0)',
          },
        });

        if (!response.ok) {
          console.warn(`Failed to fetch ${site.url}: ${response.status}`);
          continue;
        }

        const html = await response.text();
        
        // Extract content using basic HTML parsing
        const content = extractTourismContent(html, site);
        
        if (content.length > 0) {
          // Store the scraped content
          const { error: insertError } = await supabaseClient
            .from('tourism_content')
            .upsert(content.map(item => ({
              ...item,
              site_id: site.id,
              scraped_at: new Date().toISOString(),
            })), {
              onConflict: 'source_url',
            });

          if (insertError) {
            console.error(`Error inserting content for ${site.name}:`, insertError);
          } else {
            console.log(`Successfully scraped ${content.length} items from ${site.name}`);
            scrapedData.push(...content);
          }
        }

        // Update last scraped timestamp
        await supabaseClient
          .from('tourism_sites')
          .update({ last_scraped_at: new Date().toISOString() })
          .eq('id', site.id);

        // Add delay to be respectful to servers
        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (error) {
        console.error(`Error scraping ${site.name}:`, error);
        continue;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully scraped data from ${sites?.length || 0} sites`,
        totalItems: scrapedData.length,
        sites: sites?.map(s => s.name) || [],
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Scraping error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

function extractTourismContent(html: string, site: TourismSite): ScrapedContent[] {
  const content: ScrapedContent[] = [];
  
  try {
    // Enhanced HTML content extraction with better regex patterns
    const titleMatches = html.match(/<title[^>]*>([^<]+)<\/title>/gi) || [];
    const headingMatches = html.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/gi) || [];
    const paragraphMatches = html.match(/<p[^>]*>([^<]+)<\/p>/gi) || [];
    const imageMatches = html.match(/<img[^>]+src="([^"]+)"[^>]*>/gi) || [];
    const linkMatches = html.match(/<a[^>]+href="([^"]+)"[^>]*>([^<]+)<\/a>/gi) || [];
    const listMatches = html.match(/<li[^>]*>([^<]+)<\/li>/gi) || [];
    
    // Extract images with better URL handling
    const images = imageMatches
      .map(img => {
        const match = img.match(/src="([^"]+)"/);
        if (match) {
          let imgUrl = match[1];
          // Handle relative URLs
          if (imgUrl.startsWith('/')) {
            const baseUrl = new URL(site.url).origin;
            imgUrl = baseUrl + imgUrl;
          }
          return imgUrl;
        }
        return null;
      })
      .filter(Boolean)
      .slice(0, 5);

    // Enhanced extraction based on site type
    if (site.site_type === 'official' || site.site_type === 'government') {
      // Enhanced keyword matching for government portals
      const tourismKeywords = ['tourism', 'attraction', 'destination', 'visit', 'travel', 'heritage', 'temple', 'waterfall', 'hill station', 'park', 'wildlife', 'forest', 'accommodation', 'hotel', 'resort'];
      const locationKeywords = ['ranchi', 'jamshedpur', 'dhanbad', 'bokaro', 'deoghar', 'hazaribagh', 'giridih', 'ramgarh', 'chatra', 'palamu'];
      
      const relevantContent = paragraphMatches
        .map(p => p.replace(/<[^>]*>/g, '').trim())
        .filter(text => text.length > 50 && (
          tourismKeywords.some(keyword => text.toLowerCase().includes(keyword)) ||
          locationKeywords.some(keyword => text.toLowerCase().includes(keyword))
        ))
        .slice(0, 15);

      // Extract structured content from lists
      const listContent = listMatches
        .map(li => li.replace(/<[^>]*>/g, '').trim())
        .filter(text => text.length > 20 && tourismKeywords.some(keyword => 
          text.toLowerCase().includes(keyword)
        ))
        .slice(0, 10);

      relevantContent.forEach((text, index) => {
        if (text.length > 80) {
          // Try to extract location from content
          const location = locationKeywords.find(loc => 
            text.toLowerCase().includes(loc)
          );
          
          content.push({
            title: `${site.name} - Tourism Information ${index + 1}`,
            description: text.substring(0, 200) + (text.length > 200 ? '...' : ''),
            content: text,
            images: images,
            location: location ? location.charAt(0).toUpperCase() + location.slice(1) : null,
            source_url: site.url,
            category: 'tourism_info',
            metadata: {
              source_type: site.site_type,
              extraction_method: 'enhanced_parsing',
              extraction_date: new Date().toISOString()
            }
          });
        }
      });

      // Add list items as separate content
      listContent.forEach((text, index) => {
        content.push({
          title: `Tourism Facility - ${text.substring(0, 50)}`,
          description: text,
          content: text,
          source_url: site.url,
          category: 'facility',
          metadata: {
            source_type: site.site_type,
            content_type: 'list_item'
          }
        });
      });
    }

    // Handle registration portals differently
    if (site.site_type === 'registration') {
      const registrationKeywords = ['hotel', 'accommodation', 'tour operator', 'travel agent', 'resort', 'guest house'];
      
      const registrationContent = paragraphMatches
        .map(p => p.replace(/<[^>]*>/g, '').trim())
        .filter(text => text.length > 30 && registrationKeywords.some(keyword => 
          text.toLowerCase().includes(keyword)
        ))
        .slice(0, 8);

      registrationContent.forEach((text, index) => {
        content.push({
          title: `Registered Tourism Service ${index + 1}`,
          description: text.substring(0, 180) + (text.length > 180 ? '...' : ''),
          content: text,
          source_url: site.url,
          category: 'registered_service',
          metadata: {
            source_type: site.site_type,
            service_type: 'tourism_registration'
          }
        });
      });
    }

    // Handle environmental/heritage sites
    if (site.site_type === 'environmental' || site.site_type === 'heritage') {
      const conservationKeywords = ['biodiversity', 'heritage', 'conservation', 'protected', 'wildlife', 'forest', 'archaeological', 'historical'];
      
      const conservationContent = paragraphMatches
        .map(p => p.replace(/<[^>]*>/g, '').trim())
        .filter(text => text.length > 40 && conservationKeywords.some(keyword => 
          text.toLowerCase().includes(keyword)
        ))
        .slice(0, 12);

      conservationContent.forEach((text, index) => {
        content.push({
          title: `${site.site_type === 'heritage' ? 'Heritage' : 'Biodiversity'} Site ${index + 1}`,
          description: text.substring(0, 200) + (text.length > 200 ? '...' : ''),
          content: text,
          images: images,
          source_url: site.url,
          category: site.site_type,
          metadata: {
            source_type: site.site_type,
            conservation_type: site.site_type === 'heritage' ? 'cultural' : 'natural'
          }
        });
      });
    }
    
    // Extract headings as potential attractions/places
    headingMatches.forEach((heading, index) => {
      const cleanHeading = heading.replace(/<[^>]*>/g, '').trim();
      if (cleanHeading.length > 10 && cleanHeading.length < 100) {
        content.push({
          title: cleanHeading,
          description: `Information about ${cleanHeading} from ${site.name}`,
          source_url: site.url,
          category: 'attraction',
          metadata: {
            source_type: site.site_type,
            heading_level: heading.match(/<h([1-6])/)?.[1] || '1',
          }
        });
      }
    });

    // Add a general site summary
    if (titleMatches.length > 0) {
      const siteTitle = titleMatches[0].replace(/<[^>]*>/g, '').trim();
      content.push({
        title: siteTitle,
        description: `Official information from ${site.name}`,
        content: paragraphMatches.slice(0, 3).map(p => p.replace(/<[^>]*>/g, '')).join(' '),
        images: images,
        source_url: site.url,
        category: 'general',
        metadata: {
          source_type: site.site_type,
          is_main_content: true,
        }
      });
    }

  } catch (error) {
    console.error('Error extracting content:', error);
  }

  return content.filter(item => item.title && item.title.length > 0);
}