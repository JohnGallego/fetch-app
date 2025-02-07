"use client";

import { login } from "@/app/actions/auth.actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { LoginFormData, loginSchema } from "@/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

export type LoginFormProps = {
  className?: string;
};

export default function LoginForm({ className }: LoginFormProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    startTransition(async () => {
      const result = await login(data.name, data.email);

      if (result.success) {
        toast({
          title: "Login Successful",
          description: "You have successfully logged in.",
        });

        redirect("/search");
      } else {
        toast({
          title: "Login Failed",
          description:
            result.error || "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="relative">
      <div className="absolute -top-[120px] right-4 animate__animated animate__fadeInUp animate__faster animate__delay-1s">
        <Image
          src="/img/pupper.svg"
          width={200}
          height={200}
          className="w-[100px] h-[100px]"
          alt="Puppy"
          aria-hidden
        />
      </div>

      <Card
        className={cn(
          "w-full max-w-md animate__animated animate__fadeIn",
          className
        )}
      >
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your name and email to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
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
                        placeholder="john.doe@example.com"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={isPending}
              >
                {isPending ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          By logging in, you agree to our terms and conditions.
        </CardFooter>
      </Card>
    </div>
  );
}
