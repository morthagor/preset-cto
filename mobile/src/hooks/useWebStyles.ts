/**
 * Web-specific root component
 * Provides better HTML/CSS support for web platforms
 */

import React from 'react';
import { Platform } from 'react-native';

export function useWebStyles() {
  React.useEffect(() => {
    // Add viewport meta tag for web
    if (Platform.OS === 'web') {
      const metaViewport = document.querySelector('meta[name="viewport"]');
      if (!metaViewport) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(meta);
      }
    }
  }, []);
}

export default useWebStyles;
