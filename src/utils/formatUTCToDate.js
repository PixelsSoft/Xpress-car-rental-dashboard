const formatUTCtoDate = (date) => {
    const dateString = "2023-06-30T00:00:00.000Z";
    const dateObj = new Date(dateString);

    const year = dateObj.getFullYear();
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);

    const formattedDate = year + "-" + month + "-" + day;

    return formattedDate
}

export default formatUTCtoDate