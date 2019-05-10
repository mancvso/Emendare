import React from 'react'
// Components
import {
  EventsList,
  Page,
  I18nContext,
  UserContext,
  DataContext,
  EventsContext,
  ApiContext
} from '../../../components'
// Helpers
import {
  getListTargets,
  filterEventsByUserTextFollowed
} from '../../../helpers'

export const HomePage = () => {
  const { translate } = React.useContext(I18nContext)
  const { user } = React.useContext(UserContext)
  const { get } = React.useContext(DataContext)
  const { events, hasNextPage, newEvents } = React.useContext(EventsContext)
  const { Socket } = React.useContext(ApiContext)

  const eventsTargets = getListTargets(events, get)
  const filteredEvents = user
    ? filterEventsByUserTextFollowed(eventsTargets, user)
    : eventsTargets

  React.useEffect(() => {
    if (hasNextPage) {
      Socket.emit('events')
    }
  }, [])

  return (
    <Page title={translate('HOME')} style={{ padding: 0 }}>
      <EventsList
        events={filteredEvents}
        newEvents={newEvents}
        hasNextPage={hasNextPage}
      />
    </Page>
  )
}
