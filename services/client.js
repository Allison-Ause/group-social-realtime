const SUPABASE_URL = 'https://jjemswjalpxcogkgbjkg.supabase.co';
const SUPABASE_KEY =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZW1zd2phbHB4Y29na2diamtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc3NDIyMTIsImV4cCI6MTk3MzMxODIxMn0.vor0kyLIbN7db_Gj85naEdoo0F-4NgY2YTd0EKrfaGI';

export const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function checkResponse({ error, data }) {
    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return null;
    }

    return data;
}
