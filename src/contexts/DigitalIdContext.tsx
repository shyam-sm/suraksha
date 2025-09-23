import React, { createContext, useContext, useState, useEffect, useRef } from "react";

export type DigitalId = {
  id: string;
  name: string;
  nationality: string;
  phone: string;
  email: string;
  validFrom: string;
  validTo: string;
  emergencyContacts: EmergencyContact[];
  aadhaarNumber: string;
};

interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

interface FormData {
  idType: string;
  idNumber: string;
  name: string;
  nationality: string;
  dob: string;
  gender: string;
  emergencyContacts: EmergencyContact[]; // ✅ Correct type
  phone: string;
  email: string;
  startingLoc: string;
  destination: string;
}

interface DigitalIdContextType {
  digitalId: DigitalId | null;
  hasId: boolean;
  setDigitalId: (id: DigitalId | null) => void;
  handleGenerateId: (formData: FormData) => Promise<void>;
  qrImage: string | null;
}

const DigitalIdContext = createContext<DigitalIdContextType | undefined>(undefined);

export const DigitalIdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [digitalId, setDigitalIdState] = useState<DigitalId | null>(null);
  const [hasId, setHasId] = useState(false);
  const [qrImage, setQrImage] = useState<string | null>(null);
  const qrRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("digitalId");
    const qrStored = localStorage.getItem("digitalIdQR");
    if (stored) {
      setDigitalIdState(JSON.parse(stored));
      setHasId(true);
    }
    if (qrStored) {
      setQrImage(qrStored);
    }
  }, []);

  const setDigitalId = (id: DigitalId | null) => {
    if (id) {
      localStorage.setItem("digitalId", JSON.stringify(id));
      setHasId(true);
    } else {
      localStorage.removeItem("digitalId");
      setHasId(false);
    }
    setDigitalIdState(id);
  };

  const maskAadhaar = (aadhaar: string) => {
    return aadhaar.replace(/\d(?=\d{4})/g, "*");
  };

  const handleGenerateId = async (formData: FormData) => {
    if (!formData.idType || !formData.idNumber || !formData.name) {
      console.error("Validation Error: Missing required fields");
      return;
    }

    const payload = {
      digiId: formData.idNumber,
      name: formData.name,
      nationality: formData.nationality,
      verificationId: formData.idNumber,
      idType: formData.idType,
      firebaseDoc: {
        validFrom: new Date().toISOString().split("T")[0],
        validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        dob: formData.dob,
        gender: formData.gender,
        emergencyContacts: formData.emergencyContacts,
        contactNo: formData.phone,
        email: formData.email,
        age: 25,
        startingLoc: formData.startingLoc,
        destination: formData.destination,
      },
    };

    try {
      const res = await fetch("https://server-sb-9em3.onrender.com/api/digiid/genID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to generate ID");

      const formattedDigitalId: DigitalId = {
        id: formData.idNumber || "TRP-2024-001",
        name: formData.name,
        nationality: formData.nationality,
        phone: formData.phone,
        email: formData.email,
        validFrom: new Date().toISOString().split("T")[0],
        validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        emergencyContacts: formData.emergencyContacts,
        aadhaarNumber: maskAadhaar(formData.idNumber),
      };

      localStorage.setItem("digitalId", JSON.stringify(formattedDigitalId));
      setDigitalId(formattedDigitalId);

      const qrPayload = {
        id: formData.idNumber,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        nationality: formData.nationality,
      };

      const qrString = JSON.stringify(qrPayload);

      setTimeout(() => {
        const canvas = qrRef.current;
        if (canvas) {
          const qrUrl = canvas.toDataURL("image/png");
          localStorage.setItem("digitalIdQR", qrUrl);
          setQrImage(qrUrl);
        }
      }, 100);
    } catch (err) {
      console.error("Generation Failed:", err);
    }
  };

  return (
    <DigitalIdContext.Provider value={{ digitalId, hasId, setDigitalId, handleGenerateId, qrImage }}>
      {children}
    </DigitalIdContext.Provider>
  );
};

export const useDigitalId = () => {
  const context = useContext(DigitalIdContext);
  if (!context) {
    throw new Error("useDigitalId must be used within a DigitalIdProvider");
  }
  return context;
};
