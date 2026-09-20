const EmptyState = ({ icon, title, description, action, className = '' }) => (
  <div className={`empty-state flex flex-col items-center px-6 py-10 text-center ${className}`}>
    {icon && <span className='mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10 text-orange-400'>{icon}</span>}
    <h2 className='!mb-2 !text-lg !font-bold'>{title}</h2>
    {description && <p className='max-w-md text-sm leading-6 text-slate-400'>{description}</p>}
    {action && <div className='mt-5'>{action}</div>}
  </div>
)

export default EmptyState
