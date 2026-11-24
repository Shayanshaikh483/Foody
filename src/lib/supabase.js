import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL)
  || 'https://dabglumbyxelttzklccl.supabase.co';

const supabaseAnonKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY)
  || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhYmdsdW1ieXhlbHR0emtsY2NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU0Mjk0MzcsImV4cCI6MjExMTAwNTQzN30.efxDYdhV3HzJ4EQxeWA3kNDysKiskHHJK27aI_2EMF0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Save table reservation to Supabase backend
 */
export async function createReservationRecord(reservationData) {
  try {
    const payload = {
      booking_id: reservationData.bookingId,
      full_name: reservationData.fullName,
      email: reservationData.email,
      phone: reservationData.phone,
      guests: Number(reservationData.guests) || 2,
      reservation_date: reservationData.date || new Date().toISOString().split('T')[0],
      meal_period: reservationData.mealPeriod || 'dinner',
      time_slot: reservationData.timeSlot || '7:00 PM',
      seating_area: reservationData.seating || 'Main Dining Hall',
      occasion: reservationData.occasion || 'Casual Dinner',
      special_requests: reservationData.specialRequests || '',
      status: 'confirmed'
    };

    console.log('[Supabase] Inserting reservation payload:', payload);

    const { data, error } = await supabase
      .from('reservations')
      .insert([payload])
      .select();

    if (error) {
      console.error('[Supabase] Reservation error:', error);
      return { success: false, error };
    }
    console.log('[Supabase] Reservation saved successfully:', data);
    return { success: true, data };
  } catch (err) {
    console.error('[Supabase] Unexpected reservation exception:', err);
    return { success: false, error: err };
  }
}

/**
 * Save contact / guest inquiry to Supabase backend
 */
export async function createContactInquiryRecord(inquiryData) {
  try {
    const payload = {
      name: inquiryData.name,
      email: inquiryData.email,
      subject: inquiryData.subject || 'General Inquiry',
      message: inquiryData.message,
      status: 'new'
    };

    console.log('[Supabase] Inserting inquiry payload:', payload);

    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert([payload])
      .select();

    if (error) {
      console.error('[Supabase] Inquiry error:', error);
      return { success: false, error };
    }
    console.log('[Supabase] Inquiry saved successfully:', data);
    return { success: true, data };
  } catch (err) {
    console.error('[Supabase] Unexpected inquiry exception:', err);
    return { success: false, error: err };
  }
}

/**
 * Save food order to Supabase backend
 */
export async function createOrderRecord(orderData) {
  try {
    const payload = {
      order_id: orderData.orderId,
      customer_name: orderData.customer?.name || 'Guest',
      customer_phone: orderData.customer?.phone || '',
      order_type: orderData.customer?.orderType || 'dine-in',
      table_number: orderData.customer?.tableNumber || '',
      items: orderData.items || [],
      subtotal: Number(orderData.subtotal) || 0,
      discount: Number(orderData.discount) || 0,
      tax: Number(orderData.tax) || 0,
      total: Number(orderData.total) || 0,
      status: 'received'
    };

    console.log('[Supabase] Inserting order payload:', payload);

    const { data, error } = await supabase
      .from('orders')
      .insert([payload])
      .select();

    if (error) {
      console.error('[Supabase] Order error:', error);
      return { success: false, error };
    }
    console.log('[Supabase] Order saved successfully:', data);
    return { success: true, data };
  } catch (err) {
    console.error('[Supabase] Unexpected order exception:', err);
    return { success: false, error: err };
  }
}

/**
 * Save newsletter subscriber to Supabase backend
 */
export async function createNewsletterSubscription(email) {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }])
      .select();

    if (error) {
      if (error.code === '23505') {
        return { success: true, duplicate: true };
      }
      console.error('[Supabase] Newsletter error:', error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.error('[Supabase] Unexpected newsletter exception:', err);
    return { success: false, error: err };
  }
}
