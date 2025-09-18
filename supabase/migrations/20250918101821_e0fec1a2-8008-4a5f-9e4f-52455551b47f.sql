-- Add unique constraint to tourism_content table to fix upsert operations
-- This will allow the scraping function to properly handle duplicate content
ALTER TABLE public.tourism_content 
ADD CONSTRAINT tourism_content_site_url_unique 
UNIQUE (site_id, source_url);

-- Also add an index for better performance when querying by site
CREATE INDEX IF NOT EXISTS idx_tourism_content_site_id ON public.tourism_content(site_id);

-- Add index for category-based queries
CREATE INDEX IF NOT EXISTS idx_tourism_content_category ON public.tourism_content(category);

-- Add index for location-based queries  
CREATE INDEX IF NOT EXISTS idx_tourism_content_location ON public.tourism_content(location);