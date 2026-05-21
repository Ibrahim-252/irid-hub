import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  display_order: number;
}

export interface CategoryWithCount extends Category {
  count: number;
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<CategoryWithCount[]> => {
      const { data: categories, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order');

      if (error) throw error;

      // Get publication counts per category
      const { data: publications } = await supabase
        .from('publications')
        .select('category_id')
        .eq('is_published', true);

      const counts: Record<string, number> = {};
      publications?.forEach((p) => {
        counts[p.category_id] = (counts[p.category_id] || 0) + 1;
      });

      return (categories || []).map((cat) => ({
        ...cat,
        count: counts[cat.id] || 0,
      }));
    },
  });
}
