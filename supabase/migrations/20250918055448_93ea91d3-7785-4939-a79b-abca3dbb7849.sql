-- Create tourism data tables for integrated content
CREATE TABLE public.tourism_sites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  site_type TEXT NOT NULL, -- 'official', 'government', 'guide'
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_scraped_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.tourism_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id UUID NOT NULL REFERENCES public.tourism_sites(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  images TEXT[], -- Array of image URLs
  location TEXT,
  district TEXT,
  category TEXT, -- 'attraction', 'hotel', 'guide', etc.
  contact_info JSONB,
  metadata JSONB, -- Additional structured data
  source_url TEXT,
  scraped_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.tourism_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tourism_content ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Tourism sites are publicly viewable" 
ON public.tourism_sites 
FOR SELECT 
USING (true);

CREATE POLICY "Tourism content is publicly viewable" 
ON public.tourism_content 
FOR SELECT 
USING (true);

-- Add indexes for better performance
CREATE INDEX idx_tourism_content_site_id ON public.tourism_content(site_id);
CREATE INDEX idx_tourism_content_district ON public.tourism_content(district);
CREATE INDEX idx_tourism_content_category ON public.tourism_content(category);
CREATE INDEX idx_tourism_content_scraped_at ON public.tourism_content(scraped_at);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_tourism_sites_updated_at
BEFORE UPDATE ON public.tourism_sites
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tourism_content_updated_at
BEFORE UPDATE ON public.tourism_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert the provided tourism sites
INSERT INTO public.tourism_sites (name, url, site_type) VALUES
('Jharkhand Tourism Official', 'https://tourism.jharkhand.gov.in/Home', 'official'),
('Jharkhand Government Tourism', 'https://www.jharkhand.gov.in/home/AboutTourism', 'government'),
('Incredible India Jharkhand', 'https://www.incredibleindia.gov.in/en/jharkhand', 'government'),
('District Ranchi Tourism', 'https://ranchi.nic.in/tourism/', 'government'),
('District Chatra Tourism', 'https://chatra.nic.in/tourism/', 'government'),
('Travel Jharkhand Guide', 'https://www.traveljharkhand.com/', 'guide'),
('Jharkhand Tourism Guide', 'https://www.jharkhandtourism.org/', 'guide');