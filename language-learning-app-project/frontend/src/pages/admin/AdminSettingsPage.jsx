import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminSettingsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>AdminSettingsPage</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Admin functionality will be implemented here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
