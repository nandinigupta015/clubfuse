import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Users, Calendar, Trophy, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  isAuthenticated?: boolean;
  userRole?: "student" | "coordinator" | "admin";
}

export function Navigation({ isAuthenticated = false, userRole = "student" }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/clubs", label: "Clubs" },
    { href: "/events", label: "Events" },
    { href: "/about", label: "About" },
  ];

  const dashboardLinks = [
    { href: "/dashboard", label: "Dashboard", icon: Users },
    { href: "/my-clubs", label: "My Clubs", icon: Users },
    { href: "/calendar", label: "Calendar", icon: Calendar },
    { href: "/achievements", label: "Achievements", icon: Trophy },
  ];

  const coordinatorLinks = [
    { href: "/manage-club", label: "Manage Club", icon: Settings },
    { href: "/create-event", label: "Create Event", icon: Calendar },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ClubFuse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAuthenticated ? (
              <>
                {publicLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      location.pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild className="bg-gradient-primary">
                    <Link to="/register">Join Now</Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                {dashboardLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary flex items-center space-x-1",
                      location.pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </Link>
                ))}
                {(userRole === "coordinator" || userRole === "admin") &&
                  coordinatorLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary flex items-center space-x-1",
                        location.pathname === link.href
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </Link>
                  ))}
                <Button variant="ghost" size="sm">
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <div className="container px-4 py-4 space-y-2">
              {!isAuthenticated ? (
                <>
                  {publicLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={cn(
                        "block px-3 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md",
                        location.pathname === link.href
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="flex flex-col space-y-2 pt-4">
                    <Button variant="ghost" asChild>
                      <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                    </Button>
                    <Button asChild className="bg-gradient-primary">
                      <Link to="/register" onClick={() => setIsOpen(false)}>Join Now</Link>
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {dashboardLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={cn(
                        "flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md",
                        location.pathname === link.href
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <link.icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </Link>
                  ))}
                  {(userRole === "coordinator" || userRole === "admin") &&
                    coordinatorLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className={cn(
                          "flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md",
                          location.pathname === link.href
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        <link.icon className="h-4 w-4" />
                        <span>{link.label}</span>
                      </Link>
                    ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}