import { Toaster } from "@/components/ui/sonner";
import "../globals.css";
import { Header } from "@/components/ui/Header";

export default async function Layout(props: { children: React.ReactNode }) {
  return (
    <section>
      <Header />
      <div className="flex min-h-[calc(100dvh-64px)] flex-col">
        <div className="flex-1">{props.children}</div>
        <Toaster />
      </div>
    </section>
  );
}
