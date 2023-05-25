export default function CustomContainer({ children, otherStyles }) {
  return <div className={`${otherStyles}`}>{children}</div>
}
