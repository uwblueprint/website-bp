import dayjs from "dayjs";
import utcPlugin from "dayjs/plugin/utc";
import timezonePlugin from "dayjs/plugin/timezone";
import localizedFormatPlugin from "dayjs/plugin/localizedFormat";

// Add plugins globally.
dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);
dayjs.extend(localizedFormatPlugin);

export default dayjs;
