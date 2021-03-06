import { Component, OnInit,ViewChild } from '@angular/core';
import {
  MbscEventcalendarOptions,
  Notifications,
  MbscCalendarEvent,
  MbscDatepickerOptions,
  MbscPopup,
  MbscPopupOptions,
  setOptions,
} from '@mobiscroll/angular';
import * as moment from 'moment';
import {EventService} from "../services/event.service";
import {servicesData} from "./services-data";


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
  serviceData = servicesData;
  selectedServices: any[] = [];
  duration: number;
  constructor( private notify: Notifications, private _eventService: EventService) {
    this.duration = 0;
  }

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
  myEvents: MbscCalendarEvent[] = this._eventService.getEvents();
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
      this.loadPopupForm(args.event);
      this.popupHeaderText = 'Edit event';
      this.popupButtons = this.popupEditButtons;
      this.popupAnchor = args.domEvent.currentTarget;
      this.popup.open();
    },
    onEventCreated: (args) => {
      setTimeout(() => {
        this.isEdit = false;
        this.tempEvent = args.event;
        this.loadPopupForm(args.event);
        this.popupHeaderText = 'New Event';
        this.popupButtons = this.popupAddButtons;
        this.popupAnchor = args.target;
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
      // this.myEvents = this._eventService.addEvent(this.tempEvent as any);
      this.myEvents = [... this.myEvents];
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
    this.tempEvent.start = moment(this.popupEventDates[0]).add(2,"hours").toISOString();
    this.tempEvent.end = moment(this.tempEvent.start).add(this.duration, 'minutes').toISOString();
    this.tempEvent.allDay = this.popupEventAllDay;
    this.tempEvent['status'] = this.popupEventStatus;
    this.tempEvent.color = this.selectedColor;
    if (this.isEdit) {
      this.tempEvent.start = moment(this.popupEventDates[0]).add(0,"hours").toISOString();
      this.tempEvent.end = moment(this.tempEvent.start).add(this.duration, 'minutes').toISOString();
      this.myEvents = this._eventService.saveEvent(this.tempEvent as any);
    } else {
      this.myEvents = this._eventService.addEvent(this.tempEvent as any);
    }
    this.calendarSelectedDate = this.popupEventDates[0];
    this.popup.close();
  }

  loadPopupForm(event: MbscCalendarEvent): void {
    let description = '';
    for(let item of this.serviceData) {
      if(item.isSelected) {
        description += item.name+', ';
      }
    }
    this.popupEventTitle = event.title;
    // this.popupEventDescription = event['description'];
    this.popupEventDescription = description;
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
          this._eventService.deleteEvent(event);
          // localStorage.removeItem('barber-app:events');
        },
        text: 'Undo'
      },
      message: 'Event deleted'
    });
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

  calculateTime(service: {}, index: number): number {
    this.serviceData[index].isSelected = ! this.serviceData[index].isSelected;
    if(this.serviceData[index].isSelected) {
      this.duration += this.serviceData[index].time;
      this.selectedServices.push(service);
    } else if (!this.serviceData[index].isSelected) {
      this.duration -= this.serviceData[index].time;
      this.selectedServices.push(service);
    }
    return 0;
  }

ngOnInit(): void {}
}
