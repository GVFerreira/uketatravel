import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import HeaderCKT from "../components/header"
import FooterCKT from "../components/footer"

const Pix = dynamic(() => import('./pix-component'))

export default function YourComponent() {
  return (
    <>
      <HeaderCKT />
      <Suspense fallback={<div>Loading...</div>}>
        <Pix />
      </Suspense>
      <FooterCKT />
    </>
  )
}