import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  QrCode,
  Download,
  IdCard,
  Phone,
  Mail,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useDigitalId } from "@/contexts/DigitalIdContext";
import { useToast } from "@/hooks/use-toast";
import { QRCodeCanvas } from "qrcode.react";

interface DigitalId {
  id: string;
  name: string;
  nationality: string;
  phone: string;
  email: string;
  validFrom: string;
  validTo: string;
  emergencyContacts: Array<{
    name: string;
    phone: string;
    relationship: string;
  }>;
  aadhaarNumber?: string;
  passportNumber?: string;
}


export default function MyDigitalId() {
  const { toast } = useToast();
  const { digitalId, hasId, handleGenerateId, qrImage } = useDigitalId();

  const [isLoading, setIsLoading] = useState(false);
  const [showFlipped, setShowFlipped] = useState(false);
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    idType: "",
    idNumber: "",
    name: "",
    nationality: "",
    phone: "",
    email: "",
    dob: "",
    gender: "",
    startingLoc: "",
    destination: "",
    emergencyContacts: [{ name: "", phone: "", relationship: "" }],
  });

  const handleSubmit = async () => {
    if (!formData.idType || !formData.idNumber || !formData.name) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    await handleGenerateId(formData);
    setIsGenerateDialogOpen(false);
    setIsLoading(false);

    toast({
      title: "Digital ID Generated",
      description: "Your trip ID has been successfully created!",
      variant: "default",
    });
  };

  const handleDownloadQR = () => {
    if (!qrImage) return;

    const link = document.createElement("a");
    link.href = qrImage;
    link.download = "digital-id-qr.png";
    link.click();

    toast({
      title: "QR Code Downloaded",
      description: "QR code saved to your device",
      variant: "default",
    });
  };

  const addEmergencyContact = () => {
    setFormData((prev) => ({
      ...prev,
      emergencyContacts: [
        ...prev.emergencyContacts,
        { name: "", phone: "", relationship: "" },
      ],
    }));
  };

  // UI rendering logic goes below...
  // Use `hasId && digitalId` to conditionally render the card

  if (!hasId) {
    return (
<div className="min-h-screen flex items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="text-center space-y-6 max-w-md"
    >
      <div className="space-y-4">
        <QrCode className="w-16 h-16 mx-auto text-muted-foreground" />
        <div>
          <h1 className="text-2xl font-bold text-heading mb-2">
            Digital Trip ID
          </h1>
          <p className="text-subtext">
            Generate your secure digital ID for safe travel
          </p>
        </div>
      </div>

      <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="bg-gradient-safety hover:bg-secondary-hover transition-smooth shadow-elevated"
          >
            <IdCard className="w-5 h-5 mr-2" />
            Generate My Trip ID
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Your Digital Trip ID</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* ID Type & Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="idType">ID Type *</Label>
                <Select
                  value={formData.idType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, idType: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aadhaar">Aadhaar Number</SelectItem>
                    <SelectItem value="passport">Passport Number</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="idNumber">
                  {formData.idType === "aadhaar" ? "Aadhaar Number" : "Passport Number"} *
                </Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, idNumber: e.target.value }))
                  }
                  placeholder={formData.idType === "aadhaar" ? "XXXX-XXXX-XXXX" : "A1234567"}
                />
              </div>
            </div>

            {/* Name & Nationality */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, nationality: e.target.value }))
                  }
                  placeholder="Enter nationality"
                />
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="+91-9876543210"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="email@example.com"
                />
              </div>
            </div>

            {/* DOB & Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, gender: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Trip Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startingLoc">Starting Location</Label>
                <Input
                  id="startingLoc"
                  value={formData.startingLoc}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, startingLoc: e.target.value }))
                  }
                  placeholder="e.g. Jaipur"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, destination: e.target.value }))
                  }
                  placeholder="e.g. Manali"
                />
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Emergency Contacts</Label>
                <Button type="button" variant="outline" size="sm" onClick={addEmergencyContact}>
                  Add Contact
                </Button>
              </div>

              {formData.emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 border rounded-lg"
                >
                  <Input
                    placeholder="Contact Name"
                    value={contact.name}
                    onChange={(e) => {
                      const newContacts = [...formData.emergencyContacts];
                      newContacts[index].name = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        emergencyContacts: newContacts,
                      }));
                    }}
                  />
                  <Input
                    placeholder="Phone Number"
                    value={contact.phone}
                    onChange={(e) => {
                      const newContacts = [...formData.emergencyContacts];
                      newContacts[index].phone = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        emergencyContacts: newContacts,
                      }));
                    }}
                  />
                  <Input
                    placeholder="Relationship"
                    value={contact.relationship}
                    onChange={(e) => {
                      const newContacts = [...formData.emergencyContacts];
                      newContacts[index].relationship = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        emergencyContacts: newContacts,
                      }));
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Submit Button with Loading */}
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-safety hover:bg-secondary-hover flex items-center justify-center gap-2"
            >
              {isLoading && (
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-opacity-50" />
              )}
              {isLoading ? "Generating..." : "Generate Digital ID"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-heading">My Digital ID</h1>
          <p className="text-subtext">Your secure travel identification</p>
        </div>

        <Dialog open={isVerifyDialogOpen} onOpenChange={setIsVerifyDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Forgot Password
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Re-verify Identity</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-warning" />
                <p className="text-sm">
                  Enter your Aadhaar/Passport number to reset access
                </p>
              </div>
              <Input placeholder="Enter Aadhaar/Passport number" />
              <Button className="w-full">Verify & Reset</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-center">
        <motion.div
          className="relative w-full max-w-md"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            animate={{ rotateY: showFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative h-96 cursor-pointer"
            onClick={() => setShowFlipped(!showFlipped)}
          >
            {/* Front of Card - QR Code */}
            <motion.div
              style={{ backfaceVisibility: "hidden" }}
              className="absolute inset-0"
            >
              <Card className="h-full shadow-elevated bg-gradient-safety text-secondary-foreground">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold">
                    Digital Trip ID
                  </CardTitle>
                  <p className="text-secondary-foreground/80">
                    Scan for verification
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
  <div className="w-48 h-48 bg-card rounded-lg flex items-center justify-center">
    <QRCodeCanvas
      value={JSON.stringify({
        id: digitalId.id,
        name: digitalId.name,
        phone: digitalId.phone,
        email: digitalId.email,
        nationality: digitalId.nationality,
      })}
      size={160}
    />
  </div>

  <div className="text-center">
    <p className="font-semibold text-lg">{digitalId.name}</p>
    <p className="text-secondary-foreground/80">ID: {digitalId.id}</p>
  </div>
</CardContent>

              </Card>
            </motion.div>

            {/* Back of Card - Details */}
            <motion.div
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
              className="absolute inset-0"
            >
              <Card className="h-full shadow-elevated bg-gradient-authority text-primary-foreground">
                <CardHeader>
                  <CardTitle className="text-lg">Trip Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-primary-foreground/80">
                        Valid From:
                      </span>
                      <span className="font-medium">{digitalId.validFrom}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-foreground/80">
                        Valid To:
                      </span>
                      <span className="font-medium">{digitalId.validTo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-foreground/80">
                        Nationality:
                      </span>
                      <span className="font-medium">
                        {digitalId.nationality}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-primary-foreground/20 pt-3">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Emergency Contacts
                    </h4>
                    <div className="space-y-1">
                      {digitalId.emergencyContacts.map((contact, index) => (
  <div key={index} className="text-xs">
    <div className="font-medium">
      {contact.name} ({contact.relationship})
    </div>
    <div className="text-primary-foreground/70">
      {contact.phone}
    </div>
  </div>
))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="text-center space-y-4">
        <p className="text-subtext">Click the card to flip and view details</p>

        <div className="flex justify-center space-x-4">
          <Button onClick={handleDownloadQR} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download QR
          </Button>

          <Button variant="outline">
            <Mail className="w-4 h-4 mr-2" />
            Share via Email
          </Button>
        </div>
      </div>
    </div>
  );
}
