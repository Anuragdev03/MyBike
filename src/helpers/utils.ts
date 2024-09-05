import dayjs from "dayjs";

export default function formatDate(date: Date | undefined) {
    if(!date) return "";

    return dayjs(date).format('DD-MMM-YYYY')
}