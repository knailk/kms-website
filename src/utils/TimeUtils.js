//generate color for each character
export const getDiffTime = (time) => {
    let timeDifference = '';
    const now = new Date();
    const diffInMilliseconds = now - time;
    const diffInMinutes = Math.floor(diffInMilliseconds / 1000 / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
        timeDifference = `${diffInDays} ngày`;
    } else if (diffInHours > 0) {
        timeDifference = `${diffInHours} giờ`;
    } else {
        timeDifference = `${diffInMinutes} phút`;
    }
    return timeDifference;
};

export const GetDaysOfWeek = (d) => {
    const date = new Date(d);
    const day = date.getDay();

    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date.setDate(diff));

    const tuesday = new Date(monday);
    tuesday.setDate(tuesday.getDate() + 1);

    const wednesday = new Date(monday);
    wednesday.setDate(wednesday.getDate() + 2);

    const thursday = new Date(monday);
    thursday.setDate(thursday.getDate() + 3);

    const friday = new Date(monday);
    friday.setDate(friday.getDate() + 4);

    const saturday = new Date(monday);
    saturday.setDate(saturday.getDate() + 5);

    const sunday = new Date(monday);
    sunday.setDate(sunday.getDate() + 6);

    return {
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
    };
};
