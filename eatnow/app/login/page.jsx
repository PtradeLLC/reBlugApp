import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <div className="w-full lg:grid lg:min-h-[800px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex mt-5 justify-center pb-4 pt-0">
        <div className="mx-auto w-[350px]">
          <div className=" text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Use the providers below to login or sign up for an account.
            </p>
          </div>
          <div className="mt-10">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="hidden bg-slate-600 lg:block">
        <Image
          src="/images/loginImage.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
