-- Create newsletter_subscribers table for email capture
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'quickprintz', -- Track where the email came from
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- RLS Policy - Allow public inserts for newsletter signup
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (true);

-- RLS Policy - Only authenticated users can view subscribers
CREATE POLICY "Only authenticated users can view subscribers"
ON public.newsletter_subscribers
FOR SELECT
TO authenticated
USING (true);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_newsletter_subscribers_updated_at
BEFORE UPDATE ON public.newsletter_subscribers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add index on email for fast lookups
CREATE INDEX newsletter_subscribers_email_idx ON public.newsletter_subscribers(email);
CREATE INDEX newsletter_subscribers_source_idx ON public.newsletter_subscribers(source);