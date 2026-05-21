import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Team member images
import sahalImg from "@/assets/our-team/sahal-ismail.jpg";
import yahyeImg from "@/assets/our-team/yahye-yusuf.jpg";
import ibrahimImg from "@/assets/our-team/ibrahim-m-omar.jpg";
import ahmedImg from "@/assets/our-team/ahmed-said.jpg";
import abdillahiImg from "@/assets/our-team/abdullahi-abdiasis.jpg";

const team = [
  {
    name: "Sahal Ismail",
    role: "Executive Director",
    initials: "SI",
    image: yahyeImg,
    social: {
      facebook: "#",
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Yahye Yusuf",
    role: "Communications Coordinator",
    initials: "YY",
    image: ibrahimImg,
    social: {
      facebook: "#",
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Ibrahim M. Omar",
    role: "Researcher and Software Manager",
    initials: "IO",
    image: sahalImg,
    social: {
      facebook: "#",
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Ahmed Said",
    role: "Researcher",
    initials: "AS",
    image: ahmedImg,
    social: {
      facebook: "#",
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Abdillahi Abdiasis",
    role: "Researcher",
    initials: "AA",
    image: abdillahiImg,
    social: {
      facebook: "#",
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
];

export function Leadership() {
  return (
    <section className="irid-section bg-white">
      <div className="irid-container">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Meet <span className="italic text-primary">Our Team</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
          {team.map((member, index) => (
            <div 
              key={member.name}
              className="flex flex-col items-center text-center group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative mb-6">
                {/* Circular Profile Picture with shadow and border like the example */}
                <div className="w-40 h-40 rounded-full overflow-hidden border-[6px] border-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-300">
                  <Avatar className="w-full h-full border-none">
                    <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                    <AvatarFallback className="text-3xl font-bold bg-secondary text-primary">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              
              <h3 className="text-[hsl(220,60%,35%)] font-display font-bold text-xl mb-1">
                {member.name}
              </h3>
              <p className="text-muted-foreground text-sm font-medium mb-6">
                {member.role}
              </p>
              
              {/* Social Icons row with circular borders like the example */}
              <div className="flex items-center justify-center gap-3">
                <a 
                  href={member.social.facebook} 
                  className="w-9 h-9 rounded-full border border-gray-100 shadow-sm flex items-center justify-center text-[hsl(220,60%,35%)] hover:bg-primary hover:text-white transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href={member.social.instagram} 
                  className="w-9 h-9 rounded-full border border-gray-100 shadow-sm flex items-center justify-center text-[hsl(220,60%,35%)] hover:bg-primary hover:text-white transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href={member.social.twitter} 
                  className="w-9 h-9 rounded-full border border-gray-100 shadow-sm flex items-center justify-center text-[hsl(220,60%,35%)] hover:bg-primary hover:text-white transition-all"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href={member.social.linkedin} 
                  className="w-9 h-9 rounded-full border border-gray-100 shadow-sm flex items-center justify-center text-[hsl(220,60%,35%)] hover:bg-primary hover:text-white transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
