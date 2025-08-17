import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 pt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>LeaderboardPage</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This page will be implemented with full functionality.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeaderboardPage;
