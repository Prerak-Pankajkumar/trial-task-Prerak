"use client";

import { useCallback, useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { type Session } from "next-auth";
import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";
import '@rainbow-me/rainbowkit/styles.css';

export const CloudWallet = () => {
  const { data: session } = useSession();
  const [currentSession, setCurrentSession] = useState<Session | null>(session);

  const create_session_mutation = api.session.create.useMutation();
  const find_session_mutation = api.session.findById.useMutation();
  const update_session_mutation = api.session.updateById.useMutation();

  const createOrUpdateSession = useCallback(
    async (sessionToken: string, expires: string) => {
      try {
        const existingSession = await find_session_mutation.mutateAsync({
          sessionId: sessionToken,
        });

        if (existingSession) {
          await update_session_mutation.mutateAsync({
            sessionId: sessionToken,
            expires,
          });
        } else {
          await create_session_mutation.mutateAsync({
            sessionToken,
            expires,
          });
        }
      } catch (error) {
        console.error("Error creating or updating session:", error);
      }
    },
    [create_session_mutation, find_session_mutation, update_session_mutation],
  );

  useEffect(() => {
    if (session !== currentSession) {
      setCurrentSession(session);
      if (session?.user?.name) {
        void createOrUpdateSession(session.user.name, session.expires);
      }
    }
  }, [session, currentSession, createOrUpdateSession]);

  return (
    <>
      <ConnectButton />
    </>
  );
};
