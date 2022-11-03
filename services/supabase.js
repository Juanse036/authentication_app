
const { createClient } = require('@supabase/supabase-js')


const SUPABASE_KEY_DATA = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsemp4bGtoYmVyem5ya3B6d2tkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2MzYxNDQ5NCwiZXhwIjoxOTc5MTkwNDk0fQ.uvQq0dGTf7R7ks0mxXdsmdakXDsmVgEA6-NwxH_WJlM"

const supabaseUrl = 'https://slzjxlkhberznrkpzwkd.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY || SUPABASE_KEY_DATA
const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = {
    supabase
}