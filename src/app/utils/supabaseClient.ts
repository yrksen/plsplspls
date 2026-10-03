import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export const supabase = createClient(`https://${projectId}.supabase.co`, publicAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'trash-bin-auth-v1',
  },
});

export function mapSupabaseUser(user: any) {
  return {
    id: user.id,
    email: user.email,
    username:
      user.user_metadata?.username ||
      user.user_metadata?.full_name ||
      user.email?.split('@')[0] ||
      'User',
    profilePicture: user.user_metadata?.profilePicture || '',
    role: user.user_metadata?.role || 'user', // 'guest' | 'user' | 'moderator' | 'admin'
  };
}
