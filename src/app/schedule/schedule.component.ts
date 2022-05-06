import { Component, OnInit,ViewChild } from '@angular/core';

import { MbscEventcalendarOptions, Notifications, MbscCalendarEvent,MbscDatepickerOptions, MbscPopup,
  MbscPopupOptions,setOptions } from '@mobiscroll/angular';
import * as moment from 'moment';


import {EventService} from "../services/event.service";





setOptions({
  theme: 'material',
  themeVariant: 'light'
});


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'] ,
  providers: [Notifications]
})
export class ScheduleComponent implements OnInit {
  session : any;
  id: any;
  constructor( private notify: Notifications, private _eventService: EventService) { }

  @ViewChild('popup', { static: false })
  popup!: MbscPopup;
  @ViewChild('colorPicker', { static: false })
  colorPicker: any;
  popupEventTitle: string | undefined;
  popupEventDescription = '';
  popupEventAllDay = true;
  popupEventDates: any;
  popupEventStatus = 'busy';
  calendarSelectedDate: any = new Date();
  switchLabel: any = 'All-day';
  tempColor = '';
  selectedColor = '';
  colorAnchor: HTMLElement | undefined;
  colors = ['#ffeb3c', '#ff9900', '#f44437', '#ea1e63', '#9c26b0', '#3f51b5', '', '#009788', '#4baf4f', '#7e5d4e'];


  myEvents: MbscCalendarEvent[] = [{
    id: 1,
    start: '2022-04-08T13:00',
    end: '2022-04-08T13:45',
    title: 'Lunch @ Butcher\'s',
    description: '',
    allDay: false,
    free: true,
    color: '#009788'
  }, {
    id: 2,
    start: '2022-04-30T15:00',
    end: '2022-04-30T16:00',
    title: 'General orientation',
    description: '',
    allDay: false,
    free: false,
    color: '#ff9900'
  }, {
    id: 3,
    start: '2022-04-29T18:00',
    end: '2022-04-29T22:00',
    title: 'Dexter BD',
    description: '',
    allDay: false,
    free: true,
    color: '#3f51b5'
  }, {
    id: 4,
    start: '2022-05-01T10:30',
    end: '2022-05-01T11:30',
    title: 'Stakeholder mtg.',
    description: '',
    allDay: false,
    free: false,
    color: '#f44437'
  }];

  tempEvent!: MbscCalendarEvent;
  calendarOptions: MbscEventcalendarOptions = {
    clickToCreate: 'double',
    dragToCreate: true,
    dragToMove: true,
    dragToResize: true,
    view: {
      schedule: { type: 'week' }
    },


    onEventClick: (args) => {
      this.isEdit = true;
      this.tempEvent = args.event;
      // fill popup form with event data
      this.loadPopupForm(args.event);
      // set popup options
      this.popupHeaderText = 'Edit event';
      this.popupButtons = this.popupEditButtons;
      this.popupAnchor = args.domEvent.currentTarget;
      // open the popup
      this.popup.open();
    },
    onEventCreated: (args) => {
      setTimeout(() => {
        this.isEdit = false;
        this.tempEvent = args.event;
        // fill popup form with event data
        this.loadPopupForm(args.event);
        // set popup options
        this.popupHeaderText = 'New Event';
        this.popupButtons = this.popupAddButtons;
        this.popupAnchor = args.target;
        // open the popup
        this.popup.open();
      });
    },
    onEventDeleted: (args) => {
      setTimeout(() => {
        this.deleteEvent(args.event);
      });
    },
    onEventUpdated: () => {

      // localStorage.setItem('barber-app:events', JSON.stringify(this.myEvents))

    }

  };
  popupHeaderText!: string;
  popupAnchor: HTMLElement | undefined;
  popupAddButtons = ['cancel', {
    handler: () => {
      this.saveEvent();
    },
    keyCode: 'enter',
    text: 'Add',
    cssClass: 'mbsc-popup-button-primary'
  }];
  popupEditButtons = ['cancel', {
    handler: () => {
      this.saveEvent();
    },
    keyCode: 'enter',

    text: 'Save',
    cssClass: 'mbsc-popup-button-primary'
  }];
  popupButtons: any = [];
  popupOptions: MbscPopupOptions = {
    display: 'bottom',
    contentPadding: false,
    fullScreen: true,
    onClose: () => {
      if (!this.isEdit) {
        // refresh the list, if add popup was canceled, to remove the temporary event
        this.myEvents = [...this.myEvents];
      }
    },
    responsive: {
      medium: {
        display: 'anchored',
        width: 400,
        fullScreen: false,
        touchUi: false
      }
    }
  };
  datePickerControls = ['date'];
  datePickerResponsive: any = {
    medium: {
      controls: ['calendar'],
      touchUi: false
    }
  };
  datetimePickerControls = ['datetime'];
  datetimePickerResponsive = {
    medium: {
      controls: ['calendar', 'time'],
      touchUi: false
    }
  };
  datePickerOptions: MbscDatepickerOptions = {
    select: 'range',
    showRangeLabels: false,
    touchUi: true
  };
  isEdit = false;
  colorOptions: MbscPopupOptions = {
    display: 'bottom',
    contentPadding: false,
    showArrow: false,
    showOverlay: false,
    buttons: [
      'cancel',
      {
        text: 'Set',
        keyCode: 'enter',
        handler: () => {
          this.selectedColor = this.tempColor;
          this.colorPicker.close();
        },
        cssClass: 'mbsc-popup-button-primary'
      }
    ],
    responsive: {
      medium: {
        display: 'anchored',
        buttons: [],
      }
    }
  };


  saveEvent(): void {
    this.tempEvent.title = this.popupEventTitle;
    this.tempEvent['description'] = this.popupEventDescription;
    this.tempEvent.start = moment(this.popupEventDates[0].toISOString()).add(2,"hours").toISOString();
    this.tempEvent.end = moment(this.popupEventDates[1].toISOString()).add(2,"hours").toISOString();
    this.tempEvent.allDay = this.popupEventAllDay;
    this.tempEvent['status'] = this.popupEventStatus;
    this.tempEvent.color = this.selectedColor;
    if (this.isEdit) {
      // update the event in the list
      // this.myEvents = [...this.myEvents];
      // this.myEvents = this._eventService.saveEvent(this.tempEvent as any);
      // localStorage.setItem('token',JSON.stringify(this.myEvents) );
    } else {

      this.myEvents = this._eventService.addEvent(this.tempEvent as any);

    }

    // navigate the calendar
    this.calendarSelectedDate = this.popupEventDates[0];
    // close the popup
    this.popup.close();
  }





  loadPopupForm(event: MbscCalendarEvent): void {


    this.popupEventTitle = event.title;
    this.popupEventDescription = event['description'];
    this.popupEventDates = [event.start, event.end];
    this.popupEventAllDay = event.allDay || false;
    this.popupEventStatus = event['status'] || 'busy';
    this.selectedColor = event.color || '';





  }
  deleteEvent(event: MbscCalendarEvent): void {
    this.myEvents = this.myEvents.filter(item => item.id !== event.id);
    this.notify.snackbar({
      button: {
        action: () => {
          this.myEvents = [...this.myEvents, event];
        },
        text: 'Undo'
      },
      message: 'Event deleted'
    });
    // here you can delete the event from your storage as well

    // ...
  }
  onDeleteClick(): void {
    this.deleteEvent(this.tempEvent);
    this.popup.close();
  }

  selectColor(color: string): void {
    this.tempColor = color;
  }


  openColorPicker(ev: any): void {
    this.selectColor(this.selectedColor || '');
    this.colorAnchor = ev.currentTarget;
    this.colorPicker.open();
  }

  changeColor(ev: any): void {
    const color = ev.currentTarget.getAttribute('data-value');
    this.selectColor(color);

    if (!this.colorPicker.s.buttons.length) {
      this.selectedColor = color;
      this.colorPicker.close();
    }
  }





ngOnInit(): void {

}

}
