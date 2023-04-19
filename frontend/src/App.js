import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loader as eventsLoader } from "./pages/EventsPage";

import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import EventsRootLayout from "./pages/EventsRoot";
import ErrorPage from "./pages/Error";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, {
  action as newsletterAction,
} from "./pages/NewsletterPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "events",
          element: <EventsRootLayout />,
          children: [
            {
              index: true,
              element: <EventsPage />,
              loader: eventsLoader,
            },
            {
              path: ":eventId",
              id: "event-detail",
              loader: eventDetailLoader,
              children: [
                {
                  index: true,
                  element: <EventDetailPage />,
                  action: deleteEventAction,
                },
                {
                  path: "edit",
                  element: <EditEventPage />,
                  action: manipulateEventAction,
                },
              ],
            },
            {
              path: "new",
              element: <NewEventPage />,
              action: manipulateEventAction,
            },
          ],
        },
        {
          path: "newsletter",
          element: <NewsletterPage />,
          action: newsletterAction,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
