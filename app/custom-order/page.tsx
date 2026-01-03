"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Send, Upload, CheckCircle, Phone, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";

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

export default function CustomOrderPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceImages, setReferenceImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload only image files.",
          variant: "destructive",
        });
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload images smaller than 5MB.",
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    const newFiles = [...referenceImages, ...validFiles];
    setReferenceImages(newFiles);

    // Create previews
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setReferenceImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  if (isSubmitted) {
    return (
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
    );
  }

  return (
    <>
      {/* Hero */}
      <PageHero
        title="Bring Your Vision to Life"
        subtitle="Custom Orders"
        description="Our master artisans can create bespoke Buddha statues and sculptures tailored to your exact specifications. Share your requirements, and we'll provide a detailed quotation."
        imageSrc="/assets/products/buddha-face-1.jpg"
      />

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

                <div className="space-y-2">
                  <Label htmlFor="height">Desired Height</Label>
                  <Input
                    id="height"
                    placeholder="e.g., 4 feet"
                    value={formData.height}
                    onChange={(e) => handleChange("height", e.target.value)}
                  />
                </div>

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

              <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-start gap-3 mb-4">
                  <Upload className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-1">Have reference images?</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Upload reference images to help us better understand your vision.
                    </p>
                    <Label htmlFor="reference-images" className="cursor-pointer">
                      <div className="flex items-center gap-2 px-4 py-2 border border-dashed border-muted-foreground/30 rounded-lg hover:border-primary transition-colors">
                        <ImageIcon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Click to upload images</span>
                        <Input
                          id="reference-images"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                    </Label>
                  </div>
                </div>

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden border border-border">
                          <Image
                            src={preview}
                            alt={`Reference ${index + 1}`}
                            width={150}
                            height={150}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Pricing:</span> Custom orders are quotation-based.
                  We'll provide a detailed price estimate within 24 hours of receiving your request.
                </p>
              </div>

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
    </>
  );
}

