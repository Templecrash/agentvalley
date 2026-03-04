/**
 * Stardew Valley-style pixel art agent avatars.
 * Each character has unique hair, skin, outfit, and accessories.
 */

const P = ({ x, y, fill }) => <rect x={x} y={y} width="1" height="1" fill={fill} />

function PixelGrid({ pixels, size = 48 }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} style={{ imageRendering: 'pixelated' }}>
      {pixels.map((p, i) => (
        <P key={i} x={p[0]} y={p[1]} fill={p[2]} />
      ))}
    </svg>
  )
}

const SKIN = { light: '#FFDCB5', medium: '#E8B88A', tan: '#C68E5B', dark: '#8D5E3C', pale: '#FFF0E0' }
const HAIR = { brown: '#5C3A1E', black: '#2A1A0A', red: '#B84A20', blonde: '#E8C84A', blue: '#4A7BF7', purple: '#9B59B6', pink: '#E74C8C', teal: '#1ABC9C', white: '#E8E8E8', green: '#2ECC71' }
const OUTFIT = { blue: '#4A7BF7', red: '#E74C3C', green: '#2ECC71', purple: '#9B59B6', orange: '#F39C12', teal: '#1ABC9C', pink: '#E74C8C', navy: '#2C3E7B', yellow: '#F1C40F', gray: '#7F8C8D' }

// Character definitions: [hair, skin, outfit, accessory color, variant]
const characters = {
  'athena-9': { hair: HAIR.purple, skin: SKIN.pale, outfit: OUTFIT.purple, acc: '#FFD700', type: 'designer' },
  'forge-x1': { hair: HAIR.blue, skin: SKIN.medium, outfit: OUTFIT.navy, acc: '#4AF', type: 'engineer' },
  'sage-ai': { hair: HAIR.green, skin: SKIN.tan, outfit: OUTFIT.teal, acc: '#FFF', type: 'analyst' },
  'agent-7x': { hair: HAIR.red, skin: SKIN.light, outfit: OUTFIT.blue, acc: '#FFD700', type: 'designer' },
  'nova-ai': { hair: HAIR.black, skin: SKIN.dark, outfit: OUTFIT.purple, acc: '#4AF', type: 'engineer' },
  'pixel-3': { hair: HAIR.pink, skin: SKIN.pale, outfit: OUTFIT.green, acc: '#F39C12', type: 'marketer' },
  'bolt-v2': { hair: HAIR.blonde, skin: SKIN.light, outfit: OUTFIT.orange, acc: '#FFF', type: 'engineer' },
  'iris-ml': { hair: HAIR.teal, skin: SKIN.medium, outfit: OUTFIT.pink, acc: '#FFD700', type: 'analyst' },
  'zero-x': { hair: HAIR.white, skin: SKIN.tan, outfit: OUTFIT.gray, acc: '#E74C3C', type: 'engineer' },
  'muse-4': { hair: HAIR.brown, skin: SKIN.dark, outfit: OUTFIT.red, acc: '#2ECC71', type: 'designer' },
  'data-9k': { hair: HAIR.blue, skin: SKIN.pale, outfit: OUTFIT.teal, acc: '#F39C12', type: 'analyst' },
  'arc-7': { hair: HAIR.black, skin: SKIN.light, outfit: OUTFIT.yellow, acc: '#9B59B6', type: 'marketer' },
}

function buildPixels(c) {
  const h = c.hair, s = c.skin, o = c.outfit, a = c.acc
  const outline = '#2A1A0A'
  const eye = '#2A1A0A'
  const eyeWhite = '#FFFFFF'
  const mouth = '#C0392B'
  const shadow = shadeColor(o, -30)

  const pixels = [
    // Hair top row
    [5,0,h],[6,0,h],[7,0,h],[8,0,h],[9,0,h],[10,0,h],
    // Hair second row
    [4,1,h],[5,1,h],[6,1,h],[7,1,h],[8,1,h],[9,1,h],[10,1,h],[11,1,h],
    // Hair + forehead
    [3,2,h],[4,2,h],[5,2,h],[6,2,s],[7,2,s],[8,2,s],[9,2,s],[10,2,h],[11,2,h],
    // Hair sides + face
    [3,3,h],[4,3,h],[5,3,s],[6,3,s],[7,3,s],[8,3,s],[9,3,s],[10,3,s],[11,3,h],
    // Face row (eyes)
    [3,4,h],[4,4,s],[5,4,eyeWhite],[6,4,eye],[7,4,s],[8,4,s],[9,4,eyeWhite],[10,4,eye],[11,4,s],
    // Face row (nose/cheeks)
    [4,5,s],[5,5,s],[6,5,s],[7,5,'#FFB5B5'],[8,5,s],[9,5,s],[10,5,s],[11,5,s],
    // Face row (mouth)
    [4,6,s],[5,6,s],[6,6,s],[7,6,mouth],[8,6,mouth],[9,6,s],[10,6,s],[11,6,s],
    // Chin
    [5,7,s],[6,7,s],[7,7,s],[8,7,s],[9,7,s],[10,7,s],
    // Neck + shoulders
    [6,8,s],[7,8,s],[8,8,s],[9,8,s],
    // Outfit top
    [4,9,o],[5,9,o],[6,9,o],[7,9,o],[8,9,o],[9,9,o],[10,9,o],[11,9,o],
    // Outfit body
    [3,10,o],[4,10,o],[5,10,o],[6,10,o],[7,10,a],[8,10,a],[9,10,o],[10,10,o],[11,10,o],[12,10,o],
    [3,11,o],[4,11,shadow],[5,11,o],[6,11,o],[7,11,o],[8,11,o],[9,11,o],[10,11,o],[11,11,shadow],[12,11,o],
    // Arms + body
    [2,12,s],[3,12,o],[4,12,o],[5,12,o],[6,12,o],[7,12,o],[8,12,o],[9,12,o],[10,12,o],[11,12,o],[12,12,o],[13,12,s],
    [2,13,s],[3,13,o],[4,13,o],[5,13,shadow],[6,13,o],[7,13,o],[8,13,o],[9,13,o],[10,13,shadow],[11,13,o],[12,13,o],[13,13,s],
    // Legs
    [5,14,shadow],[6,14,o],[7,14,o],[8,14,o],[9,14,o],[10,14,shadow],
    [5,15,'#4A3728'],[6,15,'#4A3728'],[7,15,outline],[8,15,outline],[9,15,'#4A3728'],[10,15,'#4A3728'],
  ]

  // Add accessory based on type
  if (c.type === 'designer') {
    pixels.push([12,2,a],[12,3,a],[13,3,a]) // beret
  } else if (c.type === 'engineer') {
    pixels.push([4,1,a],[11,1,a]) // headphones
    pixels.push([3,2,a],[12,2,a])
  } else if (c.type === 'analyst') {
    pixels.push([5,4,'#88CCFF'],[6,4,'#88CCFF'],[9,4,'#88CCFF'],[10,4,'#88CCFF']) // glasses
    pixels.push([7,4,'#88CCFF'],[8,4,'#88CCFF'])
  } else if (c.type === 'marketer') {
    pixels.push([5,0,a],[6,0,a],[7,0,a],[8,0,a],[9,0,a],[10,0,a]) // hat
    pixels.push([4,0,a],[11,0,a])
  }

  return pixels
}

function shadeColor(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.max(0, Math.min(255, (num >> 16) + percent))
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + percent))
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + percent))
  return `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

export default function AgentAvatar({ name, size = 48 }) {
  const key = name?.toLowerCase().replace(/\s+/g, '-') || 'agent-7x'
  const charDef = characters[key] || characters['agent-7x']
  const pixels = buildPixels(charDef)

  return (
    <div className="rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center" style={{ width: size, height: size }}>
      <PixelGrid pixels={pixels} size={size} />
    </div>
  )
}

export { characters }
