import { Injectable } from '@angular/core';
import {MbscCalendarEvent} from "@mobiscroll/angular";

export interface EventModel {
  id: number;
  title: string;
  start: string;
  end: string;
  description?: string;
  allDay?: boolean;
  free?: boolean;
  color?: string;
}

const LOCALSTORAGE_EVENTS = 'barber-app:events';

@Injectable({providedIn: "root"})
export class EventService {

  constructor() { }

  getEvents(): EventModel[] {
    if (localStorage.getItem(LOCALSTORAGE_EVENTS)) {
      return JSON.parse(localStorage.getItem(LOCALSTORAGE_EVENTS) as string);
    }
    return [];
  }

  getEventById(id: number): EventModel | undefined {
    const events: EventModel[] = this.getEvents();
    return events.find(event => event.id === id);
  }

  addEvent(event: Omit<EventModel, 'id'>): EventModel[] {
    const events: EventModel[] = this.getEvents();
    let id: number;
    if (events.length) {
      const lastEvent: EventModel = events.pop() as EventModel;
      id = lastEvent.id + 1;
      events.push(lastEvent);
    } else {
      id = 1;
    }
    events.push({ ...event, id });
    localStorage.setItem(LOCALSTORAGE_EVENTS, JSON.stringify(events));
    return events;
  }


  saveEvent(event: Omit<EventModel, 'id'>): EventModel[] {
    const events: EventModel[] = this.getEvents();
    let id: number;
    if (events.length) {
      const lastEvent: EventModel = events.pop() as EventModel;
      id = lastEvent.id + 1 ;
      events.push(lastEvent)
    } else {
      id = 1;
    }
    events.splice(-1, 1);
    events.push({ ...event, id });
    localStorage.setItem(LOCALSTORAGE_EVENTS, JSON.stringify(events));
    return events;
  }

  deleteEvent(event: MbscCalendarEvent) {

    // const events: EventModel[] = this.getEvents();
    // let newEvents: EventModel[] = [];
    // if(events.length) {
    //   newEvents = events.filter((evt)=> evt.title != event.title);
    // }
    // const toBeDeleted = this.getEventById(event.id as number);
    localStorage.removeItem(LOCALSTORAGE_EVENTS);
    // return newEvents;
  }

}
