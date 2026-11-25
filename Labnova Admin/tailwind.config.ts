import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Near-black "ink" (rail, primary buttons, text), one lime highlight, sage + soft green-grey surfaces.
        ink: { DEFAULT: '#0F1210', 800: '#171B18', 700: '#232824', 600: '#363D37', 400: '#8D978D', 300: '#B7C0B6' },
        sage: '#A9B6A7', // page background around the panel
        panel: '#EEF0EB', // the big rounded panel
        surface: { DEFAULT: '#E4E8E0', strong: '#D9DED4' }, // cards on the panel
        canvas: '#DDE2D8', // table header bands, hover rows, empty tracks
        line: { DEFAULT: '#D1D7CC', strong: '#B8C0B3' },
        muted: '#4E584E',
        faint: '#5F695F',
        lime: { DEFAULT: '#E5F66B', dark: '#D3E64A', soft: '#F0F9B8' },
        // Kept under the old name so every existing "brand" class follows the new palette: black actions, lime highlights.
        brand: { DEFAULT: '#0F1210', dark: '#000000', light: '#F0F9B8', ring: 'rgba(15,18,16,0.28)' },
        // Status colours stay separate from the lime accent so a status is never confused with a highlight.
        ok: { DEFAULT: '#0B6B4E', soft: '#DDF1E8', line: '#B4DCCB' },
        warn: { DEFAULT: '#7C5200', soft: '#FBEFCB', line: '#EBD38E' },
        bad: { DEFAULT: '#B42318', soft: '#FBE3E0', line: '#F0BDB7' },
        teal: { DEFAULT: '#0B6B73', soft: '#D9EEEF', line: '#AFD8DB' },
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      // One deliberate scale: 12 / 13 / 14 (body) / 16 / 18 / 24 / 30, plus two display sizes for headlines and big numbers.
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.125rem', letterSpacing: '0.005em' }],
        sm: ['0.8125rem', { lineHeight: '1.25rem', letterSpacing: '0' }],
        base: ['0.875rem', { lineHeight: '1.4rem', letterSpacing: '-0.003em' }],
        lg: ['1rem', { lineHeight: '1.5rem', letterSpacing: '-0.008em' }],
        xl: ['1.125rem', { lineHeight: '1.6rem', letterSpacing: '-0.012em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.022em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.028em' }],
        display: ['2.75rem', { lineHeight: '1.06', letterSpacing: '-0.035em' }],
        stat: ['3.25rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },
      borderRadius: { card: '28px', ctl: '16px', shell: '32px' },
      boxShadow: {
        card: 'none',
        pop: '0 18px 40px -12px rgba(15,18,16,0.35), 0 2px 8px rgba(15,18,16,0.08)',
        focus: '0 0 0 2px #EEF0EB, 0 0 0 4px #0F1210',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'pop-in': { from: { opacity: '0', transform: 'translateY(8px) scale(0.98)' }, to: { opacity: '1', transform: 'none' } },
        'drawer-in': { from: { transform: 'translateX(-100%)' }, to: { transform: 'none' } },
        'drawer-in-right': { from: { transform: 'translateX(100%)' }, to: { transform: 'none' } },
        'toast-in': { from: { opacity: '0', transform: 'translateY(10px)' }, to: { opacity: '1', transform: 'none' } },
        'bar-grow': { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
        'capsule-rise': { from: { transform: 'scaleY(0.2)', opacity: '0' }, to: { transform: 'none', opacity: '1' } },
        'page-in': { from: { opacity: '0', transform: 'translateY(6px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: {
        'fade-in': 'fade-in 160ms ease-out both',
        'pop-in': 'pop-in 200ms cubic-bezier(0.2,0.8,0.2,1) both',
        'drawer-in': 'drawer-in 220ms cubic-bezier(0.2,0.8,0.2,1) both',
        'drawer-in-right': 'drawer-in-right 240ms cubic-bezier(0.2,0.8,0.2,1) both',
        'toast-in': 'toast-in 220ms cubic-bezier(0.2,0.8,0.2,1) both',
        'bar-grow': 'bar-grow 700ms cubic-bezier(0.2,0.8,0.2,1) both',
        'capsule-rise': 'capsule-rise 520ms cubic-bezier(0.2,0.8,0.2,1) both',
        // "backwards" (not "both") so nothing is left applied afterwards — fixed-position dialogs inside a page stay unaffected.
        'page-in': 'page-in 220ms cubic-bezier(0.2,0.8,0.2,1) backwards',
      },
    },
  },
  plugins: [],
};

export default config;
