import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TouristManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-heading">Tourist Management</h1>
        <p className="text-subtext">Manage tourist registrations and verifications</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tourist Management System</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Tourist management features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}