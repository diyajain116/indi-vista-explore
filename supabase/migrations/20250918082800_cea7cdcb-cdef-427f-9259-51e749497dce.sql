-- Add new official Jharkhand tourism data sources
INSERT INTO tourism_sites (name, url, site_type, is_active) VALUES
('Jharkhand Tourism eServices Portal', 'https://tourism.jharkhand.gov.in/', 'official', true),
('Jharkhand State Portal Tourism', 'https://jharkhand.gov.in/departments/tourism', 'government', true),
('Tourist Trade Registration Portal', 'https://touristtradereg.jharkhand.gov.in/', 'registration', true),
('Jharkhand Biodiversity Portal', 'https://jharkhand.gov.in/departments/forest-environment-climate-change', 'environmental', true),
('Jharkhand Heritage Sites', 'https://www.jharkhand.gov.in/departments/archaeology', 'heritage', true)
ON CONFLICT (url) DO NOTHING;