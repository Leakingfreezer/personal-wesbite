import { useLoaderData } from 'react-router'
import About from '../components/sections/About'
import Contact from '../components/sections/Contact'
import Hero from '../components/sections/Hero'
import PastWork from '../components/sections/PastWork'
import { getGalleryItems, getTechStack } from '../lib/projects'

/** Runs before the homepage renders (wired up in src/router.tsx): loads the Past Work grid and the tech stack together. */
export async function homeLoader() {
  const [galleryItems, techStack] = await Promise.all([getGalleryItems(), getTechStack()])
  return { galleryItems, techStack }
}

/**
 * The homepage is just the four sections in order.
 * The Contact placeholder is replaced by its real component in Phase 7.
 */
export default function HomePage() {
  const { galleryItems, techStack } = useLoaderData<typeof homeLoader>()

  return (
    <>
      <Hero />
      <About techStack={techStack} />
      <PastWork items={galleryItems} />
      <Contact />
    </>
  )
}
