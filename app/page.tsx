import ExploreBtn from "@/components/ExploreBtn"
import EventCard from "@/components/EventCard"
import { events } from "@/lib/constants"

const page = () => {
  return (
    <section>
      <h1 className="text-center">Welcome to nextjs 16</h1>
      <ExploreBtn />
      <div className="mt-20" id='events'>
        <h3>Main Events</h3>
        <ul className="events">
          { events.map((item) => (
              <li key={item.title}>
                <EventCard {...item} />
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}

export default page