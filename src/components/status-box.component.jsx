export default function StatusBox({ status }) {
  return (
    <div>
      <span
        className={` ${
          status === 'paid'
            ? 'bg-green-100 text-green-500'
            : 'bg-red-100 text-red-500'
        } font-bold px-2 py-1 uppercase`}
      >
        {status}
      </span>
    </div>
  )
}
