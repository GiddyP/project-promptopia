'use client';
import "@styles/globals.css";
import React from "react";
import Nav from "@components/Nav";
import { SessionProvider } from "next-auth/react";

const Provider = ({ children }: { children: React.ReactNode; }) => (
    <SessionProvider>
        {children}
    </SessionProvider>
);

export default Provider;
