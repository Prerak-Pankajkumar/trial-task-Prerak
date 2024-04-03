"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import ButtonLoader from "@/app/_components/button-loader";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  password: z.string().min(2),
});

const SignUp = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signUpWithPassword = async (
    name: string,
    email: string,
    password: string,
  ) => {
    try {
      setLoading(true);
      const signupDetails = await signIn("custom-signup", {
        name,
        email,
        password,
        redirect: false,
      });
      if (signupDetails?.ok) {
        setLoading(false);
        toast({
          title: "Sign Up Successful",
        });
        router.push("/dashboard");
      } else {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Invalid Credentials",
          description: "User exists with same email!",
        });
      }
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Error with auth",
      });
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    signUpWithPassword(values.name, values.email, values.password).catch(
      (err) => {
        console.error(err);
      },
    );
  }

  return (
    <div className="text-primary-content flex min-h-screen justify-end bg-primary p-4">
      <Toaster></Toaster>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[4rem]">
          <span className="text-[hsl(280,100%,70%)]">Dex</span> Sign-Up
        </h1>
        <div className="flex w-full flex-col items-center gap-2">
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <div className="m-auto w-full max-w-96">
              <div className="flex w-full flex-col items-start">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg text-white">
                            Username
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="w-full max-w-96"
                              placeholder="username"
                              {...field}
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
                          <FormLabel className="text-lg text-white">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="w-full max-w-96"
                              placeholder="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg text-white">
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="w-full max-w-96"
                              placeholder="password"
                              {...field}
                              type="password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col items-center justify-center">
                      <div>
                        <Button
                          disabled={loading}
                          type="submit"
                          className="h-12 w-auto bg-[#341c57] p-4 text-2xl font-semibold hover:bg-[#341c57]"
                        >
                          Register {loading && <ButtonLoader />}
                        </Button>
                      </div>
                      <div className="mt-5 flex items-center">
                        <p className="mr-2 text-lg font-semibold text-white">
                          {"Already have an account?"}
                        </p>
                        <Link
                          className="text-lg text-white underline"
                          href={"/auth/signin"}
                        >
                          {"SignIn"}
                        </Link>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;