import { createClient } from '@supabase/supabase-js';

// No Next.js usamos process.env e o prefixo NEXT_PUBLIC_
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Verificação de segurança (opcional, mas recomendada para não quebrar silenciosamente)
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Faltam as variáveis de ambiente do Supabase (NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY)');
}

export const supabase = createClient(supabaseUrl, supabaseKey);