import { createClient } from "@supabase/supabase-js"

const client = createClient(
    import.meta.env.VITE_PUBLIC_SUPABASE_URL!, 
    import.meta.env.VITE_PUBLIC_SUPABASE_KEY! 
) 

export default client