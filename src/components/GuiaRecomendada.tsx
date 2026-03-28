import Link from "next/link";

interface Props {
  href: string;
  titulo: string;
}

export function GuiaRecomendada({ href, titulo }: Props) {
  return (
    <Link
      href={href}
      className="group my-6 flex items-start gap-3 rounded-xl border border-[#0f3d26]/20 bg-[#f0f9f4] px-4 py-3 no-underline transition-colors hover:border-[#0f3d26]/40 hover:bg-[#e4f4ea]"
    >
      <span className="mt-0.5 text-base">🔧</span>
      <div className="flex-1 min-w-0">
        <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-[#0f3d26]">
          Guía recomendada
        </p>
        <p className="line-clamp-2 text-sm font-semibold text-gray-800 group-hover:text-[#0f3d26]">
          {titulo}
        </p>
      </div>
      <span className="mt-1 shrink-0 text-sm text-[#0f3d26] opacity-60 group-hover:opacity-100">
        →
      </span>
    </Link>
  );
}
