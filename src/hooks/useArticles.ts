import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, getStorageUrl } from '@/lib/supabase';

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_path: string | null;
  author: string;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ArticleWithUrls extends Article {
  coverImageUrl: string | null;
}

function addUrls(article: Article): ArticleWithUrls {
  return {
    ...article,
    coverImageUrl: article.cover_image_path
      ? getStorageUrl('publications', article.cover_image_path)
      : null,
  };
}

/** Public: fetch only published articles */
export function useArticles() {
  return useQuery({
    queryKey: ['articles', 'public'],
    queryFn: async (): Promise<ArticleWithUrls[]> => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(addUrls);
    },
  });
}

/** Admin: fetch ALL articles */
export function useAdminArticles() {
  return useQuery({
    queryKey: ['articles', 'admin'],
    queryFn: async (): Promise<ArticleWithUrls[]> => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(addUrls);
    },
  });
}

/** Fetch a single article by ID */
export function useArticle(id: string | undefined) {
  return useQuery({
    queryKey: ['articles', id],
    enabled: !!id,
    queryFn: async (): Promise<ArticleWithUrls | null> => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id!)
        .single();

      if (error) throw error;
      return data ? addUrls(data) : null;
    },
  });
}

/** Fetch a single article by slug (public) */
export function useArticleBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ['articles', 'slug', slug],
    enabled: !!slug,
    queryFn: async (): Promise<ArticleWithUrls | null> => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug!)
        .eq('is_published', true)
        .single();

      if (error) throw error;
      return data ? addUrls(data) : null;
    },
  });
}

export interface ArticleInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  is_published?: boolean;
  published_at?: string | null;
  cover_image_path?: string | null;
}

export function useCreateArticle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: ArticleInput) => {
      const payload = {
        ...input,
        published_at: input.is_published ? new Date().toISOString() : null,
      };
      const { data, error } = await supabase
        .from('articles')
        .insert(payload)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: ArticleInput & { id: string }) => {
      const payload = {
        ...input,
        published_at: input.is_published && !input.published_at
          ? new Date().toISOString()
          : input.published_at,
      };
      const { data, error } = await supabase
        .from('articles')
        .update(payload)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
}

export function useDeleteArticle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('articles').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
}

/** Upload an article cover image */
export async function uploadArticleCover(file: File): Promise<string> {
  const ext = file.name.split('.').pop();
  const fileName = `articles/covers/${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;

  const { error } = await supabase.storage
    .from('publications')
    .upload(fileName, file, { cacheControl: '3600', upsert: false });

  if (error) throw error;
  return fileName;
}
