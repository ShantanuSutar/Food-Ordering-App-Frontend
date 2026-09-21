import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'Top meals', href: '/#top-meals' },
  { label: 'Restaurants', href: '/#restaurants' },
  { label: 'Search food', to: '/search' },
]

export const Footer = () => {
  const signedIn = Boolean(localStorage.getItem('jwt'))

  return (
    <footer className='mt-auto border-t border-slate-400/15 bg-slate-950/35'>
      <div className='page-shell grid gap-8 py-10 sm:grid-cols-[1fr_auto] sm:items-end'>
        <div className='max-w-md'>
          <Link to='/' className='inline-flex items-center gap-3 rounded-lg focus-visible:outline-none'>
            <span className='flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 font-black text-slate-950'>D</span>
            <span className='text-xl font-extrabold text-slate-50'>Dine<span className='text-orange-500'>Hub</span></span>
          </Link>
          <p className='mt-4 text-sm leading-6 text-slate-400'>Good local food, straightforward ordering, and secure checkout.</p>
        </div>

        <nav aria-label='Footer navigation' className='flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium text-slate-400 sm:justify-end'>
          {footerLinks.map((link) => link.to ? (
            <Link key={link.label} to={link.to} className='transition-colors hover:text-orange-400'>{link.label}</Link>
          ) : (
            <a key={link.label} href={link.href} className='transition-colors hover:text-orange-400'>{link.label}</a>
          ))}
          <Link to={signedIn ? '/my-profile' : '/account/login'} className='transition-colors hover:text-orange-400'>
            {signedIn ? 'My account' : 'Sign in'}
          </Link>
        </nav>
      </div>
      <div className='border-t border-slate-400/10'>
        <div className='page-shell py-4 text-xs text-slate-500'>© {new Date().getFullYear()} DineHub. Built for local food ordering.</div>
      </div>
    </footer>
  )
}
