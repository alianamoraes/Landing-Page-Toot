'use client'

import {
  ArrowRight,
  Clock3,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  X,
  Zap,
} from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const whatsappUrl = 'https://wa.me/5511997092246?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20Toot%20Pet.'
const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Av.+Jo%C3%A3o+XXIII,+3247,+Mogi+das+Cruzes,+SP'

const services = [
  { icon: ShoppingBag, title: 'Rações', text: 'Opções para cuidar da rotina e da saúde do seu pet.' },
  { icon: ShieldCheck, title: 'Medicamentos', text: 'Cuidados essenciais para cães e gatos.' },
  { icon: Zap, title: 'Acessórios', text: 'Tudo para deixar seu pet mais confortável e feliz.' },
  { icon: Truck, title: 'Entrega', text: 'Peça com praticidade e consulte as condições.' },
]

const reviews = [
  { initial: 'D', color: 'bg-[#5a8d39]', text: 'Lugar espaçoso, ótimo atendimento e grande variedade de produtos.' },
  { initial: 'C', color: 'bg-[#8255a4]', text: 'Excelente Pet Shop com diversidades de produtos e preços ótimos!' },
]

const InstagramIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-none stroke-current stroke-2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".75" className="fill-current stroke-none" /></svg>
const FacebookIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current"><path d="M14 8h3V4h-3c-3.1 0-5 1.9-5 5v3H6v4h3v8h4v-8h3.3l.7-4H13V9c0-.7.3-1 1-1Z" /></svg>

const storeImages = [
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GQu482S3NXQ3jEOXTwS1loqZWunLlA.png', alt: 'Foto 1 da loja TootPet', width: 553, height: 333, fit: 'contain' as const, objectPosition: 'center' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AM5WMBDEeUh2rm6FouMuG3C6p5huHv.png', alt: 'Foto 2 da loja TootPet', width: 423, height: 399, fit: 'cover' as const, objectPosition: 'center' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-x3HJZUAGawvIQ0goZslQa7qcyXiMng.png', alt: 'Foto 3 da loja TootPet', width: 400, height: 400, fit: 'cover' as const, objectPosition: 'center' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tNehAgyl1b8pr0lg9754MIF9O5pdwJ.png', alt: 'Foto 4 da loja TootPet', width: 453, height: 395, fit: 'cover' as const, objectPosition: 'center' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8IRrI52rDmfJIfeKyRc2FUeykq2iG8.png', alt: 'Foto 5 da loja TootPet', width: 350, height: 321, fit: 'cover' as const, objectPosition: 'center' },
]

type StoreCarouselApi = {
  on: (event: 'select', callback: () => void) => void
  off: (event: 'select', callback: () => void) => void
  selectedScrollSnap: () => number
  scrollNext: () => void
  scrollTo: (index: number) => void
}

function StoreCarousel() {
  const [api, setApi] = useState<StoreCarouselApi | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (!api) return
    const updateIndex = () => setActiveIndex(api.selectedScrollSnap())
    updateIndex()
    api.on('select', updateIndex)
    return () => api.off('select', updateIndex)
  }, [api])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!api || isPaused || reducedMotion) return
    const interval = window.setInterval(() => api.scrollNext(), 5000)
    return () => window.clearInterval(interval)
  }, [api, isPaused, reducedMotion])

  return (
    <div
      className="relative mx-auto w-full max-w-[560px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="relative rounded-3xl ring-2 ring-[#f5c400]/80 shadow-[0_24px_60px_rgba(44,32,53,.16),0_8px_24px_rgba(245,196,0,.12)]">
        <Carousel
          setApi={(carouselApi) => setApi(carouselApi ?? null)}
          opts={{ loop: true, duration: 24 }}
          aria-label="Fotos da TootPet"
          aria-roledescription="carrossel"
          className="group overflow-hidden rounded-3xl border-4 border-white"
        >
          <CarouselContent className="-ml-0">
            {storeImages.map((image, index) => (
              <CarouselItem key={image.src} className="pl-0">
                <div className="relative h-full w-full aspect-[4/3] overflow-hidden bg-[#29242c]">
                  {image.fit === 'contain' && <Image src={image.src} alt="" fill sizes="(max-width: 640px) calc(100vw - 48px), 560px" className="absolute inset-0 z-0 scale-110 object-cover blur-2xl brightness-75" aria-hidden="true" />}
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    quality={90}
                    priority={index === 0}
                    sizes="(max-width: 640px) calc(100vw - 48px), 560px"
                    className={`absolute inset-0 z-10 h-full w-full ${image.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
                    style={{ objectPosition: image.objectPosition }}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[35%] bg-gradient-to-t from-black/35 to-transparent" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <span className="absolute left-4 top-4 z-10 rounded-full bg-white/95 px-3 py-2 text-[10px] font-black uppercase tracking-[.18em] text-[#765098] shadow-sm">Pet shop local</span>
          <span className="absolute right-4 top-4 z-10 rounded-full bg-black/35 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">{activeIndex + 1} / {storeImages.length}</span>
          <CarouselPrevious aria-label="Foto anterior" className="left-3 flex size-10 border-white/70 bg-white/85 text-[#765098] shadow-md backdrop-blur-md transition hover:scale-105 hover:bg-white focus-visible:ring-2 focus-visible:ring-[#765098] md:size-11" />
          <CarouselNext aria-label="Próxima foto" className="right-3 flex size-10 border-white/70 bg-white/85 text-[#765098] shadow-md backdrop-blur-md transition hover:scale-105 hover:bg-white focus-visible:ring-2 focus-visible:ring-[#765098] md:size-11" />
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/35 px-2.5 py-2 backdrop-blur-md" aria-label="Selecionar foto">
            {storeImages.map((image, index) => <button key={image.src} type="button" aria-label={`Ir para a foto ${index + 1}`} aria-current={activeIndex === index ? 'true' : undefined} onClick={() => api?.scrollTo(index)} className={`h-1.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${activeIndex === index ? 'w-5 bg-[#765098]' : 'w-1.5 bg-white/60'}`} />)}
          </div>
          <span className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/35 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md"><MapPin className="size-3.5" /> Mogi das Cruzes</span>
        </Carousel>
      </div>
      <div className="mt-3 hidden justify-center gap-3 md:flex">
        {storeImages.map((image, index) => (
          <button key={image.src} type="button" onClick={() => api?.scrollTo(index)} aria-label={`Ir para a foto ${index + 1}`} className={`overflow-hidden rounded-xl transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#765098] ${activeIndex === index ? 'ring-2 ring-[#765098] ring-offset-2 ring-offset-[#fffdf8]' : 'opacity-60 hover:opacity-100'}`}>
            <Image src={image.src} alt="" width={64} height={48} quality={90} sizes="64px" className="h-12 w-16 object-cover" style={{ objectPosition: image.objectPosition }} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fffdf8] pb-[calc(5rem+env(safe-area-inset-bottom))] text-[#242326]">
      <header className="sticky top-0 z-50 border-b border-[#e8e1d5] bg-[#fffdf8]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#inicio" className="flex items-center gap-2" aria-label="TootPet - início">
            <span className="flex h-10 items-center md:h-12"><Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CZiDPyZJ8Cs2eo7LaBi3JxH2O3O6Jv.png" alt="Logo da TootPet" width={132} height={48} className="h-9 w-auto object-contain md:h-10" /></span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-[#625c66] md:flex" aria-label="Navegação principal">
            <a className="transition hover:text-[#765098]" href="#sobre">Sobre a loja</a>
            <a className="transition hover:text-[#765098]" href="#servicos">O que você encontra</a>
            <a className="transition hover:text-[#765098]" href="#avaliacoes">Avaliações</a>
            <a className="transition hover:text-[#765098]" href="#contato">Contato</a>
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <a href="https://www.instagram.com/tootpet/" target="_blank" rel="noopener noreferrer" aria-label="Instagram da TootPet" className="flex size-11 items-center justify-center rounded-full bg-[#f1eafa] text-[#765098] transition hover:bg-[#e5d8f2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#765098]"><InstagramIcon /></a>
            <a href="https://www.facebook.com/tootpet.mogi" target="_blank" rel="noopener noreferrer" aria-label="Facebook da TootPet" className="flex size-11 items-center justify-center rounded-full bg-[#f1eafa] text-[#765098] transition hover:bg-[#e5d8f2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#765098]"><FacebookIcon /></a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="ml-1 flex items-center gap-2 rounded-full bg-[#765098] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(118,80,152,.2)] transition hover:-translate-y-0.5 hover:bg-[#634184]"><MessageCircle data-icon="inline-start" /> Falar no WhatsApp</a>
          </div>
          <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="flex size-11 items-center justify-center rounded-xl text-[#765098] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#765098] md:hidden" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && <nav className="flex flex-col gap-4 border-t border-[#e8e1d5] px-5 py-5 text-sm font-semibold md:hidden"><a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre a loja</a><a href="#servicos" onClick={() => setMenuOpen(false)}>O que você encontra</a><a href="#avaliacoes" onClick={() => setMenuOpen(false)}>Avaliações</a><a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#765098] px-5 py-3 text-center font-bold text-white">Falar no WhatsApp</a><div className="flex gap-2 pt-2"><a href="https://www.instagram.com/tootpet/" target="_blank" rel="noopener noreferrer" aria-label="Instagram da TootPet" className="flex size-11 items-center justify-center rounded-full bg-[#f1eafa] text-[#765098]"><InstagramIcon /></a><a href="https://www.facebook.com/tootpet.mogi" target="_blank" rel="noopener noreferrer" aria-label="Facebook da TootPet" className="flex size-11 items-center justify-center rounded-full bg-[#f1eafa] text-[#765098]"><FacebookIcon /></a></div></nav>}
      </header>

      <section id="inicio" className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-20 pt-10 sm:px-5 sm:pt-14 lg:grid-cols-[1.03fr_.97fr] lg:gap-12 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="relative z-10 flex min-w-0 flex-col items-stretch">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#eadca5] bg-[#fff7cf] px-4 py-2 text-sm font-bold text-[#735f00]"><span className="size-2 rounded-full bg-[#f5c400]" /> Seu pet merece cuidado de verdade</div>
          <h1 className="max-w-xl text-[clamp(2rem,9vw,2.5rem)] font-black leading-[1.1] tracking-[-.05em] text-[#29242c] sm:text-6xl lg:text-7xl">Tudo o que seu pet precisa, <span className="text-[#765098]">pertinho de você.</span></h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-[#6d6670] sm:mt-7 sm:text-lg sm:leading-8">Na TootPet você encontra rações, acessórios, medicamentos e atendimento próximo para cuidar de quem faz parte da família.</p>
          <div className="relative mx-auto mt-7 w-full max-w-[500px] lg:hidden"><StoreCarousel /></div>
          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row"><a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#765098] px-6 py-4 font-bold text-white shadow-[0_12px_24px_rgba(118,80,152,.22)] transition hover:-translate-y-1 hover:bg-[#634184] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#765098] sm:w-auto">Falar no WhatsApp <ArrowRight data-icon="inline-end" /></a><a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#d9d0c2] bg-white px-6 py-4 font-bold text-[#765098] transition hover:border-[#765098] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#765098] sm:w-auto"><MapPin data-icon="inline-start" /> Como chegar</a></div>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#6d6670] sm:mt-10"><span className="flex items-center gap-2"><span className="flex gap-0.5 text-[#f5b700]">{[1,2,3,4,5].map((star) => <Star key={star} className="size-4 fill-current" />)}</span><strong className="text-[#29242c]">5,0</strong> no Google</span><span className="flex items-center gap-2"><MapPin className="size-4 text-[#765098]" /> Jardim São Pedro, Mogi</span></div>
        </div>
        <div className="relative mx-auto hidden w-full max-w-[500px] lg:ml-auto lg:block">
          <div className="absolute -right-4 -top-6 size-28 rounded-full bg-[#f5c400] opacity-80 blur-2xl" /><div className="absolute -bottom-4 -left-8 size-36 rounded-full bg-[#b8e9f3] opacity-80 blur-2xl" />
          <StoreCarousel />
        </div>
      </section>

      <section id="servicos" className="bg-[#f4efe6] px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20"><div className="mx-auto max-w-6xl"><div className="max-w-xl"><p className="mb-3 text-sm font-black uppercase tracking-[.18em] text-[#765098]">Para todas as fases</p><h2 className="text-4xl font-black tracking-[-.05em] sm:text-5xl">Um cuidado completo, do jeitinho que seu pet merece.</h2></div><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{services.map(({ icon: Icon, title, text }, index) => <article key={title} className="rounded-3xl bg-[#fffdf8] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className={`mb-10 flex size-12 items-center justify-center rounded-2xl ${index % 2 === 0 ? 'bg-[#f5c400]' : 'bg-[#d9f4fa]'} text-[#765098]`}><Icon /></div><h3 className="text-xl font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-[#756e77]">{text}</p></article>)}</div></div></section>

      <section id="sobre" className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-5 sm:py-16 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28"><div className="relative min-h-[370px] overflow-hidden rounded-[2.5rem] bg-[#765098] p-8 text-white sm:p-12"><div className="absolute -right-20 -top-20 size-64 rounded-full border-[35px] border-[#f5c400]" /><div className="absolute -bottom-20 -left-16 size-56 rounded-full bg-[#d9f4fa] opacity-30" /><div className="relative flex h-full flex-col justify-between"><div><span className="text-7xl font-black text-[#f5c400]">“</span><p className="max-w-sm text-3xl font-black leading-tight">Cuidar de pet é cuidar da família.</p></div><div className="flex items-center gap-3 text-sm font-semibold text-white/80"><span className="size-3 rounded-full bg-[#f5c400]" /> Uma loja de bairro feita para você</div></div></div><div><p className="mb-3 text-sm font-black uppercase tracking-[.18em] text-[#765098]">Conheça a TootPet</p><h2 className="text-4xl font-black tracking-[-.05em] sm:text-5xl">A loja de confiança do seu bairro.</h2><p className="mt-6 text-lg leading-8 text-[#6d6670]">Somos orgulhosos de fazer parte de Jardim São Pedro, em Mogi das Cruzes. Na TootPet, você encontra produtos para o dia a dia e um atendimento próximo, com aquele cuidado especial com os vizinhos.</p><div className="mt-8 grid gap-4 sm:grid-cols-2"><div className="flex gap-3"><ShieldCheck className="mt-1 shrink-0 text-[#765098]" /><div><strong className="block">Acessível</strong><span className="text-sm text-[#756e77]">Entrada e banheiro acessíveis.</span></div></div><div className="flex gap-3"><Truck className="mt-1 shrink-0 text-[#765098]" /><div><strong className="block">Prático</strong><span className="text-sm text-[#756e77]">Compras na loja e entrega.</span></div></div></div></div></section>

      <section id="avaliacoes" className="bg-[#d9f4fa] px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20"><div className="mx-auto max-w-6xl"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="mb-3 text-sm font-black uppercase tracking-[.18em] text-[#765098]">Quem já conhece</p><h2 className="text-4xl font-black tracking-[-.05em] sm:text-5xl">Palavra de quem confia.</h2></div><div className="flex items-center gap-3"><span className="text-5xl font-black">5,0</span><div><div className="flex gap-0.5 text-[#f5b700]">{[1,2,3,4,5].map((star) => <Star key={star} className="size-4 fill-current" />)}</div><span className="text-sm text-[#625c66]">22 avaliações</span></div></div></div><div className="mt-12 grid gap-5 md:grid-cols-2">{reviews.map((review) => <blockquote key={review.initial} className="rounded-3xl bg-[#fffdf8] p-7"><div className="flex items-start gap-4"><span className={`flex size-12 shrink-0 items-center justify-center rounded-full ${review.color} text-xl font-black text-white`}>{review.initial}</span><div><div className="mb-3 flex gap-0.5 text-[#f5b700]">{[1,2,3,4,5].map((star) => <Star key={star} className="size-4 fill-current" />)}</div><p className="text-lg font-semibold leading-7">“{review.text}”</p></div></div></blockquote>)}</div></div></section>

      <section id="contato" className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-5 sm:py-16 lg:grid-cols-[.9fr_1.1fr] lg:px-8 lg:py-28"><div><p className="mb-3 text-sm font-black uppercase tracking-[.18em] text-[#765098]">Visite a loja</p><h2 className="text-4xl font-black tracking-[-.05em] sm:text-5xl">Passa aqui para conhecer.</h2><p className="mt-5 leading-7 text-[#6d6670]">Estamos em Jardim São Pedro, Mogi das Cruzes. Fale com a gente pelo WhatsApp ou venha nos visitar.</p><div className="mt-8 flex flex-col gap-5 text-sm"><a href={mapsUrl} target="_blank" rel="noreferrer" className="flex gap-3"><MapPin className="shrink-0 text-[#765098]" /><span><strong className="block">Endereço</strong>Av. João XXIII, 3247 - Jardim São Pedro, Mogi das Cruzes - SP, 08830-000</span></a><a href="tel:+5511997092246" className="flex gap-3"><Phone className="shrink-0 text-[#765098]" /><span><strong className="block">Telefone</strong>(11) 99709-2246</span></a><div className="flex gap-3"><Clock3 className="shrink-0 text-[#765098]" /><span><strong className="block">Horários</strong>Seg. a sex.: 9h às 19h30<br />Sáb.: 9h às 17h · Feriados: 9h às 13h</span></div></div></div><div className="flex min-h-[340px] flex-col justify-between rounded-[2.5rem] bg-[#f5c400] p-6 sm:p-10"><div className="flex items-start justify-between"><span className="rounded-full bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[.15em] text-[#765098]">Estamos por aqui</span><MapPin className="text-[#765098]" /></div><div><p className="max-w-md text-3xl font-black leading-tight text-[#29242c]">Dúvidas sobre produtos ou entrega?</p><a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#765098] px-6 py-4 font-bold text-white transition hover:bg-[#634184]">Chamar no WhatsApp <ArrowRight data-icon="inline-end" /></a></div></div></section>

      <footer className="bg-[#29242c] px-4 py-12 pb-[calc(7rem+env(safe-area-inset-bottom))] text-white sm:px-5 lg:px-8"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 md:flex-row md:items-end"><div><div className="flex w-fit items-center"><Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CZiDPyZJ8Cs2eo7LaBi3JxH2O3O6Jv.png" alt="Logo da TootPet" width={132} height={48} className="h-10 w-auto object-contain" /></div><p className="mt-4 max-w-xs text-sm leading-6 text-white/60">Rações, acessórios, medicamentos e tudo o que seu pet precisa.</p></div><div className="flex flex-wrap items-center gap-4 text-sm text-white/70"><a className="transition hover:text-white" href={whatsappUrl}>WhatsApp</a><a className="flex min-h-11 items-center gap-2 transition hover:text-white" href="https://www.instagram.com/tootpet/" target="_blank" rel="noopener noreferrer" aria-label="Instagram da TootPet"><InstagramIcon /> Instagram</a><a className="flex min-h-11 items-center gap-2 transition hover:text-white" href="https://www.facebook.com/tootpet.mogi" target="_blank" rel="noopener noreferrer" aria-label="Facebook da TootPet"><FacebookIcon /> Facebook</a><a className="transition hover:text-white" href={mapsUrl}>Como chegar</a></div></div><div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 border-t border-white/10 pt-5 text-xs text-white/40 sm:flex-row sm:justify-between"><span>Av. João XXIII, 3247 - Jardim São Pedro, Mogi das Cruzes - SP, 08830-000</span><span>Feito com carinho para quem ama pets.</span></div></footer>
      <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Falar com a TootPet pelo WhatsApp" className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 flex size-14 items-center justify-center rounded-full bg-[#765098] text-white shadow-[0_8px_24px_rgba(118,80,152,.35)] transition hover:scale-105"><MessageCircle /></a>
    </main>
  )
}
