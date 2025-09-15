import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Download, Star, MessageSquare, MapPin, Calendar } from 'lucide-react';

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
  category: 'accommodation' | 'transport' | 'safety' | 'attraction' | 'general';
  status: 'approved' | 'pending' | 'flagged';
}

const mockReviews: TouristReview[] = [
  {
    id: 'REV-001',
    touristId: 'TID-001',
    touristName: 'John Smith',
    location: 'Kaziranga National Park',
    state: 'Assam',
    district: 'Golaghat',
    timestamp: '2024-01-15 14:30',
    reviewText: 'Amazing wildlife experience! The park is well-maintained and the safari guides are knowledgeable. Saw elephants, rhinos, and many bird species.',
    rating: 5,
    category: 'attraction',
    status: 'approved'
  },
  {
    id: 'REV-002',
    touristId: 'TID-002',
    touristName: 'Maria Garcia',
    location: 'Alleppey Backwaters',
    state: 'Kerala',
    district: 'Alappuzha',
    timestamp: '2024-01-14 18:45',
    reviewText: 'Beautiful houseboat experience. The scenery is breathtaking and the local food is delicious. However, some areas need better maintenance.',
    rating: 4,
    category: 'accommodation',
    status: 'approved'
  },
  {
    id: 'REV-003',
    touristId: 'TID-003',
    touristName: 'Hans Mueller',
    location: 'Hawa Mahal',
    state: 'Rajasthan',
    district: 'Jaipur',
    timestamp: '2024-01-13 10:15',
    reviewText: 'The architecture is stunning but the crowd management could be improved. Long queues and limited parking space.',
    rating: 3,
    category: 'attraction',
    status: 'pending'
  },
  {
    id: 'REV-004',
    touristId: 'TID-004',
    touristName: 'Sarah Johnson',
    location: 'Baga Beach',
    state: 'Goa',
    district: 'North Goa',
    timestamp: '2024-01-12 20:30',
    reviewText: 'Great beach with water sports facilities. The local vendors are friendly but sometimes pushy. Safety measures could be better at night.',
    rating: 4,
    category: 'safety',
    status: 'flagged'
  },
  {
    id: 'REV-005',
    touristId: 'TID-005',
    touristName: 'Akira Tanaka',
    location: 'Marina Beach',
    state: 'Tamil Nadu',
    district: 'Chennai',
    timestamp: '2024-01-11 16:20',
    reviewText: 'Long beautiful beach perfect for evening walks. Clean and well-maintained. Great street food options nearby.',
    rating: 5,
    category: 'attraction',
    status: 'approved'
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
      review.touristName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.reviewText.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = filterState === 'all' || review.state === filterState;
    const matchesDistrict = filterDistrict === 'all' || review.district === filterDistrict;
    const matchesCategory = filterCategory === 'all' || review.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || review.status === filterStatus;

    return matchesSearch && matchesState && matchesDistrict && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      approved: 'bg-success text-success-foreground',
      pending: 'bg-warning text-warning-foreground',
      flagged: 'bg-danger text-danger-foreground'
    };
    return variants[status as keyof typeof variants] || variants.approved;
  };

  const getCategoryBadge = (category: string) => {
    const variants = {
      accommodation: 'bg-blue-100 text-blue-800',
      transport: 'bg-green-100 text-green-800',
      safety: 'bg-red-100 text-red-800',
      attraction: 'bg-purple-100 text-purple-800',
      general: 'bg-gray-100 text-gray-800'
    };
    return variants[category as keyof typeof variants] || variants.general;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
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
          <p className="text-subtext">Monitor and manage tourist feedback and reviews</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
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
            <CardTitle className="text-sm">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-heading">
                {(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)}
              </div>
              <div className="flex">
                {renderStars(Math.round(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Pending Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {reviews.filter(r => r.status === 'pending').length}
            </div>
            <p className="text-xs text-subtext">Need approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Flagged Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">
              {reviews.filter(r => r.status === 'flagged').length}
            </div>
            <p className="text-xs text-subtext">Require attention</p>
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
            Search and filter tourist reviews by various criteria
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search reviews, locations, tourists..."
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
                  <SelectItem value="safety">Safety</SelectItem>
                  <SelectItem value="attraction">Attraction</SelectItem>
                  <SelectItem value="general">General</SelectItem>
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
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tourist</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{review.touristName}</div>
                        <div className="text-sm text-muted-foreground">{review.touristId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{review.location}</div>
                          <div className="text-sm text-muted-foreground">{review.state}, {review.district}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-sm line-clamp-2">{review.reviewText}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                        <span className="text-sm font-medium ml-1">{review.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryBadge(review.category)}>
                        {review.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(review.status)}>
                        {review.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {review.timestamp}
                      </div>
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