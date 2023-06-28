export default function Button({ children, classStyle, callback }) {
  return (
    <button className={classStyle} onClick={callback}>
      {children}
    </button>
  );
}
