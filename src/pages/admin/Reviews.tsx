import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Star, MessageSquare, MapPin, Calendar, Filter } from 'lucide-react';

interface TouristReview {
  id: string;
  touristId: string;
  touristName: string;
  location: string;
  state: string;
  district: string;
  timestamp: string;
  reviewText: string;
  rating: number;
  category: 'accommodation' | 'transport' | 'attraction' | 'restaurant' | 'service';
  status: 'pending' | 'approved' | 'rejected';
}

const mockReviews: TouristReview[] = [
  {
    id: 'REV-001',
    touristId: 'TID-001',
    touristName: 'John Smith',
    location: 'Kaziranga National Park',
    state: 'Assam',
    district: 'Jorhat',
    timestamp: '2024-01-15 10:30',
    reviewText: 'Amazing wildlife sanctuary! Saw one-horned rhinos and elephants. The safari was well-organized and guides were knowledgeable. Highly recommended for nature lovers.',
    rating: 5,
    category: 'attraction',
    status: 'approved'
  },
  {
    id: 'REV-002',
    touristId: 'TID-002',
    touristName: 'Maria Garcia',
    location: 'Backwater Cruise',
    state: 'Kerala',
    district: 'Alleppey',
    timestamp: '2024-01-14 16:45',
    reviewText: 'Peaceful and serene experience on the backwaters. The houseboat was comfortable with good food. Staff was friendly and helpful throughout the journey.',
    rating: 4,
    category: 'accommodation',
    status: 'approved'
  },
  {
    id: 'REV-003',
    touristId: 'TID-003',
    touristName: 'David Chen',
    location: 'City Palace',
    state: 'Rajasthan',
    district: 'Udaipur',
    timestamp: '2024-01-13 14:20',
    reviewText: 'Magnificent architecture and rich history! The palace museum has extensive collections. However, it was very crowded during peak hours.',
    rating: 4,
    category: 'attraction',
    status: 'pending'
  },
  {
    id: 'REV-004',
    touristId: 'TID-004',
    touristName: 'Sarah Johnson',
    location: 'Beach Resort Calangute',
    state: 'Goa',
    district: 'North Goa',
    timestamp: '2024-01-12 19:30',
    reviewText: 'Great beach location with clean rooms and excellent service. The restaurant served delicious Goan cuisine. Perfect for a relaxing vacation.',
    rating: 5,
    category: 'accommodation',
    status: 'approved'
  },
  {
    id: 'REV-005',
    touristId: 'TID-005',
    touristName: 'Michael Brown',
    location: 'Local Transport Service',
    state: 'Tamil Nadu',
    district: 'Chennai',
    timestamp: '2024-01-11 08:15',
    reviewText: 'The cab service was punctual and the driver was courteous. Vehicle was clean and well-maintained. Good value for money.',
    rating: 4,
    category: 'transport',
    status: 'approved'
  },
  {
    id: 'REV-006',
    touristId: 'TID-006',
    touristName: 'Emma Wilson',
    location: 'Spice Garden Restaurant',
    state: 'Kerala',
    district: 'Kochi',
    timestamp: '2024-01-10 20:45',
    reviewText: 'Authentic Kerala cuisine with amazing flavors. The ambiance was nice but service was a bit slow during dinner time.',
    rating: 3,
    category: 'restaurant',
    status: 'pending'
  }
];

export default function Reviews() {
  const [reviews] = useState<TouristReview[]>(mockReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('all');
  const [filterDistrict, setFilterDistrict] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.reviewText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.touristName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.touristId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = filterState === 'all' || review.state === filterState;
    const matchesDistrict = filterDistrict === 'all' || review.district === filterDistrict;
    const matchesCategory = filterCategory === 'all' || review.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || review.status === filterStatus;

    return matchesSearch && matchesState && matchesDistrict && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-amber-100 text-amber-800',
      approved: 'bg-emerald-100 text-emerald-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const getCategoryBadge = (category: string) => {
    const variants = {
      accommodation: 'bg-blue-100 text-blue-800',
      transport: 'bg-purple-100 text-purple-800',
      attraction: 'bg-green-100 text-green-800',
      restaurant: 'bg-orange-100 text-orange-800',
      service: 'bg-gray-100 text-gray-800'
    };
    return variants[category as keyof typeof variants] || variants.service;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const uniqueStates = [...new Set(reviews.map(r => r.state))];
  const uniqueDistricts = [...new Set(reviews.map(r => r.district))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-heading">Tourist Reviews</h1>
          <p className="text-subtext">Monitor and manage tourist feedback and experiences</p>
        </div>
        <Button variant="outline">
          <MessageSquare className="h-4 w-4 mr-2" />
          Export Reviews
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-heading">{reviews.length}</div>
            <p className="text-xs text-subtext">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {reviews.filter(r => r.status === 'pending').length}
            </div>
            <p className="text-xs text-subtext">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-heading">
              {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
            </div>
            <div className="flex items-center gap-1 mt-1">
              {renderStars(Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Approved Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {reviews.filter(r => r.status === 'approved').length}
            </div>
            <p className="text-xs text-subtext">Published</p>
          </CardContent>
        </Card>
      </div>

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Review Database
          </CardTitle>
          <CardDescription>
            Track and moderate tourist reviews by location and category
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <Label>State</Label>
              <Select value={filterState} onValueChange={setFilterState}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {uniqueStates.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>District</Label>
              <Select value={filterDistrict} onValueChange={setFilterDistrict}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  {uniqueDistricts.map(district => (
                    <SelectItem key={district} value={district}>{district}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Category</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="accommodation">Accommodation</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="attraction">Attraction</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tourist ID</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead className="w-1/3">Review Text</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.map((review) => (
                  <TableRow key={review.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div>
                        <p className="font-medium">{review.touristId}</p>
                        <p className="text-sm text-muted-foreground">{review.touristName}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium">{review.location}</p>
                          <p className="text-sm text-muted-foreground">{review.state}, {review.district}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {review.timestamp}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-lg">
                      <p className="text-sm">{review.reviewText}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                        <span className="ml-1 text-sm font-medium">{review.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryBadge(review.category)}>
                        {review.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`${
                          review.status === 'approved' 
                            ? 'text-emerald-600 hover:text-emerald-700' 
                            : 'text-red-600 hover:text-red-700'
                        }`}
                      >
                        {review.status === 'approved' ? 'Approved' : 'Hidden'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No reviews found matching your criteria.
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            Showing {filteredReviews.length} of {reviews.length} reviews
          </div>
        </CardContent>
      </Card>
    </div>
  );
}