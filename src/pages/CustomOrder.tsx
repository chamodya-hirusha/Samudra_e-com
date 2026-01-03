import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Send, Upload, CheckCircle, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const materials = ["Dolomite", "Fiber", "Concrete", "Other"];
const statueTypes = [
  "Seated Buddha",
  "Standing Buddha", 
  "Buddha Head",
  "Reclining Buddha",
  "Decorative Sculpture",
  "Temple Grade",
  "Other",
];

const CustomOrder = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    statueType: "",
    material: "",
    height: "",
    width: "",
    description: "",
    location: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Request Submitted!",
      description: "We'll contact you within 24 hours with a quotation.",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto text-center"
            >
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
                Request Submitted Successfully!
              </h1>
              <p className="text-muted-foreground mb-8">
                Thank you for your interest in our custom sculptures. Our team will review 
                your request and contact you within 24 hours with a detailed quotation.
              </p>
              <div className="bg-secondary/50 rounded-xl p-6 mb-8">
                <p className="text-sm text-muted-foreground mb-2">Need immediate assistance?</p>
                <a 
                  href="tel:+94722890068" 
                  className="flex items-center justify-center gap-2 text-primary font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  072 289 0068
                </a>
              </div>
              <Button variant="gold" onClick={() => setIsSubmitted(false)}>
                Submit Another Request
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-cream py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary font-medium tracking-wider uppercase text-sm">
              Custom Orders
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
              Bring Your Vision to Life
            </h1>
            <p className="text-muted-foreground text-lg">
              Our master artisans can create bespoke Buddha statues and sculptures 
              tailored to your exact specifications. Share your requirements, and we'll 
              provide a detailed quotation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-8 shadow-card"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="072 289 0068"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Delivery Location *</Label>
                  <Input
                    id="location"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    required
                  />
                </div>

                {/* Statue Type */}
                <div className="space-y-2">
                  <Label>Statue Type *</Label>
                  <Select
                    value={formData.statueType}
                    onValueChange={(value) => handleChange("statueType", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {statueTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Material */}
                <div className="space-y-2">
                  <Label>Preferred Material *</Label>
                  <Select
                    value={formData.material}
                    onValueChange={(value) => handleChange("material", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((material) => (
                        <SelectItem key={material} value={material}>
                          {material}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Height */}
                <div className="space-y-2">
                  <Label htmlFor="height">Desired Height</Label>
                  <Input
                    id="height"
                    placeholder="e.g., 4 feet"
                    value={formData.height}
                    onChange={(e) => handleChange("height", e.target.value)}
                  />
                </div>

                {/* Width */}
                <div className="space-y-2">
                  <Label htmlFor="width">Desired Width</Label>
                  <Input
                    id="width"
                    placeholder="e.g., 2 feet"
                    value={formData.width}
                    onChange={(e) => handleChange("width", e.target.value)}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 mt-6">
                <Label htmlFor="description">Additional Details</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your vision, any specific poses, finishes, or reference images you'd like us to consider..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>

              {/* Reference Image Upload Hint */}
              <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Upload className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Have reference images?</p>
                    <p className="text-sm text-muted-foreground">
                      After submitting, you can share reference images via email for a more accurate quotation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Price Note */}
              <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Pricing:</span> Custom orders are quotation-based. 
                  We'll provide a detailed price estimate within 24 hours of receiving your request.
                </p>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="gold"
                size="xl"
                className="w-full mt-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="mr-2 w-5 h-5" />
                    Submit Custom Order Request
                  </>
                )}
              </Button>
            </motion.form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CustomOrder;
