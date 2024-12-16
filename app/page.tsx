"use client";

import React, { useState } from "react";
import HomeFile from "@/pages/components/HomeFile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());

  return(
  <QueryClientProvider client={queryClient}>
    <HomeFile />
  </QueryClientProvider>
)}
