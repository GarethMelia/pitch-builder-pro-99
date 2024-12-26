import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  MessageCircle,
  Info,
  BookOpen,
  Video,
  Mail,
} from "lucide-react";

export const HelpSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Help Center</h2>
        <p className="text-muted-foreground">
          Get help with your account and find answers to common questions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact Support */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Contact Support</h3>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.location.href = "mailto:support@example.com"}
            >
              <Mail className="mr-2 h-4 w-4" />
              Email Support
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {/* Implement live chat */}}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Live Chat
            </Button>
          </div>
        </div>

        {/* Self Help Resources */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Self-Help Resources</h3>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              asChild
            >
              <a href="/faq">
                <Info className="mr-2 h-4 w-4" />
                Frequently Asked Questions
              </a>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              asChild
            >
              <a href="/blog">
                <BookOpen className="mr-2 h-4 w-4" />
                Help Articles
              </a>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              asChild
            >
              <a href="/tutorials">
                <Video className="mr-2 h-4 w-4" />
                Video Tutorials
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Community Support */}
      <div className="pt-4">
        <h3 className="text-lg font-medium mb-4">Community Support</h3>
        <Button
          variant="outline"
          className="w-full md:w-auto justify-start"
          asChild
        >
          <a href="/community">
            <MessageSquare className="mr-2 h-4 w-4" />
            Join Our Community Forum
          </a>
        </Button>
      </div>
    </div>
  );
};