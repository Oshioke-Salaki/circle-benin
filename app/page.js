import { menuData } from '../data/menu'
import MenuProvider from '../components/MenuProvider'
import SiteNav from '../components/SiteNav'
import Hero from '../components/Hero'
import Signatures from '../components/Signatures'
import MenuSection from '../components/menu/MenuSection'
import Visit from '../components/Visit'

export default function Page() {
  return (
    <MenuProvider>
      <SiteNav />
      <main>
        <Hero />
        <Signatures />
        {menuData.map((section) => (
          <MenuSection key={section.id} section={section} />
        ))}
      </main>
      <Visit />
    </MenuProvider>
  )
}
