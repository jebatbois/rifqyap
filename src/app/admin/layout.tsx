// Admin layout - Navbar and Footer are hidden via client-side path check
// in Navbar.tsx and Footer.tsx components

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
