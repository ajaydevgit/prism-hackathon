import { z } from "zod";

const memberSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  college: z.string().min(2, "College is required"),
  experienceLevel: z.enum(["Beginner", "Intermediate", "Advanced"], { required_error: "Experience level is required" }),
  muid: z.string().optional(),
});

export const registrationSchema = z.object({
  teamName: z.string().min(2, "Team name is required"),
  teamSize: z.number().min(2).max(4),
  members: z.array(memberSchema).min(2).max(4),
  allHaveMuLearn: z.boolean(),
  allHaveKarma: z.boolean(),
  domain: z.string().min(1, "Domain is required"),
  paymentId: z.string().optional(),
  declarations: z.array(z.boolean()).length(4), // Array of 4 booleans, all must be true
}).superRefine((data, ctx) => {
  // Check if declarations are all true
  if (data.declarations.some(d => d !== true)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "All declarations must be accepted",
      path: ["declarations"],
    });
  }

  // Validate member array length matches teamSize
  if (data.members.length !== data.teamSize) {
     ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Number of members must match team size",
      path: ["members"],
    });
  }

  const isFree = data.allHaveMuLearn && data.allHaveKarma;
  
  if (isFree) {
    // Check MUID for all members
    data.members.forEach((m, idx) => {
      if (!m.muid || m.muid.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "MUID is required for free registration",
          path: ["members", idx, "muid"],
        });
      }
    });
  } else {
    // Check Payment ID
    if (!data.paymentId || data.paymentId.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Payment transaction ID (UTR) is required",
        path: ["paymentId"],
      });
    } else if (data.paymentId.trim().length !== 12 || !/^\d{12}$/.test(data.paymentId.trim())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "UPI UTR must be exactly 12 digits",
        path: ["paymentId"],
      });
    }
  }
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
