import Spinner from './spinner.component'
export default function CustomButton({ children, loading, ...otherProps }) {
  return (
    <button
      {...otherProps}
      disabled={loading}
      className="text-white lg:font-bold w-[130px] lg:w-[170px] text-sm md:text-base p-2 rounded-lg"
      style={{
        background: 'linear-gradient(116deg, #5a5a5e 0.00%, #02020d 100.00%)',
        boxShadow: '0px 7px 15px rgba(33, 100, 244,0.3)',
      }}
    >
      {loading ? (
        <div className="flex items-center justify-evenly">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </button>
  )
}
