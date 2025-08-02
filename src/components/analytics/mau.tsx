// app/analytics/mau.tsx
'use client'
import { Loader2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';

export default function MonthlyActiveUsers() {
  const [mauData, setMauData] = useState<Array<{month: string, users: number}>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMAU = async () => {
    try {
      const res = await fetch('/api/mau', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const response = await res.json();
      if(response.length > 0) {
        setIsLoading(false);
      }
      const formattedData = response.map(([month, users]: [string, number]) => ({
        month: new Date(month).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
        users
      }));

      setMauData(formattedData);
    } catch (error: any) {
      console.error('Error fetching MAU:', error);
      setMauData([]);
    }
  };

  useEffect(() => {
    fetchMAU();
  }, []);

  return (
    <Card className="bg-gradient-to-br from-purple-500/10 via-card to-purple-600/20 dark:from-purple-900/20 dark:to-purple-800/30 border-purple-200/50 dark:border-purple-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[5px] hover:-translate-y-3">
      <CardContent className='pt-6'>
      <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Active Users</p>
                </div>
      <div>
        {Array.isArray(mauData) && !isLoading ? (
          mauData.map((monthData) => (
            <div key={monthData.month}>
              <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent  mt-2">{monthData.users.toLocaleString()}</p>
            </div>
          ))
        ) : (<div className='text-xl text-white font-bold mt-2 flex items-center gap-2'>
          <Loader2 className='h-5 w-5 animate-spin' />
          Loading Active Users...
        </div>)
        }
      </div>
      </CardContent>
    </Card>
  );
};