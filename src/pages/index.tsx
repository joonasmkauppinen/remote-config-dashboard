import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { signIn } from "next-auth/react";

import { getServerAuthSession } from "../server/auth";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Remote Config Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Remote Config{" "}
            <span className="text-[hsl(280,100%,70%)]">Dashboard</span>
          </h1>
          <div className="flex flex-col items-center gap-2">
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  if (session?.user) {
    return {
      redirect: {
        destination: "/project",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default Home;

const AuthShowcase: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={() => void signIn()}
      >
        Sign in
      </button>
    </div>
  );
};
