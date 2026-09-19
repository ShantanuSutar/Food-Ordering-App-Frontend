import { useSelector } from 'react-redux'
import AddressCard from '../Cart/AddressCard'
import { addressKey } from '../util/address'

const EMPTY_ADDRESSES = []

const Address = () => {
  const addresses = useSelector((store) => store.auth.user?.addresses ?? EMPTY_ADDRESSES)

  return (
    <section className='space-y-6'>
      <header>
        <p className='text-sm font-medium uppercase tracking-[0.18em] text-pink-400'>My profile</p>
        <h1 className='!m-0 !mt-2 !text-2xl !font-semibold sm:!text-3xl'>Saved addresses</h1>
      </header>
      {addresses.length === 0 ? (
        <div className='rounded-2xl border border-dashed border-white/20 p-8 text-center text-gray-400'>
          You have no saved delivery addresses yet.
        </div>
      ) : (
        <div className='grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
          {addresses.map((address) => (
            <AddressCard key={address.id ?? addressKey(address)} item={address} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Address
