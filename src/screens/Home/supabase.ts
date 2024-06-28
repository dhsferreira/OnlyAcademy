import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cdqdjbuvwwpbzltkdxzj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcWRqYnV2d3dwYnpsdGtkeHpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzNTM2MTUsImV4cCI6MjAzNDkyOTYxNX0.btTbe-QQmjSP4bjqiqeri7nv2WkQC47t1pa9h4YZFmk';
export const supabase = createClient(supabaseUrl, supabaseKey);
