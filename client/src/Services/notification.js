import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/notification'
});

const listNotifications = async userID => {
    try {
      const result = await instance.get(`/${userID}/list`);
      const notifications = result.data.notifications;
      return notifications;
    } catch (error) {
      throw error;
    }
  };

const listUnreadNotifications = async userID => {
  try {
    const result = await instance.get(`/${userID}/unreadNotifications`);
    return result.data.result;
  } catch (error) {
    throw error;
  }
};

const createNotification = async data => {
    try {
        const result = await instance.post('/create-notification', data)
        const notification = result.data.notification;
        return notification;
    } catch (error) {
        throw error;
    }
};

const updateNotification = async idNot  => {
  try {
      const result = await instance.post(`${idNot}`);
      const notification = result.data.notification;
      return notification;
  } catch (error) {
      throw error;
  }
};

export { listNotifications, createNotification , updateNotification , listUnreadNotifications};
