export const BorderComponent = () => {
  return(
    <>
      <div className={`${corner} top-0 left-0 border-l-2 border-t-2`}></div>
      <div className={`${corner} top-0 right-0 border-r-2 border-t-2`}></div>
      <div className={`${corner} bottom-0 left-0 border-l-2 border-b-2`}></div>
      <div className={`${corner} bottom-0 right-0 border-r-2 border-b-2`}></div>
    </>
  )
}

const corner = "absolute w-16 h-16 border-cyan-400/50";