import ContactForm from '@/components/ContactForm';

export default function ContactPage(){
  return (
    <section className="container py-10 md:py-16 grid gap-6">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p className="opacity-80">For bookings and press.</p>
      <ContactForm />
    </section>
  );
}
