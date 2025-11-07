"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CircleDotDashed, Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createNewUser } from "@/actions/auth/create-new-user";
import { createNewVaccine } from "@/actions/vaccine";

// --- 1. Zod Schema (Kono Change Nai) ---
const vaccineFormSchema = z.object({
  code: z.string(),
  name: z.string().min(2, "Name is required."),
  manufacturer: z.string(),
  antigen: z.string(),
  series_name: z.string(),
  dose_count: z.coerce.number().int().positive(),
  dose_volume: z.string(),
  dose_unit: z.string(),
  route: z.string(),
  site_examples: z.string(),
  min_age_months: z.coerce.number().int().positive(),
  notes: z.string(),
});

type VaccineFormValues = z.infer<typeof vaccineFormSchema>;

// --- Helper: Red & White Theme (UPDATED) ---
// Ekhon shudhu focus hole red dekhabe
const labelClass = "text-sm font-medium text-gray-700 dark:text-gray-300";
const inputClass =
  "bg-white focus-visible:ring-red-500 dark:bg-gray-900 dark:focus-visible:ring-red-300";
const buttonClass =
  "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 dark:text-white cursor-pointer"; // Button stays red (CTA)

// --- 2. Main Form Component ---
export default function VaccineEntryForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<VaccineFormValues>({
    resolver: zodResolver(vaccineFormSchema) as any,
    defaultValues: {
      code: "",
      name: "",
      manufacturer: "",
      antigen: "",
      series_name: "",
      dose_volume: "",
      site_examples: "",
      notes: "",
    },
  });


  const onSubmit = async (data: VaccineFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Form Data  ", data);
      const result = await createNewVaccine(data);

      if (result.error) {
        setError(result.error);
        return;
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // --- UPDATED BORDER ---
    <div className="w-full max-w-4xl mx-auto p-8 my-10 bg-white dark:bg-gray-950 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800">
      <div className="mb-6 text-center">
        <CircleDotDashed className="mx-auto h-12 w-12 text-red-600" />
        {/* --- UPDATED HEADER TEXT --- */}
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          New Vaccine Profile
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Enter the details for a new vaccine type in the inventory.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Field: Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel className={labelClass}>Vaccine Name*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., COVID-19 (Moderna)"
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Field: Code */}
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel className={labelClass}>Code (CVX/SNOMED)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 207"
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Field: Manufacturer */}
            <FormField
              control={form.control}
              name="manufacturer"
              render={({ field }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel className={labelClass}>Manufacturer</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Moderna US, Inc."
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Field: Antigen */}
            <FormField
              control={form.control}
              name="antigen"
              render={({ field }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel className={labelClass}>Antigen</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., COVID-19"
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* --- Full Width Divider (UPDATED) --- */}
            <div className="md:col-span-2 pt-2">
              <hr className="border-gray-200 dark:border-gray-700" />
            </div>

            {/* Field: Series Name */}
            <FormField
              control={form.control}
              name="series_name"
              render={({ field }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel className={labelClass}>Series Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Primary Series"
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Field: Dose Count */}
            <FormField
              control={form.control}
              name="dose_count"
              render={({ field }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel className={labelClass}>Dose Count</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g., 2"
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Field: Dose Volume */}
            <FormField
              control={form.control}
              name="dose_volume"
              render={({ field }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel className={labelClass}>Dose Volume</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 0.5"
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Field: Dose Unit */}
            <FormField
              control={form.control}
              name="dose_unit"
              render={({ field }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel className={labelClass}>Dose Unit</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={inputClass}>
                        <SelectValue placeholder="Select a unit" />
                      </SelectTrigger>
                    </FormControl>
                    {/* --- UPDATED Select --- */}
                    <SelectContent className="bg-white dark:bg-gray-900">
                      <SelectItem value="ml">mL (milliliter)</SelectItem>
                      <SelectItem value="mcg">mcg (microgram)</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Field: Route */}
            <FormField
              control={form.control}
              name="route"
              render={({ field }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel className={labelClass}>Route</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={inputClass}>
                        <SelectValue placeholder="Select a route" />
                      </SelectTrigger>
                    </FormControl>
                    {/* --- UPDATED Select --- */}
                    <SelectContent className="bg-white dark:bg-gray-900">
                      <SelectItem value="IM">IM (Intramuscular)</SelectItem>
                      <SelectItem value="SC">SC (Subcutaneous)</SelectItem>
                      <SelectItem value="PO">PO (Oral)</SelectItem>
                      <SelectItem value="Nasal">Nasal Spray</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Field: Min Age */}
            <FormField
              control={form.control}
              name="min_age_months"
              render={({ field }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel className={labelClass}>Min. Age (Months)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g., 6"
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Field: Site Examples */}
            <FormField
              control={form.control}
              name="site_examples"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className={labelClass}>Site Examples</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Deltoid muscle, Anterolateral thigh"
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Field: Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className={labelClass}>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional notes about storage or administration..."
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* --- Submit Button --- */}
          <div className="pt-4 text-right">
            <Button
              type="submit"
              className={`${buttonClass} w-full md:w-auto px-10 py-6 text-lg font-semibold cursor-pointer`}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : null}
              {isLoading ? "Saving..." : "Save Vaccine Profile"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
