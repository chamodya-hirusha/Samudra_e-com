"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Lock, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName?: string;
  price?: number;
  selectedSize?: string;
  selectedFinish?: string;
}

export function PaymentModal({
  open,
  onOpenChange,
  productName,
  price = 0,
  selectedSize,
  selectedFinish,
}: PaymentModalProps) {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentType, setPaymentType] = useState<"full" | "advance">("full");
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    toast({
      title: paymentType === "advance" ? "Advance Payment Successful!" : "Payment Successful!",
      description: paymentType === "advance" 
        ? `Your advance payment of Rs. ${advanceAmount.toLocaleString()} has been processed. Remaining Rs. ${remainingAmount.toLocaleString()} to be paid on delivery.`
        : "Your order has been placed successfully. We'll send you a confirmation email shortly.",
    });
    onOpenChange(false);
    
    // Reset form
    setFormData({
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const subtotal = price;
  const deliveryFee = 5000;
  const fullTotal = subtotal + deliveryFee;
  const advanceAmount = Math.round(fullTotal * 0.5);
  const remainingAmount = fullTotal - advanceAmount;
  const total = paymentType === "advance" ? advanceAmount : fullTotal;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Complete Your Order</DialogTitle>
          <DialogDescription>
            Secure payment processing. Your information is encrypted and safe.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Order Summary */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-semibold">Order Summary</h3>
              
              {/* Payment Type Selection */}
              <div className="bg-primary/10 rounded-lg p-4 space-y-3 border-2 border-primary/20">
                <Label className="text-base font-semibold">Payment Option</Label>
                <RadioGroup value={paymentType} onValueChange={(value: "full" | "advance") => setPaymentType(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full" id="full" />
                    <Label htmlFor="full" className="cursor-pointer flex-1">
                      <div>
                        <span className="font-semibold">Full Payment</span>
                        <p className="text-xs text-muted-foreground">Pay the complete amount now</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advance" id="advance" />
                    <Label htmlFor="advance" className="cursor-pointer flex-1">
                      <div>
                        <span className="font-semibold">50% Advance Payment</span>
                        <p className="text-xs text-muted-foreground">Pay 50% now, balance on delivery</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
                {productName && (
                  <div>
                    <p className="font-semibold text-foreground">{productName}</p>
                    {selectedSize && (
                      <p className="text-sm text-muted-foreground">Size: {selectedSize}</p>
                    )}
                    {selectedFinish && (
                      <p className="text-sm text-muted-foreground">Finish: {selectedFinish}</p>
                    )}
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-semibold">Rs. {deliveryFee.toLocaleString()}</span>
                </div>
                <Separator />
                {paymentType === "advance" && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Full Amount</span>
                      <span className="font-semibold">Rs. {fullTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-primary">
                      <span>Advance (50%)</span>
                      <span className="font-semibold">Rs. {advanceAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                      <span>Balance on Delivery</span>
                      <span>Rs. {remainingAmount.toLocaleString()}</span>
                    </div>
                    <Separator />
                  </>
                )}
                <div className="flex justify-between text-lg font-bold">
                  <span>{paymentType === "advance" ? "Pay Now" : "Total"}</span>
                  <span className="text-primary">Rs. {total.toLocaleString()}</span>
                </div>
                {paymentType === "advance" && (
                  <p className="text-xs text-muted-foreground text-center pt-2 border-t">
                    Remaining Rs. {remainingAmount.toLocaleString()} to be paid on delivery
                  </p>
                )}
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-4 h-4" />
                <span>Secure SSL encrypted payment</span>
              </div>
            </div>

            {/* Payment Form */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-semibold">Payment Details</h3>

              {/* Payment Method */}
              <div className="space-y-3">
                <Label>Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="cursor-pointer flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="cursor-pointer">
                      Bank Transfer
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="cursor-pointer">
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      value={formData.cardNumber}
                      onChange={(e) =>
                        handleInputChange("cardNumber", formatCardNumber(e.target.value))
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={formData.cardName}
                      onChange={(e) => handleInputChange("cardName", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={formData.expiryDate}
                        onChange={(e) =>
                          handleInputChange("expiryDate", formatExpiryDate(e.target.value))
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        maxLength={4}
                        type="password"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-semibold">Contact Information</h4>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="072 289 0068"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-semibold">Delivery Address</h4>
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="Nittambuwa"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      placeholder="20000"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button type="submit" variant="gold" disabled={isProcessing} className="min-w-[150px]">
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  {paymentType === "advance" ? (
                    <>Pay Advance Rs. {total.toLocaleString()}</>
                  ) : (
                    <>Pay Rs. {total.toLocaleString()}</>
                  )}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

