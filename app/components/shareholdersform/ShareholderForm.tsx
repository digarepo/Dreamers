// app/components/shareholder/ShareholderForm.tsx
import React from "react";
import { FormField } from "~/components/form/FormField";
import { CheckboxField } from "~/components/form/CheckboxField";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface ShareholderFormProps {
  actionData?: {
    success?: boolean;
    message?: string;
    error?: string;
  };
}

export const ShareholderForm: React.FC<ShareholderFormProps> = ({
  actionData,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Create New Shareholder</CardTitle>
    </CardHeader>
    <CardContent>
      <form method="post" className="space-y-6">
        <input type="hidden" name="_action" value="create" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information Section */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="English Name"
                name="name_english"
                required
                placeholder="John Doe"
              />

              <FormField
                label="Amharic Name"
                name="name_amharic"
                required
                placeholder="ጆን ዶይ"
              />

              <FormField
                label="Primary Phone"
                name="phone_1"
                type="tel"
                required
                placeholder="0911 234 567"
              />

              <FormField
                label="Secondary Phone"
                name="phone_2"
                type="tel"
                placeholder="0922 345 678"
              />

              <FormField
                label="Email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
              />

              <FormField
                label="Nationality"
                name="nationality"
                placeholder="Ethiopian"
              />
            </div>
          </div>

          {/* Address Section */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="City" name="city" placeholder="Addis Ababa" />
              <FormField label="Subcity" name="subcity" placeholder="Bole" />
              <FormField label="Wereda" name="wereda" placeholder="08" />
              <FormField
                label="House Number"
                name="house_number"
                placeholder="H-123"
              />
            </div>
          </div>

          {/* Share Information Section */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mb-4">Share Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Share Will"
                name="share_will"
                type="number"
                step="0.01"
                required
                placeholder="100"
              />

              <FormField
                label="Share Price"
                name="share_price"
                type="number"
                step="0.01"
                placeholder="500.00"
              />

              <FormField
                label="Receipt Number"
                name="receipt_number"
                placeholder="RCPT-2023-001"
              />

              <FormField
                label="Certificate Number"
                name="certificate_number"
                placeholder="CERT-2023-001"
              />
            </div>
          </div>

          {/* Status Section */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mb-4">Status Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CheckboxField
                name="attendance_2023_dec_24"
                label="Attended Dec 24, 2023 Meeting"
              />

              <CheckboxField
                name="taken_certificate"
                label="Certificate Taken"
              />
            </div>
          </div>

          {/* Error Information Section */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mb-4">Error Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                label="Error Share"
                name="error_share"
                placeholder="Description of share error"
              />

              <FormField
                label="Error Form"
                name="error_form"
                placeholder="Description of form error"
              />

              <FormField
                label="Error Bank Slip"
                name="error_bank_slip"
                placeholder="Description of bank slip error"
              />
            </div>
          </div>

          {/* Comments Section */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mb-4">Comments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Comment Medina"
                name="comment_medina"
                type="textarea"
                placeholder="Comments from Medina..."
              />

              <FormField
                label="General Comment"
                name="general_comment"
                type="textarea"
                placeholder="Any general comments..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-primary hover:bg-primary-dark">
            Create Shareholder
          </Button>
        </div>

        {actionData && (
          <div
            className={`mt-4 p-4 rounded-md ${
              actionData.success
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {actionData.success ? actionData.message : actionData.error}
          </div>
        )}
      </form>
    </CardContent>
  </Card>
);
