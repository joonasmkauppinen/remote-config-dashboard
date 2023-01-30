import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import { Toolbar } from "../components/Toolbar/Toolbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      {session && (
        <Toolbar
          profileImageSrc={session.user?.image}
          breadcrumbs={[
            { title: "Breadcrumb 1", href: "/" },
            { title: "Breadcrumb 2", href: "/" },
            { title: "Breadcrumb 3", href: "/" },
            { title: "Breadcrumb 4", href: "/" },
          ]}
        />
      )}
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
