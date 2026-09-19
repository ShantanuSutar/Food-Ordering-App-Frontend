import EventCard from './EventCard'

const Events = () => {
  return (
    <section className='space-y-6'>
      <header>
        <p className='text-sm font-medium uppercase tracking-[0.18em] text-pink-400'>My profile</p>
        <h1 className='!m-0 !mt-2 !text-2xl !font-semibold sm:!text-3xl'>Events</h1>
      </header>

      <div className='grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
        {[1, 2, 3].map((item) => <EventCard key={item} />)}
      </div>
    </section>
  )
}

export default Events
