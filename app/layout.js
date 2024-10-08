
import "./globals.css";

// components
// header
import Header from "@/components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="w-screen h-screen">
          <div className="max-w-[720px] mx-auto py-1 h-screen">
          {/* header */}
          <Header />
          <div>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
