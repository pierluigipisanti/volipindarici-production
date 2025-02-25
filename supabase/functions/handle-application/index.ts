import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const payload = await req.json()
    const { record } = payload

    // Invia email all'amministratore
    const emailContent = `
      Nuova candidatura ricevuta!
      
      Nome: ${record.name}
      Email: ${record.email}
      Posizione: ${record.position}
      Superpotere: ${record.superpower}
      
      Perché proprio lui/lei: ${record.whyYou}
      
      Idea più folle: ${record.craziest_idea}
      
      Data: ${new Date(record.created_at).toLocaleString('it-IT')}
    `

    // Invia email usando il servizio email di Supabase
    const { error: emailError } = await supabaseClient
      .from('supabase_functions')
      .select('*')
      .eq('name', 'send-email')
      .single()
      .then(async () => {
        return await supabaseClient.auth.admin.sendEmail({
          email: 'admin@volipindarici.com',
          subject: `Nuova candidatura da ${record.name}`,
          content: emailContent,
        })
      })

    if (emailError) throw emailError

    return new Response(
      JSON.stringify({ message: 'Email notification sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})