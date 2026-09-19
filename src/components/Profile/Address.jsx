import { useSelector } from 'react-redux'
import AddressCard from '../Cart/AddressCard'
import { addressKey } from '../util/address'

const Address = () => {
  const addresses = useSelector((store) => store.auth.user?.addresses || [])

  return (
    <section className='px-4 py-8 sm:px-8'>
      <h1 className='mb-6 text-2xl font-semibold'>Saved addresses</h1>
      {addresses.length === 0 ? (
        <div className='rounded-2xl border border-dashed border-white/20 p-8 text-center text-gray-400'>
          You have no saved delivery addresses yet.
        </div>
      ) : (
        <div className='flex flex-wrap gap-5'>
          {addresses.map((address) => (
            <AddressCard key={address.id ?? addressKey(address)} item={address} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Address
