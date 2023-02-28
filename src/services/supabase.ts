import { createClient } from '@supabase/supabase-js'

const SERVICE_KEY: string = (process.env.REACT_APP_SUPABASE_KEY as string)

const SUPABASE_URL = "https://arkeckkmaqpuidhpuyer.supabase.co"

export const supabase: any = createClient(SUPABASE_URL, SERVICE_KEY);

