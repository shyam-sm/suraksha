import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Reviews() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-heading">Reviews</h1>
        <p className="text-subtext">Manage tourist reviews and feedback</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Review Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Review management features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}