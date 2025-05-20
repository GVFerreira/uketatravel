import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export default function Testemonial() {
  const testemonials = [
    {
      name: "Sarah Johnson",
      location: "United States",
      quote:
        "The process was incredibly smooth. I received my UK ETA within 24 hours and had no issues during my trip to London. Highly recommend!",
      rating: 5,
    },
    {
      name: "Takashi Yamamoto",
      location: "Japan",
      quote:
        "As a frequent business traveler to the UK, this service has saved me so much time. The support team was very helpful when I had questions.",
      rating: 5,
    },
    {
      name: "Maria Garcia",
      location: "Spain",
      quote:
        "I was worried about making mistakes on my application, but the review service caught an error I would have missed. Worth every penny!",
      rating: 4,
    },
    {
      name: "Maria Garcia",
      location: "Spain",
      quote:
        "I was worried about making mistakes on my application, but the review service caught an error I would have missed. Worth every penny!",
      rating: 4,
    },
  ]

  return (
    <Carousel 
      opts={{
        loop: true
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent className="-ml-8">
        { testemonials.map((testimonial, index) => (
          <CarouselItem key={index} className="basis-2/3 lg:basis-1/3 pl-8 my-6">
            <Card className="border-none shadow-xl">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-500 font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    
  )
}