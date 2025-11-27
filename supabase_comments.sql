-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  news_id BIGINT REFERENCES news(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Policies for comments
CREATE POLICY "Approved comments are viewable by everyone" 
  ON comments FOR SELECT 
  USING (status = 'approved');

CREATE POLICY "Anyone can insert comments" 
  ON comments FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admins can view all comments" 
  ON comments FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can update comments" 
  ON comments FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete comments" 
  ON comments FOR DELETE 
  USING (auth.role() = 'authenticated');
