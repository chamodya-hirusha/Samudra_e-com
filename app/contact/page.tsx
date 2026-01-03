"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { PageHero } from "@/components/layout/PageHero";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["Nittambuwa", "Sri Lanka"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["072 289 0068", "+94 72 289 0068"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@samudraart.lk", "orders@samudraart.lk"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Sat: 8:00 AM - 6:00 PM", "Sunday: By Appointment"],
  },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      {/* Hero */}
      <PageHero
        title="Contact Us"
        subtitle="Get In Touch"
        description="Have questions about our sculptures or need a custom quote? We're here to help bring your vision to life."
        imageSrc="/assets/products/buddha-face-1.jpg"
      />

      {/* Contact Section */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-6 md:mb-8">
                Contact Information
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 md:mb-12">
                {contactInfo.map((info) => (
                  <div
                    key={info.title}
                    className="bg-card rounded-xl p-4 sm:p-6 shadow-soft"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                      <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base text-foreground mb-2">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-xs sm:text-sm text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="mt-6 md:mt-8 rounded-xl overflow-hidden h-48 sm:h-56 md:h-64 bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.5!2d80.0167!3d7.1667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTAnMDAuMSJOIDgwwrAwMScwMC4xIkU!5e0!3m2!1sen!2slk!4v1704000000000!5m2!1sen!2slk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Samudra Art Center Location - Nittambuwa, Sri Lanka"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-6 md:mb-8">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-4 sm:p-6 md:p-8 shadow-card">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="your@email.com" required />
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="072 289 0068" />
                </div>

                <div className="space-y-2 mt-6">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input id="subject" placeholder="How can we help?" required />
                </div>

                <div className="space-y-2 mt-6">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your inquiry..."
                    rows={5}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="gold"
                  size="xl"
                  className="w-full mt-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 w-5 h-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

