import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";

const AnyForm = () => {
  const form = useForm();

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {})}
          className="form-container space-y-4"
        >
          <FormField
            control={form.control}
            name="example"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Example Field</FormLabel>
                <FormControl>
                  <input className="w-full p-2 border rounded" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default AnyForm;
