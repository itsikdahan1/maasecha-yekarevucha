import React from 'react';

// This component holds all our SVG icons for consistency
export const Icon = ({ name, className }) => {
  const icons = {
    // Logo
    logo: <svg width="48" height="48" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 2C50 2 52.96 10.32 61.1 10.32C69.24 10.32 75.34 2 75.34 2C75.34 2 71.22 26.54 81.02 36.34C90.82 46.14 98 43.26 98 43.26C98 43.26 80.92 56.88 72.22 66.1C63.52 75.32 50 78 50 78C50 78 36.48 75.32 27.78 66.1C19.08 56.88 2 43.26 2 43.26C2 43.26 9.18 46.14 18.98 36.34C28.78 26.54 24.66 2 24.66 2C24.66 2 30.76 10.32 38.9 10.32C47.04 10.32 50 2 50 2Z" fill="#06b6d4"></path><path d="M50 25.1C50 25.1 48.2 30.29 42.86 30.29C37.52 30.29 34.98 25.1 34.98 25.1C34.98 25.1 37.64 41.51 44.96 48.83C52.28 56.15 50 58 50 58C50 58 47.72 56.15 55.04 48.83C62.36 41.51 65.02 25.1 65.02 25.1C65.02 25.1 62.48 30.29 57.14 30.29C51.8 30.29 50 25.1 50 25.1Z" fill="white"></path><path d="M46 39.5L50 42L56.5 37.5" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>,
    
    // Navigation & General
    menu: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
    x: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="18" x2="18" y2="6"></line></svg>,
    arrowLeft: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>,
    check: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>,
    mail: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>,
    
    // Timeline & Workshops
    gift: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>,
    camera: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>,
    mic: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>,
    coffee: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,

    // Why Us Section
    heart: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    users: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    brainCircuit: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5a3 3 0 1 0-5.993.251"/><path d="M12 5a3 3 0 1 1 5.993.251"/><path d="M15 13a3 3 0 1 0-5.993.251"/><path d="M15 13a3 3 0 1 1 5.993.251"/><path d="M9.007 7.75A2.99 2.99 0 0 1 9 8a2.99 2.99 0 0 1-.007.25"/><path d="M15.007 7.75A2.99 2.99 0 0 0 15 8a2.99 2.99 0 0 0 .007.25"/><path d="M6.007 15.25A2.99 2.99 0 0 1 6 15a2.99 2.99 0 0 1-.007-.25"/><path d="M18.007 15.25A2.99 2.99 0 0 0 18 15a2.99 2.99 0 0 0 .007-.25"/><path d="M9 8v5"/><path d="M15 8v5"/><path d="M6 15h12"/><path d="M6.75 18a2.25 2.25 0 0 1-2.25 2.25v0A2.25 2.25 0 0 1 6.75 18"/><path d="M17.25 18a2.25 2.25 0 0 0 2.25 2.25v0A2.25 2.25 0 0 0 17.25 18"/><path d="M12 18a2.25 2.25 0 0 1-2.25 2.25v0A2.25 2.25 0 0 1 12 18"/></svg>,
    gem: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M12 22V9"/><path d="m3.29 8.71 8.71 8.71"/><path d="m20.71 8.71-8.71 8.71"/><path d="m2 9h20"/></svg>,
    
    // Floating Buttons
    whatsappBubble: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 12C2.13 14.06 2.7 16.01 3.71 17.69L2.5 21.5L6.41 20.32C7.99 21.29 9.85 21.88 11.84 21.88H12.04C17.5 21.88 21.95 17.43 21.95 11.97C21.95 6.51 17.5 2 12.04 2Z" fill="#25D366"/><path d="M10.03 7.52C9.84 7.52 9.68 7.52 9.53 7.52C9.28 7.52 9.06 7.58 8.86 7.97C8.67 8.36 8.04 9.03 8.04 10.2C8.04 11.37 8.88 12.49 9.01 12.67C9.13 12.85 10.93 15.42 13.48 16.48C15.54 17.34 16.04 17.16 16.41 17.1C16.83 17.03 17.65 16.56 17.85 15.97C18.05 15.38 18.05 14.88 17.99 14.79C17.93 14.7 17.77 14.64 17.52 14.52C17.27 14.4 16.1 13.88 15.88 13.8C15.67 13.71 15.51 13.65 15.35 13.94C15.19 14.23 14.71 14.79 14.56 14.95C14.41 15.11 14.26 15.14 14.01 15.02C13.76 14.9 12.89 14.61 11.83 13.66C11.01 12.93 10.45 12.04 10.3 11.8C10.15 11.56 10.26 11.44 10.38 11.32C10.49 11.21 10.63 11.03 10.75 10.89C10.87 10.75 10.93 10.63 11.02 10.45C11.11 10.27 11.05 10.12 10.99 10.00C10.93 9.88 10.51 8.86 10.33 8.41C10.15 7.96 9.99 7.52 10.03 7.52Z" fill="white"/></svg>,
  };
  
  const iconSvg = icons[name];
  if (!iconSvg) return null;

  return <span className={`inline-flex items-center justify-center ${className}`}>{iconSvg}</span>;
};