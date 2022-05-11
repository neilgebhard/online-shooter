type Props = {
  seconds: number
  milliseconds: number
}

const Timer = ({ seconds, milliseconds }: Props) => {
  return (
    <>
      Timer: {seconds}.{milliseconds / 100}
    </>
  )
}

export default Timer
