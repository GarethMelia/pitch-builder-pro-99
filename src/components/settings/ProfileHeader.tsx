import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ProfileHeader = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-center md:text-left">Profile Management</h2>
      <div className="flex flex-col items-center space-y-4 md:items-start md:flex-row md:space-y-0 md:space-x-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" alt="Profile" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-medium">John Doe</h3>
          <p className="text-muted-foreground">+1 (555) 123-4567</p>
        </div>
      </div>
    </div>
  );
};