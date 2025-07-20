import "./globals.css";
import { Comic_Neue } from "next/font/google";

const fontSans = Comic_Neue({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="es" className="">
      <body>
        <main className={`${fontSans.className}  antialiased`}>
          {props.children}
        </main>
      </body>
    </html>
  );
}
