import Image from 'next/image'

const GPTLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm bg-black/30">
      <Image
        src="/icons/loading-circle.svg"
        alt="Loading..."
        width={50}
        height={50}
        className="animate-spin"
      />
    </div>
  )
}

export default GPTLoader
