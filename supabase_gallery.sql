-- Create galleries table
CREATE TABLE IF NOT EXISTS galleries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  gallery_id UUID REFERENCES galleries(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Policies for galleries
CREATE POLICY "Public galleries are viewable by everyone" 
  ON galleries FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can insert galleries" 
  ON galleries FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update galleries" 
  ON galleries FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete galleries" 
  ON galleries FOR DELETE 
  USING (auth.role() = 'authenticated');

-- Policies for gallery_images
CREATE POLICY "Public gallery images are viewable by everyone" 
  ON gallery_images FOR SELECT 
  USING (true);

CREATE POLICY "Admins can insert gallery images" 
  ON gallery_images FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update gallery images" 
  ON gallery_images FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete gallery images" 
  ON gallery_images FOR DELETE 
  USING (auth.role() = 'authenticated');

-- Create storage bucket for gallery images if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gallery-images', 'gallery-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Gallery images are publicly accessible"
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'gallery-images' );

CREATE POLICY "Admins can upload gallery images"
  ON storage.objects FOR INSERT
  WITH CHECK ( bucket_id = 'gallery-images' AND auth.role() = 'authenticated' );

CREATE POLICY "Admins can update gallery images"
  ON storage.objects FOR UPDATE
  USING ( bucket_id = 'gallery-images' AND auth.role() = 'authenticated' );

CREATE POLICY "Admins can delete gallery images"
  ON storage.objects FOR DELETE
  USING ( bucket_id = 'gallery-images' AND auth.role() = 'authenticated' );
