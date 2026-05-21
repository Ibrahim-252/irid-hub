import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Users,
  Handshake,
  MessageSquare,
  ArrowRight,
  Clock,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@iridinstitute.so",
    link: "mailto:info@iridinstitute.so",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+252 906 791 195",
    link: "tel:+252906791195",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Bosaso, Somalia",
    link: "#",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Sat-Thu: 9:00 AM - 5:00 PM",
    link: "#",
  },
];

// Form Schemas
const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const membershipSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required"),
  occupation: z.string().min(2, "Occupation is required"),
  interests: z.string().min(2, "Please list your interests"),
  motivation: z.string().min(10, "Please explain your motivation"),
});

const partnershipSchema = z.object({
  orgName: z.string().min(2, "Organization name is required"),
  contactName: z.string().min(2, "Contact person name is required"),
  email: z.string().email("Invalid email address"),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  partnershipType: z.string().min(2, "Please specify partnership type"),
  details: z.string().min(10, "Please provide proposal details"),
});

const feedbackSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  topic: z.string().min(2, "Please specify a topic"),
  message: z.string().min(5, "Please provide your feedback"),
});

const socialLinks = [
  { name: "Twitter", url: "https://x.com/IRIDInstitute" },
  { name: "LinkedIn", url: "https://www.linkedin.com/company/irid-institute-%E2%80%93-research-insights-and-dialogue/" },
  { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61587340535850" },
];

const Contact = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "contact");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  // Forms
  const inquiryForm = useForm<z.infer<typeof inquirySchema>>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const membershipForm = useForm<z.infer<typeof membershipSchema>>({
    resolver: zodResolver(membershipSchema),
    defaultValues: { name: "", email: "", phone: "", occupation: "", interests: "", motivation: "" },
  });

  const partnershipForm = useForm<z.infer<typeof partnershipSchema>>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: { orgName: "", contactName: "", email: "", website: "", partnershipType: "", details: "" },
  });

  const feedbackForm = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { name: "", email: "", topic: "", message: "" },
  });

  const onSubmit = async (type: string, data: any) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("form_submissions").insert([
        {
          type,
          email: data.email || "anonymous",
          data,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      toast.success("Submission successful!", {
        description: "Your message has been stored and our team will be notified.",
      });
      
      // Reset the specific form
      if (type === "inquiry") inquiryForm.reset();
      if (type === "membership") membershipForm.reset();
      if (type === "partnership") partnershipForm.reset();
      if (type === "feedback") feedbackForm.reset();

    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error("Submission failed", {
        description: error.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          <div className="irid-container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
                <MessageSquare className="w-4 h-4" />
                Get In Touch
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                Contact & <span className="irid-gradient-text">Join Us</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Whether you want to collaborate, volunteer, or simply connect, 
                we'd love to hear from you. Let's create impact together.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 bg-secondary/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />
          <div className="irid-container relative z-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.link}
                  className="glass p-6 rounded-3xl flex flex-col gap-4 premium-shadow-hover border-white/40 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{info.label}</div>
                    <div className="text-lg font-display font-bold text-foreground leading-tight">{info.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Form Tabs */}
        <section className="irid-section relative">
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="irid-container relative z-10">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <div className="max-w-4xl mx-auto">
                <TabsList className="w-full glass grid grid-cols-2 md:grid-cols-4 h-auto p-2 rounded-[2rem] border-white/40 mb-12">
                  <TabsTrigger value="contact" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-4 rounded-2xl transition-all font-bold">
                    <MessageSquare className="w-4 h-4 mr-2 hidden sm:inline" />
                    Inquiry
                  </TabsTrigger>
                  <TabsTrigger value="membership" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-4 rounded-2xl transition-all font-bold">
                    <Users className="w-4 h-4 mr-2 hidden sm:inline" />
                    Join Us
                  </TabsTrigger>
                  <TabsTrigger value="partnership" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-4 rounded-2xl transition-all font-bold">
                    <Handshake className="w-4 h-4 mr-2 hidden sm:inline" />
                    Partner
                  </TabsTrigger>
                  <TabsTrigger value="feedback" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-4 rounded-2xl transition-all font-bold">
                    <Send className="w-4 h-4 mr-2 hidden sm:inline" />
                    Feedback
                  </TabsTrigger>
                </TabsList>

                {/* Form Wrapper with common glass style */}
                <div className="glass p-8 md:p-12 rounded-[3rem] border-white/40 shadow-2xl overflow-hidden relative group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full pointer-events-none" />
                  
                  <TabsContent value="contact" className="mt-0 focus-visible:ring-0">
                    <div className="max-w-2xl">
                      <h2 className="text-3xl font-display font-bold text-foreground mb-3">
                        General <span className="italic text-primary">Inquiry</span>
                      </h2>
                      <p className="text-muted-foreground mb-10 text-lg">
                        Have a question or want to learn more about our work? Send us a message and our team will get back to you shortly.
                      </p>
                      <form onSubmit={inquiryForm.handleSubmit((data) => onSubmit("inquiry", data))} className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label htmlFor="name" className="text-sm font-bold ml-1 uppercase tracking-widest text-foreground/70">Full Name</Label>
                            <Input {...inquiryForm.register("name")} id="name" placeholder="E.g. Ahmed Ali" className="h-14 bg-white/50 rounded-2xl border-border/40 focus:bg-white transition-all text-base px-6" />
                            {inquiryForm.formState.errors.name && <p className="text-destructive text-xs ml-1">{inquiryForm.formState.errors.name.message}</p>}
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="email" className="text-sm font-bold ml-1 uppercase tracking-widest text-foreground/70">Email Address</Label>
                            <Input {...inquiryForm.register("email")} id="email" type="email" placeholder="you@example.com" className="h-14 bg-white/50 rounded-2xl border-border/40 focus:bg-white transition-all text-base px-6" />
                            {inquiryForm.formState.errors.email && <p className="text-destructive text-xs ml-1">{inquiryForm.formState.errors.email.message}</p>}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="subject" className="text-sm font-bold ml-1 uppercase tracking-widest text-foreground/70">Subject</Label>
                          <Input {...inquiryForm.register("subject")} id="subject" placeholder="What is your inquiry about?" className="h-14 bg-white/50 rounded-2xl border-border/40 focus:bg-white transition-all text-base px-6" />
                          {inquiryForm.formState.errors.subject && <p className="text-destructive text-xs ml-1">{inquiryForm.formState.errors.subject.message}</p>}
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="message" className="text-sm font-bold ml-1 uppercase tracking-widest text-foreground/70">Message</Label>
                          <Textarea {...inquiryForm.register("message")} id="message" placeholder="Tell us more about how we can help..." rows={6} className="bg-white/50 rounded-3xl border-border/40 focus:bg-white transition-all text-base p-6 resize-none" />
                          {inquiryForm.formState.errors.message && <p className="text-destructive text-xs ml-1">{inquiryForm.formState.errors.message.message}</p>}
                        </div>
                        <Button disabled={isSubmitting} type="submit" className="irid-btn-primary w-full sm:w-auto px-10 py-5 h-auto text-lg rounded-2xl">
                          {isSubmitting ? "Sending..." : "Send Message"}
                          <Send className="w-5 h-5 ml-2" />
                        </Button>
                      </form>
                    </div>
                  </TabsContent>

                  <TabsContent value="membership" className="mt-0 focus-visible:ring-0">
                    <div className="max-w-2xl">
                      <h2 className="text-3xl font-display font-bold text-foreground mb-3">
                        Join Our <span className="italic text-primary">Community</span>
                      </h2>
                      <p className="text-muted-foreground mb-10 text-lg">
                        Become part of a network of researchers and innovators shaping Somalia's future.
                      </p>
                      <form onSubmit={membershipForm.handleSubmit((data) => onSubmit("membership", data))} className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label htmlFor="member-name" className="text-sm font-bold ml-1 uppercase tracking-widest text-foreground/70">Full Name</Label>
                            <Input {...membershipForm.register("name")} id="member-name" placeholder="Your name" className="h-14 bg-white/50 rounded-2xl border-border/40 focus:bg-white transition-all text-base px-6" />
                            {membershipForm.formState.errors.name && <p className="text-destructive text-xs ml-1">{membershipForm.formState.errors.name.message}</p>}
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="member-email" className="text-sm font-bold ml-1 uppercase tracking-widest text-foreground/70">Email Address</Label>
                            <Input {...membershipForm.register("email")} id="member-email" type="email" placeholder="you@example.com" className="h-14 bg-white/50 rounded-2xl border-border/40 focus:bg-white transition-all text-base px-6" />
                            {membershipForm.formState.errors.email && <p className="text-destructive text-xs ml-1">{membershipForm.formState.errors.email.message}</p>}
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label htmlFor="phone" className="text-sm font-bold ml-1 uppercase tracking-widest text-foreground/70">Phone Number</Label>
                            <Input {...membershipForm.register("phone")} id="phone" type="tel" placeholder="+252 ..." className="h-14 bg-white/50 rounded-2xl border-border/40 focus:bg-white transition-all text-base px-6" />
                            {membershipForm.formState.errors.phone && <p className="text-destructive text-xs ml-1">{membershipForm.formState.errors.phone.message}</p>}
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="occupation" className="text-sm font-bold ml-1 uppercase tracking-widest text-foreground/70">Occupation</Label>
                            <Input {...membershipForm.register("occupation")} id="occupation" placeholder="e.g. Researcher, Student" className="h-14 bg-white/50 rounded-2xl border-border/40 focus:bg-white transition-all text-base px-6" />
                            {membershipForm.formState.errors.occupation && <p className="text-destructive text-xs ml-1">{membershipForm.formState.errors.occupation.message}</p>}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="interests" className="text-sm font-bold ml-1 uppercase tracking-widest text-foreground/70">Interests</Label>
                          <Input {...membershipForm.register("interests")} id="interests" placeholder="e.g. Policy Research, Digital Transformation" className="h-14 bg-white/50 rounded-2xl border-border/40 focus:bg-white transition-all text-base px-6" />
                          {membershipForm.formState.errors.interests && <p className="text-destructive text-xs ml-1">{membershipForm.formState.errors.interests.message}</p>}
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="motivation" className="text-sm font-bold ml-1 uppercase tracking-widest text-foreground/70">Motivation</Label>
                          <Textarea {...membershipForm.register("motivation")} id="motivation" placeholder="Why would you like to join the IRID Institute?" rows={4} className="bg-white/50 rounded-3xl border-border/40 focus:bg-white transition-all text-base p-6 resize-none" />
                          {membershipForm.formState.errors.motivation && <p className="text-destructive text-xs ml-1">{membershipForm.formState.errors.motivation.message}</p>}
                        </div>
                        <Button disabled={isSubmitting} type="submit" className="irid-btn-primary w-full sm:w-auto px-10 py-5 h-auto text-lg rounded-2xl">
                          {isSubmitting ? "Submitting..." : "Submit Application"}
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </form>
                    </div>
                  </TabsContent>

                  <TabsContent value="partnership" className="mt-0 focus-visible:ring-0">
                    <div className="max-w-2xl">
                      <h2 className="text-3xl font-display font-bold text-foreground mb-3">
                        Strategic <span className="italic text-primary">Partnership</span>
                      </h2>
                      <p className="text-muted-foreground mb-10 text-lg">
                        Let's collaborate to drive evidence-based policy and sustainable development.
                      </p>
                      <form onSubmit={partnershipForm.handleSubmit((data) => onSubmit("partnership", data))} className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label htmlFor="org-name" className="text-sm font-bold ml-1 uppercase tracking-widest text-foreground/70">Organization Name</Label>
                            <Input {...partnershipForm.register("orgName")} id="org-name" placeholder="Your organization" className="h-14 bg-white/50 rounded-2xl border-border/40 focus:bg-white transition-all text-base px-6" />
                            {partnershipForm.formState.errors.orgName && <p className="text-destructive text-xs ml-1">{partnershipForm.formState.errors.orgName.message}</p>}
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="contact-name" className="text-sm font-bold ml-1 uppercase tracking-widest text-foreground/70">Contact Person</Label>
                            <Input {...partnershipForm.register("contactName")} id="contact-name" placeholder="Your name" className="h-14 bg-white/50 rounded-2xl border-border/40 focus:bg-white transition-all text-base px-6" />
                            {partnershipForm.formState.errors.contactName && <p className="text-destructive text-xs ml-1">{partnershipForm.formState.errors.contactName.message}</p>}
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label htmlFor="org-email" className="text-sm font-bold ml-1 uppercase tracking-widest text-foreground/70">Institutional Email</Label>
                            <Input {...partnershipForm.register("email")} id="org-email" type="email" placeholder="org@domain.com" className="h-14 bg-white/50 rounded-2xl border-border/40 focus:bg-white transition-all text-base px-6" />
                            {partnershipForm.formState.errors.email && <p className="text-destructive text-xs ml-1">{partnershipForm.formState.errors.email.message}</p>}
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="org-website" className="text-sm font-bold ml-1 uppercase tracking-widest text-foreground/70">Website</Label>
                            <Input {...partnershipForm.register("website")} id="org-website" placeholder="https://..." className="h-14 bg-white/50 rounded-2xl border-border/40 focus:bg-white transition-all text-base px-6" />
                            {partnershipForm.formState.errors.website && <p className="text-destructive text-xs ml-1">{partnershipForm.formState.errors.website.message}</p>}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="partnership-type" className="text-sm font-bold ml-1 uppercase tracking-widest text-foreground/70">Type of Partnership</Label>
                          <Input {...partnershipForm.register("partnershipType")} id="partnership-type" placeholder="e.g. Research Collaboration, Sponsorship" className="h-14 bg-white/50 rounded-2xl border-border/40 focus:bg-white transition-all text-base px-6" />
                          {partnershipForm.formState.errors.partnershipType && <p className="text-destructive text-xs ml-1">{partnershipForm.formState.errors.partnershipType.message}</p>}
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="partnership-details" className="text-sm font-bold ml-1 uppercase tracking-widest text-foreground/70">Proposal Brief</Label>
                          <Textarea {...partnershipForm.register("details")} id="partnership-details" placeholder="Describe your proposed collaboration..." rows={5} className="bg-white/50 rounded-3xl border-border/40 focus:bg-white transition-all text-base p-6 resize-none" />
                          {partnershipForm.formState.errors.details && <p className="text-destructive text-xs ml-1">{partnershipForm.formState.errors.details.message}</p>}
                        </div>
                        <Button disabled={isSubmitting} type="submit" className="irid-btn-primary w-full sm:w-auto px-10 py-5 h-auto text-lg rounded-2xl">
                          {isSubmitting ? "Submitting..." : "Submit Proposal"}
                          <Handshake className="w-5 h-5 ml-2" />
                        </Button>
                      </form>
                    </div>
                  </TabsContent>

                  <TabsContent value="feedback" className="mt-0 focus-visible:ring-0">
                    <div className="max-w-2xl">
                      <h2 className="text-3xl font-display font-bold text-foreground mb-3">
                        Your <span className="italic text-primary">Voice Matters</span>
                      </h2>
                      <p className="text-muted-foreground mb-10 text-lg">
                        Help us improve our initiatives by sharing your feedback and suggestions.
                      </p>
                      <form onSubmit={feedbackForm.handleSubmit((data) => onSubmit("feedback", data))} className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label htmlFor="feedback-name" className="text-sm font-bold ml-1 uppercase tracking-widest text-foreground/70">Name (Optional)</Label>
                            <Input {...feedbackForm.register("name")} id="feedback-name" placeholder="Your name" className="h-14 bg-white/50 rounded-2xl border-border/40 focus:bg-white transition-all text-base px-6" />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="feedback-email" className="text-sm font-bold ml-1 uppercase tracking-widest text-foreground/70">Email (Optional)</Label>
                            <Input {...feedbackForm.register("email")} id="feedback-email" type="email" placeholder="For follow-up" className="h-14 bg-white/50 rounded-2xl border-border/40 focus:bg-white transition-all text-base px-6" />
                            {feedbackForm.formState.errors.email && <p className="text-destructive text-xs ml-1">{feedbackForm.formState.errors.email.message}</p>}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="feedback-topic" className="text-sm font-bold ml-1 uppercase tracking-widest text-foreground/70">Topic</Label>
                          <Input {...feedbackForm.register("topic")} id="feedback-topic" placeholder="e.g. Website, Publication, Event" className="h-14 bg-white/50 rounded-2xl border-border/40 focus:bg-white transition-all text-base px-6" />
                          {feedbackForm.formState.errors.topic && <p className="text-destructive text-xs ml-1">{feedbackForm.formState.errors.topic.message}</p>}
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="feedback-message" className="text-sm font-bold ml-1 uppercase tracking-widest text-foreground/70">Feedback</Label>
                          <Textarea {...feedbackForm.register("message")} id="feedback-message" placeholder="What's on your mind?" rows={6} className="bg-white/50 rounded-3xl border-border/40 focus:bg-white transition-all text-base p-6 resize-none" />
                          {feedbackForm.formState.errors.message && <p className="text-destructive text-xs ml-1">{feedbackForm.formState.errors.message.message}</p>}
                        </div>
                        <Button disabled={isSubmitting} type="submit" className="irid-btn-primary w-full sm:w-auto px-10 py-5 h-auto text-lg rounded-2xl">
                          {isSubmitting ? "Submitting..." : "Submit Feedback"}
                          <Send className="w-5 h-5 ml-2" />
                        </Button>
                      </form>
                    </div>
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>
        </section>

        {/* Social & Map Section */}
        <section className="irid-section bg-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="white">
              <path d="M0 100 L100 100 L100 0 Z" />
            </svg>
          </div>
          <div className="irid-container relative z-10">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <span className="inline-block text-xs font-bold text-accent uppercase tracking-[0.3em] mb-4">Stay Connected</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-8">
                  Join the <span className="italic">Conversation</span>
                </h2>
                <p className="text-xl text-primary-foreground/80 mb-12 leading-relaxed">
                  Follow IRID Institute for real-time insights, upcoming event announcements, and institutional updates.
                </p>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-primary-foreground font-bold transition-all hover:-translate-y-1"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square md:aspect-video glass bg-white/10 border-white/20 rounded-[3rem] flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group">
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] opacity-20 group-hover:scale-110 transition-transform duration-[10s]" />
                   <div className="text-center relative z-10">
                    <div className="w-20 h-20 rounded-[2rem] bg-accent/20 flex items-center justify-center mx-auto mb-6 shadow-xl border border-accent/30">
                      <Globe className="w-10 h-10 text-accent animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-primary-foreground mb-2">Bosaso Headquarters</h3>
                    <p className="text-primary-foreground/60 font-medium">Somalia, East Africa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
