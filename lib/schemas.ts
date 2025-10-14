import { z } from 'zod';

export const leadFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  budget: z.string().min(1, 'Please select a budget range'),
  projectTypes: z
    .array(z.string())
    .min(1, 'Please select at least one project type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

export const auditFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  website: z.string().url('Please enter a valid website URL').optional(),
});

export type AuditFormData = z.infer<typeof auditFormSchema>;
