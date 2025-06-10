"use client";

import { ChevronRight } from "lucide-react";
import { Card, Header, ButtonSecondary } from "./shared";

export default function SecurityTab() {
  return (
    <section className="space-y-6">
      <Header title="Security" subtitle="Manage your account security" />

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="flex flex-col gap-2">
          <p className="font-medium">Change Password</p>
          <p className="text-xs text-gray-400">Last changed: 15/01/2025</p>
          <ButtonSecondary className="mt-auto flex items-center gap-1">
            Change password <ChevronRight size={14} />
          </ButtonSecondary>
        </Card>

        <Card className="flex flex-col gap-2">
          <p className="font-medium">Two-Factor Authentication</p>
          <p className="text-xs text-gray-400">
            Enhance your security by using 2-factor verification via an
            authenticator app for all future logins, withdrawals and tipping.
          </p>
          <button className="mt-auto self-start px-4 py-2 text-sm rounded-md bg-blue-600 hover:bg-blue-700">
            Enable
          </button>
        </Card>
      </div>
    </section>
  );
}
