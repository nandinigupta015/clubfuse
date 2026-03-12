import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Search, 
  Filter,
  MapPin,
  Clock,
  Star,
  TrendingUp,
  Code,
  Paintbrush,
  Music,
  Gamepad2,
  Camera,
  Leaf
} from "lucide-react";

export default function Clubs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const clubCategories = [
    { id: "all", name: "All Clubs", icon: Users },
    { id: "tech", name: "Technology", icon: Code },
    { id: "arts", name: "Arts & Culture", icon: Paintbrush },
    { id: "music", name: "Music", icon: Music },
    { id: "sports", name: "Sports", icon: Gamepad2 },
    { id: "photography", name: "Photography", icon: Camera },
    { id: "environment", name: "Environment", icon: Leaf },
  ];

  const clubs = [
    {
      id: 1,
      name: "Tech Innovators Club",
      category: "tech",
      description: "Building the future through technology and innovation",
      members: 245,
      events: 18,
      rating: 4.8,
      image: "🚀",
      tags: ["Programming", "AI/ML", "Web Dev"],
      nextEvent: "AI Workshop - Jan 25",
      isJoined: true,
    },
    {
      id: 2,
      name: "Creative Arts Society",
      category: "arts",
      description: "Expressing creativity through various art forms and mediums",
      members: 180,
      events: 22,
      rating: 4.7,
      image: "🎨",
      tags: ["Painting", "Sculpture", "Digital Art"],
      nextEvent: "Art Exhibition - Jan 28",
      isJoined: false,
    },
    {
      id: 3,
      name: "Photography Enthusiasts",
      category: "photography",
      description: "Capturing moments and telling stories through photography",
      members: 156,
      events: 15,
      rating: 4.9,
      image: "📸",
      tags: ["Portrait", "Landscape", "Street"],
      nextEvent: "Photo Walk - Feb 02",
      isJoined: true,
    },
    {
      id: 4,
      name: "Music Harmony Club",
      category: "music",
      description: "Creating beautiful music and fostering musical talent",
      members: 198,
      events: 20,
      rating: 4.6,
      image: "🎵",
      tags: ["Classical", "Modern", "Instruments"],
      nextEvent: "Concert - Feb 05",
      isJoined: false,
    },
    {
      id: 5,
      name: "Green Earth Initiative",
      category: "environment",
      description: "Working towards a sustainable and eco-friendly campus",
      members: 134,
      events: 12,
      rating: 4.8,
      image: "🌱",
      tags: ["Sustainability", "Recycling", "Awareness"],
      nextEvent: "Tree Plantation - Feb 10",
      isJoined: false,
    },
    {
      id: 6,
      name: "Sports Champions",
      category: "sports",
      description: "Promoting fitness and competitive spirit through sports",
      members: 287,
      events: 25,
      rating: 4.5,
      image: "⚽",
      tags: ["Football", "Basketball", "Cricket"],
      nextEvent: "Tournament - Feb 15",
      isJoined: true,
    },
  ];

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredClubs = clubs.filter(club => club.rating >= 4.7).slice(0, 3);
  const trendingClubs = clubs.sort((a, b) => b.events - a.events).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore Campus Clubs</h1>
          <p className="text-muted-foreground">
            Discover communities that match your interests and passions
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clubs by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {clubCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="all">All Clubs</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>
          
          {/* All Clubs */}
          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClubs.map((club) => (
                <ClubCard key={club.id} club={club} />
              ))}
            </div>
            
            {filteredClubs.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No clubs found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find more clubs
                </p>
              </div>
            )}
          </TabsContent>
          
          {/* Featured Clubs */}
          <TabsContent value="featured" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredClubs.map((club) => (
                <ClubCard key={club.id} club={club} featured={true} />
              ))}
            </div>
          </TabsContent>
          
          {/* Trending Clubs */}
          <TabsContent value="trending" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingClubs.map((club) => (
                <ClubCard key={club.id} club={club} trending={true} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ClubCard({ club, featured = false, trending = false }: { 
  club: any; 
  featured?: boolean; 
  trending?: boolean; 
}) {
  return (
    <Card className="group hover:shadow-primary transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="relative">
        {featured && (
          <Badge className="absolute top-2 right-2 bg-warning text-warning-foreground">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        )}
        {trending && (
          <Badge className="absolute top-2 right-2 bg-success text-success-foreground">
            <TrendingUp className="h-3 w-3 mr-1" />
            Trending
          </Badge>
        )}
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center text-2xl">
            {club.image}
          </div>
          <div>
            <CardTitle className="text-lg">{club.name}</CardTitle>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-4 w-4 text-warning fill-current" />
              <span className="text-sm text-muted-foreground">{club.rating}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <CardDescription>{club.description}</CardDescription>
        
        <div className="flex flex-wrap gap-1">
          {club.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {club.members} members
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {club.events} events
          </span>
        </div>
        
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm font-medium">Next Event:</p>
          <p className="text-sm text-muted-foreground">{club.nextEvent}</p>
        </div>
        
        {club.isJoined ? (
          <Button variant="outline" className="w-full">
            View Club
          </Button>
        ) : (
          <Button className="w-full bg-gradient-primary">
            Join Club
          </Button>
        )}
      </CardContent>
    </Card>
  );
}