import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/ui/navigation";
import { 
  Users, 
  Calendar, 
  Trophy, 
  ArrowRight, 
  Star,
  Activity,
  TrendingUp,
  MapPin,
  Clock
} from "lucide-react";
import heroImage from "@/assets/hero-campus.jpg";
import patternBg from "@/assets/pattern-bg.jpg";

const Index = () => {
  const featuredEvents = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      club: "Tech Club",
      date: "Jan 25",
      time: "2:00 PM",
      attendees: 45,
      image: "💻"
    },
    {
      id: 2,
      title: "Art Exhibition 2024",
      club: "Art Society",
      date: "Jan 28",
      time: "10:00 AM",
      attendees: 150,
      image: "🎨"
    },
    {
      id: 3,
      title: "Music Concert",
      club: "Music Club",
      date: "Feb 05",
      time: "6:00 PM",
      attendees: 280,
      image: "🎵"
    }
  ];

  const topClubs = [
    { name: "Tech Innovators", members: 245, category: "Technology", rating: 4.8 },
    { name: "Creative Arts Society", members: 180, category: "Arts", rating: 4.7 },
    { name: "Sports Champions", members: 287, category: "Sports", rating: 4.5 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/90" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent animate-slideIn">
              Welcome to ClubFuse
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your centralized hub for campus engagement. Discover clubs, join events, 
              and connect with your campus community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary text-lg px-8 py-6" asChild>
                <Link to="/register">
                  Join ClubFuse
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <Link to="/clubs">Explore Clubs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-3xl font-bold mb-2">50+</h3>
              <p className="text-muted-foreground">Active Clubs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="text-3xl font-bold mb-2">200+</h3>
              <p className="text-muted-foreground">Monthly Events</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-3xl font-bold mb-2">5000+</h3>
              <p className="text-muted-foreground">Student Members</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-success-foreground" />
              </div>
              <h3 className="text-3xl font-bold mb-2">1000+</h3>
              <p className="text-muted-foreground">Achievements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't miss out on exciting events happening across campus
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredEvents.map((event) => (
              <Card key={event.id} className="group hover:shadow-primary transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center text-2xl">
                      {event.image}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <p className="text-sm text-primary">{event.club}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Top Clubs */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Clubs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join these highly-rated clubs and become part of amazing communities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {topClubs.map((club, index) => (
              <Card key={club.name} className="group hover:shadow-primary transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{club.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-warning fill-current" />
                      <span className="text-sm font-medium">{club.rating}</span>
                    </div>
                  </div>
                  <CardDescription>{club.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{club.members} members</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/clubs">Explore All Clubs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-16 relative"
        style={{ backgroundImage: `url(${patternBg})` }}
      >
        <div className="absolute inset-0 bg-primary/90" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Campus Experience?
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already using ClubFuse to discover 
            opportunities, build connections, and make the most of their college life.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
            <Link to="/register">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  ClubFuse
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                Unifying campus engagement through technology and community building.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/clubs" className="hover:text-primary">Browse Clubs</Link></li>
                <li><Link to="/events" className="hover:text-primary">Find Events</Link></li>
                <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/help" className="hover:text-primary">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
                <li><Link to="/guidelines" className="hover:text-primary">Community Guidelines</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 ClubFuse. Built for campus communities.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
