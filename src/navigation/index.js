// import { InAppNotificationProvider } from '@chatkitty/react-native-in-app-notification';
import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { AuthProvider } from './AuthProvider';
import Routes from './Routes';

export default function Providers() {
  return (
    <PaperProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </PaperProvider>
  );
}
