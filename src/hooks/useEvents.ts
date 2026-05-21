import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, getStorageUrl } from '@/lib/supabase';

export interface Event {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  event_date: string;
  event_time: string | null;
  location: string;
  speaker: string | null;
  banner_image_path: string | null;
  gallery_image_paths: string[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventWithUrls extends Event {
  bannerImageUrl: string | null;
  galleryImageUrls: string[];
}

function addUrls(event: Event): EventWithUrls {
  return {
    ...event,
    bannerImageUrl: event.banner_image_path
      ? getStorageUrl('publications', event.banner_image_path)
      : null,
    galleryImageUrls: (event.gallery_image_paths || []).map(path => 
      getStorageUrl('publications', path)
    ),
  };
}

/** Public: fetch only published events */
export function useEvents() {
  return useQuery({
    queryKey: ['events', 'public'],
    queryFn: async (): Promise<EventWithUrls[]> => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_published', true)
        .order('event_date', { ascending: false });

      if (error) throw error;
      return (data || []).map(addUrls);
    },
  });
}

/** Admin: fetch ALL events */
export function useAdminEvents() {
  return useQuery({
    queryKey: ['events', 'admin'],
    queryFn: async (): Promise<EventWithUrls[]> => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false });

      if (error) throw error;
      return (data || []).map(addUrls);
    },
  });
}

/** Fetch a single event by ID */
export function useEvent(id: string | undefined) {
  return useQuery({
    queryKey: ['events', id],
    enabled: !!id,
    queryFn: async (): Promise<EventWithUrls | null> => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id!)
        .single();

      if (error) throw error;
      return data ? addUrls(data) : null;
    },
  });
}

export interface EventInput {
  title: string;
  subtitle?: string | null;
  description: string;
  event_date: string;
  event_time?: string | null;
  location: string;
  speaker?: string | null;
  banner_image_path?: string | null;
  gallery_image_paths?: string[];
  is_published?: boolean;
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: EventInput) => {
      const { data, error } = await supabase
        .from('events')
        .insert(input)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: EventInput & { id: string }) => {
      const { data, error } = await supabase
        .from('events')
        .update(input)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}

/** Upload an event image (banner or gallery) */
export async function uploadEventImage(file: File, type: 'banner' | 'gallery'): Promise<string> {
  const ext = file.name.split('.').pop();
  const folder = type === 'banner' ? 'banners' : 'gallery';
  const fileName = `events/${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;

  const { error } = await supabase.storage
    .from('publications')
    .upload(fileName, file, { cacheControl: '3600', upsert: false });

  if (error) throw error;
  return fileName;
}
