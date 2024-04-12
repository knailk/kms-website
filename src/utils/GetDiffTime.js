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