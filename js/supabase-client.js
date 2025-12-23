// Supabase Configuration
const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // Replace with your actual Supabase URL
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Replace with your actual Anon Key

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper functions for common operations

/**
 * Submit a contact message
 */
async function submitContactMessage(data) {
    const { error } = await supabaseClient
        .from('contact_messages')
        .insert([data]);
    return { success: !error, error };
}

/**
 * Submit a donation intent
 */
async function submitDonationIntent(data) {
    const { error } = await supabaseClient
        .from('donations')
        .insert([data]);
    return { success: !error, error };
}

/**
 * Fetch all campaigns
 */
async function fetchCampaigns() {
    const { data, error } = await supabaseClient
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });
    return { data, error };
}

/**
 * Sign in admin
 */
async function adminSignIn(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
    });
    return { data, error };
}

/**
 * Sign out admin
 */
async function adminSignOut() {
    const { error } = await supabaseClient.auth.signOut();
    return { success: !error, error };
}

/**
 * Get current session
 */
async function getSession() {
    return await supabaseClient.auth.getSession();
}
