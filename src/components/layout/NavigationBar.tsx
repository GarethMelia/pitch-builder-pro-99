import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

export const NavigationBar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary">
              Pitch Builder Pro
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Button variant="outline" onClick={() => navigate("/auth")}>
                  Sign In
                </Button>
                <Button onClick={() => navigate("/auth")}>
                  Sign Up
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate("/create")}>
                Dashboard
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};