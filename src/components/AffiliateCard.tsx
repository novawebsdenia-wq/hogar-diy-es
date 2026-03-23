import Image from 'next/image'
import { AMAZON_TAG } from '@/lib/constants'

interface Props {
  name: string
  image?: string
  price?: string
  link: string
  description?: string
  badge?: string
}

export function AffiliateCard({ name, image, price, link, description, badge }: Props) {
  // Ensure Amazon tag is appended
  const url = link.includes('amazon.es') && !link.includes('tag=')
    ? `${link}${link.includes('?') ? '&' : '?'}tag=${AMAZON_TAG}`
    : link

  return (
    <div className="not-prose my-6 flex flex-col gap-4 overflow-hidden rounded-2xl border border-amber-100 bg-amber-50 p-5 sm:flex-row sm:items-center">
      {image && (
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-white">
          <Image src={image} alt={name} fill className="object-contain p-2" sizes="96px" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1">
        {badge && (
          <span className="w-fit rounded-full bg-amber-200 px-2 py-0.5 text-xs font-semibold text-amber-800">
            {badge}
          </span>
        )}
        <p className="font-bold text-gray-900">{name}</p>
        {description && <p className="text-sm text-gray-600">{description}</p>}
        {price && <p className="text-lg font-bold text-green-700">{price}</p>}
      </div>
      <a
        href={url}
        target="_blank"
        rel="nofollow noopener noreferrer sponsored"
        className="shrink-0 rounded-xl bg-amber-500 px-5 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-amber-600"
      >
        Ver en Amazon →
      </a>
      <p className="hidden text-[10px] text-gray-400 sm:block">
        *Enlace de afiliado
      </p>
    </div>
  )
}
