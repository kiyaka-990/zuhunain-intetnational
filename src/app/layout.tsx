import "./globals.css";

export const metadata = {
  title: 'Zuhunain International Investments Limited',
  description: 'Infrastructure and Engineering Excellence in Nairobi, Kenya',
  icons: {
    icon: '/favicon.ico', // Ensure this matches your new file in /public
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Decorative Background Glows */}
        <div className="bg-glow top-[-10%] left-[-10%]" />
        <div className="bg-glow bottom-[-10%] right-[-10%]" />
        
        <main>{children}</main>
      </body>
    </html>
  );
}