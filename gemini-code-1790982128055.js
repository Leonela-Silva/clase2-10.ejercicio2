// Configuración y conexión con Supabase
const SUPABASE_URL = 'https://vipxyjfjdnkfhxcukfut.supabase.co';
const SUPABASE_KEY = 'sb_publishable_BwdIhPDdZzhfDBGtDvoxuA__SLZjTTx';

// Crear el cliente de Supabase (usando la librería cargada por CDN)
const { createClient } = window.supabase;
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);