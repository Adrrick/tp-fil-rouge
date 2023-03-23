import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),

    baseUrl: 'http://localhost:4200',
  },

  env: {
    CYPRESS_TEST_UID: '3U7woVcbSRSuWyXa6HsOeoSUEtf2'
  }

});
