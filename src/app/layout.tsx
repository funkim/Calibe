import './globals.css';
import type { Metadata } from 'next';
import Header from '../components/header';
import Footer from '../components/footer';

export const metadata: Metadata = {
  title: 'Calibe - Sustainable Techwear',
  description: 'Sustainable techwear for the modern adventurer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
