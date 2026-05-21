'use client'

export default function Footer() {
  return (
    <footer className="bg-sexy-white border-t border-charcoal/5 pt-20 md:pt-24 pb-10 md:pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16 md:mb-20">
          <div className="sm:col-span-2">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal tracking-widest mb-4">CIRCLE</h2>
            <p className="text-sm text-charcoal-light font-light leading-relaxed max-w-md">
              An unparalleled dining experience in the heart of Benin City. Where cutting-edge luxury meets time-honoured culinary mastery.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-crimson mb-5 font-semibold">Hours</h4>
            <ul className="space-y-3 text-sm text-charcoal-light font-light">
              <li className="flex justify-between"><span>Mon - Thu</span> <span className="text-charcoal/70">12:00 - 23:00</span></li>
              <li className="flex justify-between"><span>Fri - Sat</span> <span className="text-charcoal/70">12:00 - 01:00</span></li>
              <li className="flex justify-between"><span>Sun</span> <span className="text-charcoal/70">13:00 - 22:00</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-crimson mb-5 font-semibold">Location</h4>
            <ul className="space-y-3 text-sm text-charcoal-light font-light">
              <li>10 Airport Road</li>
              <li>Benin City, Edo State</li>
              <li>Nigeria</li>
              <li className="pt-2 text-crimson font-medium">RSVP: +234 800 CIRCLE 1</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-charcoal/5 gap-4 text-center md:text-left">
          <p className="text-[10px] uppercase tracking-widest text-charcoal/40">
            © {new Date().getFullYear()} Circle Restaurant. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-[10px] uppercase tracking-widest text-charcoal/40 hover:text-charcoal cursor-pointer transition-colors">Instagram</span>
            <span className="text-[10px] uppercase tracking-widest text-charcoal/40 hover:text-charcoal cursor-pointer transition-colors">Twitter</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
