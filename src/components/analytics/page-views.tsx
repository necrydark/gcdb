// app/analytics/page.tsx
'use client'
import { Eye, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';

export default function PageViews() {
  const [pageviews, setPageviews] = useState<Array<{date: string, views: number}>>([]);
  const [isLoading, setIsLoading] = useState(true);


  const fetchPageviews = async () => {
    try {
      const res = await fetch('/api/pageviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const response = await res.json();
      if(response.length > 0) {
        setIsLoading(false);
      }
      const formattedData = response.map(([date, views]: [string, number]) => ({
        date,
        views
      }));

      setPageviews(formattedData);
    } catch (error: any) {
      console.error('Error fetching pageviews:', error);
      setPageviews([]);
    }
  };

  useEffect(() => {
    fetchPageviews();
  }, []);


  console.log(pageviews);
  return (
    <Card className="bg-gradient-to-br from-blue-500/10 via-card to-blue-600/20 dark:from-blue-900/20 dark:to-blue-800/30 border-blue-200/50 dark:border-blue-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
      <CardContent className='pt-6'>
      <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">Total Page Views</p>
                </div>
      <div>
      {Array.isArray(pageviews) && !isLoading ? (
  pageviews.map((day) => (
    <div key={day.date}>
      <p className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mt-2'>2</p>
    </div>
  ))
) :  (<div className='text-xl dark:text-white font-bold mt-2 flex items-center gap-2'>
  <Loader2 className='h-5 w-5 animate-spin' />
  Loading Page Views...
</div>)
}
      </div>
      </CardContent>
    </Card>
  );
};


