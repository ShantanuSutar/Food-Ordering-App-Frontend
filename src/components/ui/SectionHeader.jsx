const SectionHeader = ({ eyebrow = 'DineHub', title, description, action }) => (
  <header className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
    <div className='min-w-0'>
      <p className='eyebrow'>{eyebrow}</p>
      <h1 className='!mb-0 !mt-2 !text-2xl !font-bold sm:!text-3xl'>{title}</h1>
      {description && <p className='mt-2 max-w-2xl text-sm leading-6 text-slate-400'>{description}</p>}
    </div>
    {action && <div className='shrink-0'>{action}</div>}
  </header>
)

export default SectionHeader
