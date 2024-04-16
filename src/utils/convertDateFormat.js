const ToTime = (date) => {
    return date.toString().replace(/(\d{4})(\d{2})(\d{2})/, '$3-$2-$1');
};

export default ToTime;
