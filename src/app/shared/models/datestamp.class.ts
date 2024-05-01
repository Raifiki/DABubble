export class Datestamp {

weekdays = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

constructor() {}

returnHTMLTimestamp(obj: Date): string {
    const weekday = this.weekdays[obj.getDay()];
    const day = obj.getDate();
    const month = this.months[obj.getMonth()];
    return `${weekday}, ${day}. ${month}`; 
}
}