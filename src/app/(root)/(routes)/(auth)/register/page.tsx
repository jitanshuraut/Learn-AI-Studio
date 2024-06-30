"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/LandingPage/form";
import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/LandingPage/input";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { register } from "@/actions/register";
import toast from "react-hot-toast";

export default function Page() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      register(values).then((data) => {
        console.log("Printing registration data ", data);
        if (data?.error) {
          toast.error(data.error);
        }
        if (data?.success) {
          toast.success(data.success);
          form.reset({ email: "", password: "", name: "" });
        }
      });
    });
  };

  return (
    <CardWrapper
      headerTitle="Register"
      backButtonLabel="Already have an account?"
      backButtonHref="/login"
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-1 w-full"
        >
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Tyler Durden"
                      disabled={isPending}
                      type="name"
                      className="bg-background/50 dark:bg-background/30 ring-foreground/5"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="tylerdurden@gmail.com"
                      disabled={isPending}
                      type="email"
                      className="bg-background/50 dark:bg-background/30 ring-foreground/5"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="••••••••"
                      disabled={isPending}
                      type="password"
                      className="bg-background/50 dark:bg-background/30 ring-foreground/5"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 " />
                </FormItem>
              )}
            />
            <div></div>
          </div>
          <Button className="w-full" disabled={isPending} type="submit">
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
