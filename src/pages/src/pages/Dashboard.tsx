import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Calendar, 
  Trophy, 
  Clock, 
  MapPin, 
  Star,
  TrendingUp,
  Activity,
  Bell
} from "lucide-react";

export default function Dashboard() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Web Development Workshop",
      club: "Tech Club",
      date: "2024-01-25",
      time: "2:00 PM",
      location: "Computer Lab A",
      registered: true,
    },
    {
      id: 2,
      title: "Annual Art Exhibition",
      club: "Art Society",
      date: "2024-01-28",
      time: "10:00 AM",
      location: "Main Gallery",
      registered: false,
    },
    {
      id: 3,
      title: "Basketball Tournament",
      club: "Sports Club",
      date: "2024-02-01",
      time: "4:00 PM",
      location: "Sports Complex",
      registered: true,
    },
  ];

  const myClubs = [
    {
      id: 1,
      name: "Tech Club",
      role: "Member",
      members: 120,
      status: "active",
      color: "bg-primary",
    },
    {
      id: 2,
      name: "Photography Club",
      role: "Vice President",
      members: 85,
      status: "active",
      color: "bg-secondary",
    },
    {
      id: 3,
      name: "Environmental Club",
      role: "Member",
      members: 95,
      status: "active",
      color: "bg-success",
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "Event Organizer",
      description: "Organized 5 successful events",
      date: "2024-01-15",
      icon: Calendar,
    },
    {
      id: 2,
      title: "Active Member",
      description: "50+ event participations",
      date: "2024-01-10",
      icon: Trophy,
    },
    {
      id: 3,
      title: "Community Builder",
      description: "Recruited 10+ new members",
      date: "2024-01-05",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={true} userRole="student" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Alex!</h1>
          <p className="text-muted-foreground">Here's what's happening in your campus community</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">My Clubs</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Events This Month</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <Calendar className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Achievements</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Trophy className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Activity Score</p>
                  <p className="text-2xl font-bold">95</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Upcoming Events
              </CardTitle>
              <CardDescription>Events you're registered for or might be interested in</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1">
                    <h4 className="font-semibold">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.club}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {event.date} at {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {event.registered ? (
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        Registered
                      </Badge>
                    ) : (
                      <Button size="sm" variant="outline">
                        Register
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Events
              </Button>
            </CardContent>
          </Card>

          {/* My Clubs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                My Clubs
              </CardTitle>
              <CardDescription>Clubs you're actively participating in</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {myClubs.map((club) => (
                <div
                  key={club.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${club.color} flex items-center justify-center`}>
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{club.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {club.role} • {club.members} members
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    Active
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Explore More Clubs
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Achievements */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-warning" />
              Recent Achievements
            </CardTitle>
            <CardDescription>Your latest accomplishments and milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                    <achievement.icon className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    <p className="text-xs text-muted-foreground">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="h-16 bg-gradient-primary">
            <div className="text-center">
              <Activity className="h-6 w-6 mx-auto mb-1" />
              <span className="text-sm">Join New Club</span>
            </div>
          </Button>
          
          <Button variant="outline" className="h-16">
            <div className="text-center">
              <Calendar className="h-6 w-6 mx-auto mb-1" />
              <span className="text-sm">Browse Events</span>
            </div>
          </Button>
          
          <Button variant="outline" className="h-16">
            <div className="text-center">
              <Bell className="h-6 w-6 mx-auto mb-1" />
              <span className="text-sm">View Notifications</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}