import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://wygybnvbbpbupbasioml.supabase.co';
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_EatZsarnVbhT1A9E23D6iw_9yHVYs8q';

export const supabase = createClient(supabaseUrl, supabaseKey);
