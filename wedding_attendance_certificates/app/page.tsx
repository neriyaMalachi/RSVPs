'use client'
import RSVPForm from "@/components/RSVPForm";
import GuestList from '@/components/GuestList';
import Image from "next/image";
import React from 'react';
import { BrowserRouter as Router, Route, BrowserRouter } from 'react-router-dom';
export default function Home() {
  return (
  //   <BrowserRouter>
  //   <Router>
  //       <Route path="/" element={<RSVPForm/>} /> 
  //      <Route path="/admin" element={<GuestList/>} /> 
  //  </Router>
  //  </BrowserRouter>
  <RSVPForm/>
  );
}
