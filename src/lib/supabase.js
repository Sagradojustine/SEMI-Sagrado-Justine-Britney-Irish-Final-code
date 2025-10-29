import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://favchzpakppukkgqnbdx.supabase.co'
const supabaseKey =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhdmNoenBha3BwdWtrZ3FuYmR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNzIyNjQsImV4cCI6MjA3Njc0ODI2NH0.u9G61C8m_y873hHNAtCa_I9V13-TJ3hHcaBU4eTGXwY'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;

