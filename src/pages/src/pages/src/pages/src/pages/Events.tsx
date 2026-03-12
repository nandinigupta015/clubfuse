import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  Filter,
  Star,
  CheckCircle,
  ExternalLink
} from "lucide-react";

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const eventCategories = [
    { id: "all", name: "All Events" },
    { id: "workshop", name: "Workshops" },
    { id: "competition", name: "Competitions" },
    { id: "social", name: "Social" },
    { id: "academic", name: "Academic" },
    { id: "sports", name: "Sports" },
  ];

  const events = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      description: "Learn modern web development with React, Node.js, and database integration",
      club: "Tech Innovators Club",
      category: "workshop",
      date: "2024-01-25",
      time: "2:00 PM - 6:00 PM",
      location: "Computer Lab A, Building 3",
      attendees: 45,
      maxAttendees: 50,
      price: "Free",
      difficulty: "Intermediate",
      tags: ["React", "Node.js", "Full Stack"],
      isRegistered: true,
      isFeatured: true,
      image: "💻"
    },
    {
      id: 2,
      title: "Annual Art Exhibition",
      description: "Showcase of student artwork including paintings, sculptures, and digital art",
      club: "Creative Arts Society",
      category: "social",
      date: "2024-01-28",
      time: "10:00 AM - 8:00 PM",
      location: "Main Gallery, Arts Building",
      attendees: 150,
      maxAttendees: 200,
      price: "Free",
      difficulty: "All Levels",
      tags: ["Art", "Exhibition", "Culture"],
      isRegistered: false,
      isFeatured: true,
      image: "🎨"
    },
    {
      id: 3,
      title: "Photography Walk: Campus Edition",
      description: "Explore campus through photography with tips from professional photographers",
      club: "Photography Enthusiasts",
      category: "workshop",
      date: "2024-02-02",
      time: "7:00 AM - 10:00 AM",
      location: "Meet at Campus Main Gate",
      attendees: 25,
      maxAttendees: 30,
      price: "₹100",
      difficulty: "Beginner",
      tags: ["Photography", "Outdoor", "Learning"],
      isRegistered: true,
      isFeatured: false,
      image: "📸"
    },
    {
      id: 4,
      title: "Music Concert: Evening Melodies",
      description: "Live performances by student musicians featuring classical and contemporary music",
      club: "Music Harmony Club",
      category: "social",
      date: "2024-02-05",
      time: "6:00 PM - 9:00 PM",
      location: "University Auditorium",
      attendees: 280,
      maxAttendees: 300,
      price: "₹50",
      difficulty: "All Levels",
      tags: ["Music", "Concert", "Live Performance"],
      isRegistered: false,
      isFeatured: false,
      image: "🎵"
    },
    {
      id: 5,
      title: "Sustainability Summit 2024",
      description: "Conference on environmental sustainability with expert speakers and workshops",
      club: "Green Earth Initiative",
      category: "academic",
      date: "2024-02-10",
      time: "9:00 AM - 5:00 PM",
      location: "Conference Hall, Administrative Block",
      attendees: 120,
      maxAttendees: 150,
      price: "₹200",
      difficulty: "All Levels",
      tags: ["Environment", "Sustainability", "Conference"],
      isRegistered: false,
      isFeatured: true,
      image: "🌱"
    },
    {
      id: 6,
      title: "Inter-College Basketball Tournament",
      description: "Competitive basketball tournament with teams from multiple colleges",
      club: "Sports Champions",
      category: "sports",
      date: "2024-02-15",
      time: "8:00 AM - 6:00 PM",
      location: "Sports Complex, Court 1 & 2",
      attendees: 200,
      maxAttendees: 400,
      price: "Free",
      difficulty: "Competitive",
      tags: ["Basketball", "Tournament", "Sports"],
      isRegistered: true,
      isFeatured: false,
      image: "🏀"
    },
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.club.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const upcomingEvents = events.slice(0, 3);
  const featuredEvents = events.filter(event => event.isFeatured);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Campus Events</h1>
          <p className="text-muted-foreground">
            Discover exciting events, workshops, and activities happening on campus
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events by title, description, or club..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {eventCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
          </TabsList>
          
          {/* All Events */}
          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No events found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find more events
                </p>
              </div>
            )}
          </TabsContent>
          
          {/* Upcoming Events */}
          <TabsContent value="upcoming" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} upcoming={true} />
              ))}
            </div>
          </TabsContent>
          
          {/* Featured Events */}
          <TabsContent value="featured" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} featured={true} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function EventCard({ event, upcoming = false, featured = false }: { 
  event: any; 
  upcoming?: boolean; 
  featured?: boolean; 
}) {
  const attendancePercentage = (event.attendees / event.maxAttendees) * 100;
  
  return (
    <Card className="group hover:shadow-primary transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="relative">
        {event.isFeatured && (
          <Badge className="absolute top-4 right-4 bg-warning text-warning-foreground">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        )}
        
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-lg bg-gradient-primary flex items-center justify-center text-3xl flex-shrink-0">
            {event.image}
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl mb-1">{event.title}</CardTitle>
            <p className="text-sm text-primary font-medium">{event.club}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {event.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {event.time}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <CardDescription className="text-sm leading-relaxed">
          {event.description}
        </CardDescription>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span>{event.location}</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {event.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Attendance Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              {event.attendees}/{event.maxAttendees} attendees
            </span>
            <span className="text-muted-foreground">{Math.round(attendancePercentage)}% full</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary rounded-full h-2 transition-all duration-300"
              style={{ width: `${attendancePercentage}%` }}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">
              {event.price === "Free" ? (
                <Badge variant="secondary" className="bg-success/10 text-success">
                  Free
                </Badge>
              ) : (
                <Badge variant="outline">{event.price}</Badge>
              )}
            </span>
            <Badge variant="outline" className="text-xs">
              {event.difficulty}
            </Badge>
          </div>
          
          {event.isRegistered ? (
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              Registered
            </Button>
          ) : (
            <Button size="sm" className="bg-gradient-primary">
              Register Now
            </Button>
          )}
        </div>
        
        <Button variant="ghost" size="sm" className="w-full flex items-center gap-2">
          View Details
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}