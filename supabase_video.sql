-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  youtube_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Policies for videos
CREATE POLICY "Public videos are viewable by everyone" 
  ON videos FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can insert videos" 
  ON videos FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update videos" 
  ON videos FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete videos" 
  ON videos FOR DELETE 
  USING (auth.role() = 'authenticated');
