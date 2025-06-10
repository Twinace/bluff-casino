"use client";

import { Check, Shield } from "lucide-react";
import { Card, Header } from "./shared";

export default function VerifyTab() {
  const levels = [
    {
      title: "Email Verification",
      sub: "Your email is verified",
      verified: true,
      cta: null,
    },
    {
      title: "Level 1 Verification: Basic Information",
      sub: "Fill in your details for us to get to know you better",
      verified: true,
      cta: "View and update",
    },
    {
      title: "Level 2 Verification: Identity Verification",
      sub: "Upload a copy of your ID",
      verified: false,
      cta: "Verify now",
    },
  ];

  return (
    <section className="space-y-6">
      <Header
        title="Account Verification"
        subtitle="Verify your account to gain full access"
      />

      {levels.map(({ title, sub, verified, cta }) => (
        <Card key={title} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {verified ? (
              <Check className="text-lime-400" />
            ) : (
              <Shield className="text-gray-500" />
            )}
            <div>
              <p className="font-medium leading-none">{title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
            </div>
          </div>
          {cta && (
            <button className="px-4 py-2 text-sm rounded-md bg-blue-600 hover:bg-blue-700">
              {cta}
            </button>
          )}
        </Card>
      ))}

      <Card className="flex items-center justify-between">
        <div>
          <p className="font-medium leading-none">Need Help?</p>
          <p className="text-xs text-gray-400 mt-0.5 max-w-md">
            Have questions or concerns regarding your Bluff account? Our experts
            are here to help!
          </p>
        </div>
        <button className="px-4 py-2 text-sm rounded-md bg-blue-600 hover:bg-blue-700">
          Chat with us
        </button>
      </Card>
    </section>
  );
}
