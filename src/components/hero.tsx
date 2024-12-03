import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
    return (
        <div className="relative overflow-hidden">
            <div className="relative mx-auto mt-11 max-w-7xl pb-6 pt-8 sm:pb-12 sm:pt-16 md:pb-20 md:pt-20 lg:pb-24 lg:pt-40 xl:pb-32 xl:pt-40">
                <Image
                    src="/images/jezael-melgoza-lBxfCWszr8o-unsplash.webp"
                    alt="Hero background"
                    quality={80}
                    fill
                    placeholder="blur" // Add blur placeholder
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0XFyAeIRMeIR0dITcdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=" // Add a tiny blurred version of your image
                    sizes="100vw"
                    priority
                    style={{
                        objectFit: 'cover',
                    }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                <div className="relative lg:w-full lg:max-w-2xl">
                    <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 lg:px-8 lg:pl-24">
                        <div className="relative z-10 lg:text-left">
                            <h1 className="font-title text-4xl font-semibold tracking-wide text-white shadow-lg lg:max-w-72 lg:text-6xl">
                                Sustainable Techwear
                            </h1>
                            <p className="mt-3 max-w-sm text-base text-white shadow-lg sm:mt-5 sm:max-w-lg sm:text-lg md:max-w-lg md:text-xl lg:mx-0">
                                With the journey to find alternatives, we've
                                decided to create our own.
                            </p>
                            <div className="sm:justify-justify-start mt-5 sm:mt-8 sm:flex">
                                <div className="rounded-md shadow">
                                    <Link
                                        href="/category/Men"
                                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 font-title text-base text-black hover:bg-slate-200 md:px-10 md:py-4 md:text-lg"
                                    >
                                        Start Exploring
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
