import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, getStorageUrl } from '@/lib/supabase';

export interface Publication {
  id: string;
  category_id: string;
  title: string;
  summary: string;
  date: string;
  pdf_path: string | null;
  cover_image_path: string | null;
  badge: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface PublicationWithUrls extends Publication {
  pdfUrl: string | null;
  coverImageUrl: string | null;
}

function addUrls(pub: Publication): PublicationWithUrls {
  return {
    ...pub,
    pdfUrl: pub.pdf_path ? getStorageUrl('publications', pub.pdf_path) : null,
    coverImageUrl: pub.cover_image_path
      ? getStorageUrl('publications', pub.cover_image_path)
      : null,
  };
}

/** Public: fetch only published publications */
export function usePublications(categoryId?: string | null) {
  return useQuery({
    queryKey: ['publications', 'public', categoryId],
    queryFn: async (): Promise<PublicationWithUrls[]> => {
      let query = supabase
        .from('publications')
        .select('*')
        .eq('is_published', true)
        .order('date', { ascending: false });

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data || []).map(addUrls);
    },
  });
}

/** Admin: fetch ALL publications (drafts included) */
export function useAdminPublications() {
  return useQuery({
    queryKey: ['publications', 'admin'],
    queryFn: async (): Promise<PublicationWithUrls[]> => {
      const { data, error } = await supabase
        .from('publications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(addUrls);
    },
  });
}

/** Fetch a single publication by ID */
export function usePublication(id: string | undefined) {
  return useQuery({
    queryKey: ['publications', id],
    enabled: !!id,
    queryFn: async (): Promise<PublicationWithUrls | null> => {
      const { data, error } = await supabase
        .from('publications')
        .select('*')
        .eq('id', id!)
        .single();

      if (error) throw error;
      return data ? addUrls(data) : null;
    },
  });
}

export interface PublicationInput {
  category_id: string;
  title: string;
  summary: string;
  date: string;
  badge?: string;
  is_published?: boolean;
  pdf_path?: string | null;
  cover_image_path?: string | null;
}

export function useCreatePublication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: PublicationInput) => {
      const { data, error } = await supabase
        .from('publications')
        .insert(input)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publications'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

export function useUpdatePublication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: PublicationInput & { id: string }) => {
      const { data, error } = await supabase
        .from('publications')
        .update(input)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publications'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

export function useDeletePublication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('publications').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publications'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

/** Upload a file to the publications bucket */
export async function uploadPublicationFile(
  file: File,
  folder: 'pdfs' | 'covers'
): Promise<string> {
  const ext = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;

  const { error } = await supabase.storage
    .from('publications')
    .upload(fileName, file, { cacheControl: '3600', upsert: false });

  if (error) throw error;
  return fileName;
}

/** Delete a file from the publications bucket */
export async function deletePublicationFile(path: string): Promise<void> {
  const { error } = await supabase.storage.from('publications').remove([path]);
  if (error) throw error;
}
