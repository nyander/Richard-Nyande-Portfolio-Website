import { BootScreen } from '@/components/site/BootScreen'
import { ClientLeva } from '@/components/site/ClientLeva'
import { PageWidthControls } from '@/components/site/PageWidthControls'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'

import '../globals.css'

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BootScreen />
      <ClientLeva />
      <PageWidthControls />
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  )
}
