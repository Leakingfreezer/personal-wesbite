import type { CSSProperties } from 'react'
import type { Box, HeroLayer, HeroVisual } from '../../data/hero'

interface HeroObjectProps {
  visual: HeroVisual
  /** Controls the rendered width; height follows the aspect ratio. */
  className?: string
}

const boxStyle = (box: Box): CSSProperties => ({
  left: `${box.left}%`,
  top: `${box.top}%`,
  width: `${box.width}%`,
  height: `${box.height}%`,
})

/**
 * The hero's focal object: a base image with optional sticker layers on top.
 * It only knows how to draw a HeroVisual — what to draw lives in src/data/hero.ts.
 * To use a video or 3D model later, make a sibling component and swap it in Hero.tsx.
 */
export default function HeroObject({ visual, className = '' }: HeroObjectProps) {
  const { base, knob, layers } = visual

  return (
    <div role="img" aria-label={base.alt} className={`relative ${className}`} style={{ aspectRatio: base.aspectRatio }}>
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={base.src}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 size-full max-w-none"
          style={base.crop ? boxStyle(base.crop) : undefined}
        />
      </div>

      {knob && (
        // Colours sampled from the Figma knob — part of the artwork, not theme tokens.
        <span
          aria-hidden
          className="absolute aspect-square rounded-full bg-linear-to-b from-white to-[#e3e1d8] shadow-[inset_0_-2px_3px_#dddad1,inset_0_2px_3px_white]"
          style={{ left: `${knob.left}%`, top: `${knob.top}%`, width: `${knob.width}%` }}
        />
      )}

      {layers.map((layer) => (
        <StickerLayer key={layer.src} layer={layer} />
      ))}
    </div>
  )
}

function StickerLayer({ layer }: { layer: HeroLayer }) {
  return (
    <div
      aria-hidden
      className={`absolute ${layer.shadow ? 'drop-shadow-sticker' : ''}`}
      style={{ ...boxStyle(layer.box), rotate: layer.rotate ? `${layer.rotate}deg` : undefined }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={layer.src}
          alt=""
          className={`absolute max-w-none ${layer.crop ? '' : 'inset-0 size-full object-cover'}`}
          style={layer.crop ? boxStyle(layer.crop) : undefined}
        />
      </div>
    </div>
  )
}
