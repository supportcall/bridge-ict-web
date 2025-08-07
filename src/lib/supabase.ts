import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface ContactFormData {
  name: string
  email: string
  company?: string
  phone?: string
  service?: string
  message: string
}

export const sendContactEmail = async (formData: ContactFormData) => {
  const { data, error } = await supabase.functions.invoke('send-contact-email', {
    body: formData
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}