import Header from '@/components/public/header';
import Footer from '@/components/public/footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />

      <main className='flex-grow'>{children}</main>

      <Footer />
    </div>
  );
}
