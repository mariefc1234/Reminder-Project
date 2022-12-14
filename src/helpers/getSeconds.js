const getSeconds = (hour) => {
  const hours = parseInt(hour.split(':')[0] * 3600, 10);
  const minutes = parseInt(hour.split(':')[1] * 60, 10);
  return hours + minutes + parseInt(hour.split(':')[2], 10);
  };

  module.exports = {
    getSeconds,
  };
